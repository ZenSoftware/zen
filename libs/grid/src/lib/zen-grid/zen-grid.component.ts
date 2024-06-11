import { CurrencyPipe, DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Ability } from '@casl/ability';
import {
  AddEvent,
  ColumnMenuSettings,
  EditEvent,
  GridComponent,
  GridDataResult,
  NoRecordsTemplateDirective,
  RemoveEvent,
  RowClassArgs,
  SortSettings,
} from '@progress/kendo-angular-grid';
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {
  CompositeFilterDescriptor,
  GroupDescriptor,
  State,
  process,
} from '@progress/kendo-data-query';
import {
  CentsToDollarsPipe,
  SafeHtmlPipe,
  ZenConfirmModal,
  ZenConfirmModalModule,
  ZenLoadingComponent,
  ZenSnackbarError,
  ZenSnackbarModule,
} from '@zen/components';
import * as Apollo from 'apollo-angular';
import { format } from 'date-fns';
import { cloneDeep, omit } from 'lodash-es';
import { Observable, Subscription, map } from 'rxjs';

import {
  ExporterService,
  KendoGridSettings,
  KendoGridSettingsService,
  KendoToPrismaService,
  SortDescriptor,
  StyleService,
} from '../services';
import { ZenGridDetailTemplateDirective } from './zen-grid-detail-template.directive';

export enum GridMode {
  Default = 'Default',
  SelectMany = 'SelectMany',
  SelectOne = 'SelectOne',
}

export interface ZenGridSettings<T extends object> {
  typename: string;
  findManyGQL: Apollo.Query<any, any>;
  findManyCountGQL: Apollo.Query<any, any>;
  deleteOneGQL?: Apollo.Mutation;
  defaultSettings: KendoGridSettings<T>;

  /**
   * @description The primary key used by the grid
   * @default 'id'
   */
  keyField?: keyof Omit<T, '__typename'>;

  /**
   * @default 'remote'
   */
  process?: 'remote' | 'local';

  /**
   * @describe Optional Casl ability that will set `showAdd`, `showEdit`, `showDelete` according to `@zen/auth` ABAC rules
   * ```ts
   * const showAdd = ability.can('create', this.settings.typename);
   * const showEdit = row => ability.can('update', row);
   * const showDelete = row => ability.can('delete', row);
   * ```
   */
  ability?: Ability;
}

const DEFAULT_TAKE = 10;

@Component({
  selector: 'zen-grid',
  templateUrl: 'zen-grid.component.html',
  standalone: true,
  imports: [
    CentsToDollarsPipe,
    CurrencyPipe,
    DatePipe,
    ExcelModule,
    GridModule,
    InputsModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    NgClass,
    NgTemplateOutlet,
    ReactiveFormsModule,
    SafeHtmlPipe,
    ZenConfirmModalModule,
    ZenGridDetailTemplateDirective,
    ZenLoadingComponent,
    ZenSnackbarModule,
  ],
  providers: [KendoToPrismaService],
})
export class ZenGridComponent<T extends object> implements AfterContentInit, OnDestroy {
  @ContentChild(ZenGridDetailTemplateDirective) details?: ZenGridDetailTemplateDirective;
  @ViewChild('errorTemplate') errorTemplate!: TemplateRef<any>;
  @ViewChild('grid') grid!: GridComponent;

  @Output() add = new EventEmitter<AddEvent>();
  @Output() edit = new EventEmitter<EditEvent>();
  @Output() remove = new EventEmitter<RemoveEvent>();
  @Output() groupChange = new EventEmitter<GroupDescriptor[]>();
  @Output() dataStateChange = new EventEmitter<State>();

  @Input() columnMenu: ColumnMenuSettings | boolean = true;
  @Input() disableAdd = false;
  @Input() disableAutoFitColsButton = false;
  @Input() disableDelete = false;
  @Input() disableEdit = false;
  @Input() disableExports = false;
  @Input() disableGroupButton = false;
  @Input() disableRefresh = false;
  @Input() disableReset = false;
  @Input() height = 680;
  @Input() loading = true;
  @Input() mode = GridMode.Default;
  @Input() reorderable = true;
  @Input() resizable = true;
  @Input() selectBy!: string;
  @Input() selection: any[] = [];
  @Input() showAdd = true;
  @Input() showAutoFitColsButton = true;
  @Input() showDelete: boolean | ((row: T) => boolean) = true;
  @Input() showEdit: boolean | ((row: T) => boolean) = true;
  @Input() showExports = true;
  @Input() showFilters = true;
  @Input() showGroupButton = false;
  @Input() showPager = true;
  @Input() showRefresh = true;
  @Input() showReset = true;
  @Input() showToolbar = true;
  @Input() sortable: SortSettings = { mode: 'multiple' };
  @Input() useGlobalState = true;

  #defaultSettings!: KendoGridSettings<T>;
  #settings!: ZenGridSettings<T>;
  @Input({ required: true }) set settings(value: ZenGridSettings<T>) {
    this.#settings = value;
    this.#settings.process = this.#settings.process ?? 'remote';
    this.#settings.keyField = 'id' as any;
    this.selectBy = this.#settings.keyField as any;

    this.#defaultSettings = cloneDeep(value.defaultSettings);
    this.#defaultSettings.state = this.#defaultSettings.state ?? ({} as any);
    this.#defaultSettings.state!.skip = this.#defaultSettings.state!.skip ?? 0;
    this.#defaultSettings.state!.take = this.#defaultSettings.state!.take ?? DEFAULT_TAKE;
    this.#defaultSettings.state!.sort = this.#defaultSettings.state!.sort ?? [];

    Object.freeze(this.#defaultSettings);

    const ability = this.#settings.ability;
    if (ability) {
      this.showAdd = ability.can('create', this.#settings.typename);
      this.showEdit = row => ability.can('update', row);
      this.showDelete = row => ability.can('delete', row);
    }

    this.gridSettings = cloneDeep(this.#defaultSettings) as any;
  }
  get settings() {
    return this.#settings as ZenGridSettings<T>;
  }

  GridMode = GridMode;
  gridData: GridDataResult = { data: [], total: 0 };
  gridSettings: KendoGridSettings<T> & { state: State } = {
    columnsConfig: [],
    state: {
      skip: 0,
      take: DEFAULT_TAKE,
      sort: [],
    },
  };

  #confirmDeleteSub?: Subscription;
  #querySub?: Subscription;
  #countSub?: Subscription;
  #data?: T[];

  constructor(
    private apollo: Apollo.Apollo,
    private changeDetectorRef: ChangeDetectorRef,
    private exporter: ExporterService,
    private kendoGridSettingsService: KendoGridSettingsService,
    private kendoToPrisma: KendoToPrismaService,
    private snackBar: MatSnackBar,
    private snackBarError: ZenSnackbarError,
    private styles: StyleService,
    private zenConfirmModal: ZenConfirmModal
  ) {}

  ngAfterContentInit() {
    if (!this.settings) {
      this.loading = false;
      this.showToolbar = false;
      console.warn('No <zen-grid> settings provided');
    } else {
      const savedGridSettings = this.useGlobalState
        ? this.kendoGridSettingsService.get(this.settingsName)
        : null;

      if (this.useGlobalState && savedGridSettings) {
        this.gridSettings = savedGridSettings as any;
      } else {
        this.resetGrid();
      }

      if (this.settings.process === 'local') {
        this.#querySub = this.settings.findManyGQL.watch().valueChanges.subscribe({
          next: ({ data, loading }) => {
            this.loading = loading;

            const result = Object.values(data)[0] as T[];
            this.#data = result ?? [];
            this.dataStateChangeHandler();
            this.changeDetectorRef.detectChanges();
          },
          error: e => {
            this.loading = false;
            this.grid.noRecordsTemplate = new NoRecordsTemplateDirective(this.errorTemplate);
            console.error(e);
          },
        });
      } else {
        this.dataStateChangeHandler();
      }

      if (this.gridSettings.rowColorStyles) {
        for (const style of this.gridSettings.rowColorStyles) {
          this.setBackgroundStyle(style.hexColor);
        }
      }
    }
  }

  addHandler(event: AddEvent) {
    this.add.emit(event);
  }

  editHandler(event: EditEvent) {
    this.edit.emit(event);
  }

  removeHandler(event: RemoveEvent) {
    this.remove.emit(event);

    if (!this.loading && this.settings.deleteOneGQL) {
      if (this.#confirmDeleteSub) this.#confirmDeleteSub.unsubscribe();

      this.#confirmDeleteSub = this.zenConfirmModal.open().subscribe(confirmed => {
        if (confirmed) {
          this.loading = true;

          this.settings.deleteOneGQL
            ?.mutate(
              { where: { id: event.dataItem[this.settings.keyField as string] } },
              {
                update: cache => {
                  if (this.settings.process === 'local') {
                    const data = cache.readQuery({
                      query: this.settings.findManyGQL.document,
                    }) as any;

                    const key = Object.keys(data)[0];

                    if (key) {
                      const newData = data[key].filter(
                        (item: { [key: string]: any }) =>
                          item[this.settings.keyField as string] !==
                          event.dataItem[this.settings.keyField as string]
                      );

                      const updateData = {
                        query: this.settings.findManyGQL.document,
                        data: {} as { [key: string]: unknown },
                      };

                      updateData.data[key] = newData;

                      cache.writeQuery(updateData);
                    }
                  } else {
                    cache.evict({
                      id:
                        this.settings.typename +
                        ':' +
                        event.dataItem[this.settings.keyField as string],
                    });

                    cache.evict({
                      fieldName: `findMany${this.settings.typename}Count`,
                    });
                  }
                },
              }
            )
            .subscribe({
              next: () => {
                this.snackBar.open('Deleted', '', { duration: 1500 });
                this.loading = false;
              },
              error: e => {
                this.snackBarError.open(e);
                this.loading = false;
              },
            });
        }
      });
    }
  }

  resetGrid() {
    this.gridSettings = cloneDeep(this.#defaultSettings) as any;
    this.collapseAllDetails();
    if (this.settings.process === 'local') this.dataStateChangeHandler();
  }

  resetClick() {
    this.resetGrid();
    if (this.settings.process === 'remote') this.dataStateChangeHandler();
  }

  autoFitCols() {
    setTimeout(() => this.grid?.autoFitColumns());
  }

  collapseAllDetails() {
    this.gridSettings.expandedDetailKeys = [];
  }

  expandDetailsBy = (dataItem: any) => dataItem[this.settings.keyField as string];

  refresh() {
    this.apollo.client.cache.evict({ fieldName: `findMany${this.settings.typename}` });
    this.apollo.client.cache.evict({ fieldName: `findMany${this.settings.typename}Count` });
    this.snackBar.open('Refreshed', '', { duration: 1500 });
  }

  groupChangeHandler(groups: GroupDescriptor[]): void {
    this.groupChange.emit(groups);
    this.groups = groups;
    this.gridSettings.showGroups = this.groupLength > 0;
    this.dataStateChangeHandler();
  }

  dataStateChangeHandler = (state?: any): void => {
    if (state) this.gridSettings.state = state;
    this.dataStateChange.emit(this.gridSettings.state);

    if (this.#settings.process === 'local') {
      if (this.#data) {
        this.gridData = process(this.#data, {
          ...this.gridSettings.state,
          group: this.groups,
        });
      }
    } else {
      const variables = this.kendoToPrisma.getVariables(this.gridSettings);

      if (this.#countSub) this.#countSub.unsubscribe();

      this.#countSub = this.settings.findManyCountGQL
        .watch({ where: variables.where })
        .valueChanges.subscribe(({ data }) => {
          this.gridData.total = Object.values(data)[0] as number;
        });

      if (this.#querySub) this.#querySub.unsubscribe();

      this.loading = true;

      this.#querySub = this.settings.findManyGQL.watch(variables).valueChanges.subscribe({
        next: ({ data, loading }) => {
          this.loading = loading;
          this.gridData.data = Object.values(data)[0] as T[];
          this.changeDetectorRef.detectChanges();
        },
        error: e => {
          this.loading = false;
          this.grid.noRecordsTemplate = new NoRecordsTemplateDirective(this.errorTemplate);
          console.error(e);
        },
      });
    }
  };

  isBool = (value: unknown) => typeof value === 'boolean';
  isString = (value: unknown) => typeof value === 'string';
  isFunction = (value: unknown) => typeof value === 'function';

  getCssClass = (hexColor: string) => {
    return 'bg-' + hexColor.replace('#', '').toLowerCase();
  };

  setBackgroundStyle(hexColor: string) {
    const cssClass = this.getCssClass(hexColor);

    this.styles.setStyles(`.${cssClass}, .k-grid tr.${cssClass}.k-alt`, {
      backgroundColor: hexColor,
    });

    return cssClass;
  }

  rowClass = (context: RowClassArgs) => {
    const dataItem = context.dataItem as T;

    const result = {} as { [key: string]: boolean };

    if (this.gridSettings.rowColorStyles) {
      for (const style of this.gridSettings.rowColorStyles) {
        const passes = style.condition(dataItem);
        if (passes) result[this.getCssClass(style.hexColor)] = passes;
      }
    }

    return result;
  };

  getValue(dataItem: any, field: string) {
    let result: { [key: string]: any } = dataItem;

    for (const key of field.split('.')) {
      if (result === null || result === undefined) break;
      result = result[key];
    }

    return result;
  }

  get showDetailsIf() {
    return this.details?.zenGridDetailTemplateShowIf ?? (() => true);
  }

  showEditIf(dataItem: T) {
    if (typeof this.showEdit === 'function') return this.showEdit(dataItem);
    return this.showEdit;
  }

  showDeleteIf(dataItem: T) {
    if (typeof this.showDelete === 'function') return this.showDelete(dataItem);
    return this.showDelete;
  }

  allData = () => {
    if (this.settings.process === 'local') {
      return {
        data: process(<T[]>this.#data, {
          ...omit(this.gridSettings.state, ['take', 'skip']),
          group: this.groups,
        }).data,
        group: this.groups,
      };
    } else {
      let variables: any = this.kendoToPrisma.getVariables(this.gridSettings);
      variables = omit(variables, ['take', 'skip']);

      const allData$ = this.settings.findManyGQL.fetch(variables).pipe(
        map(({ data }) => {
          return { data: Object.values(data)[0] as T[] };
        })
      );

      return allData$;
    }
  };

  getExportFileName() {
    let result = format(Date.now(), 'yyyy-MM-dd') + ' ';
    if (this.settings?.typename)
      result += this.settings.typename ? this.settings.typename + ' ' : '';
    result += `${this.gridData?.total} items`;
    return result;
  }

  // saveAsCSV() {
  //   const filename = this.getExportFileName() + '.csv';
  //   const fields = this.visibleFields;

  //   if (this.settings.process === 'local') {
  //     const data = this.allData() as { data: any[] };

  //     this.exporter.exportCSV({ data, filename, fields });
  //   } else {
  //     const allData$ = this.allData() as Observable<{ data: T[] }>;

  //     allData$.subscribe(({ data }) => {
  //       this.exporter.exportCSV({ data, filename, fields });
  //     });
  //   }
  // }

  saveAsJSON() {
    const filename = this.getExportFileName() + '.json';
    const fields = this.visibleFields;

    if (this.settings.process === 'local') {
      const data = this.allData() as { data: any[] };

      this.exporter.exportJSON({ data, filename, fields });
    } else {
      const allData$ = this.allData() as Observable<{ data: T[] }>;

      allData$.subscribe(({ data }) => {
        this.exporter.exportJSON({ data, filename, fields });
      });
    }
  }

  get excelFileName() {
    return this.getExportFileName() + '.xlsx';
  }

  get visibleFields() {
    return this.grid.columnList
      .toArray()
      .filter(c => (<any>c).field && c.isVisible)
      .sort((a, b) => <number>a.orderIndex - <number>b.orderIndex)
      .map(c => (<any>c).field as string);
  }

  get columnsConfig(): any {
    return this.gridSettings.columnsConfig;
  }

  get settingsName() {
    return this.settings.typename + ':' + this.mode;
  }

  get groupLength() {
    return this.groups ? this.groups.length : 0;
  }

  get groups() {
    return this.gridSettings.groups as GroupDescriptor[];
  }

  set groups(value) {
    this.gridSettings.groups = value;
  }

  get take() {
    return this.gridSettings.state.take as number;
  }

  set take(value) {
    this.gridSettings.state.take = value;
  }

  get sort() {
    return this.gridSettings.state.sort as SortDescriptor<T>[];
  }

  set sort(value) {
    this.gridSettings.state.sort = value;
  }

  get skip() {
    return this.gridSettings.state.skip as number;
  }

  set skip(value) {
    this.gridSettings.state.skip = value;
  }

  get filter() {
    return this.gridSettings.state.filter as CompositeFilterDescriptor;
  }

  set filter(value) {
    this.gridSettings.state.filter = value;
  }

  get expandedDetailKeys() {
    if (!this.gridSettings.expandedDetailKeys) this.gridSettings.expandedDetailKeys = [];
    return this.gridSettings.expandedDetailKeys;
  }

  set expandedDetailKeys(value) {
    this.gridSettings.expandedDetailKeys = value;
  }

  ngOnDestroy() {
    if (this.#querySub) this.#querySub.unsubscribe();
    if (this.#countSub) this.#countSub.unsubscribe();
    if (this.#confirmDeleteSub) this.#confirmDeleteSub.unsubscribe();

    if (this.useGlobalState && this.settings) {
      this.kendoGridSettingsService.save(this.settingsName, this.grid, this.gridSettings);
    }
  }
}
