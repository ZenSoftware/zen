import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ZenComponentsModule } from '@zen/components';
import { AuthRegisterGQL } from '@zen/graphql';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';

import { ZenRegisterFormComponent } from './zen-register-form.component';

describe('ZenRegisterFormComponent', () => {
  let component: ZenRegisterFormComponent;
  let fixture: ComponentFixture<ZenRegisterFormComponent>;
  let controller: ApolloTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ZenRegisterFormComponent],
      providers: [AuthRegisterGQL],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        ApolloTestingModule,
        ZenComponentsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZenRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    controller = TestBed.inject(ApolloTestingController);
  });

  it('should compile', () => {
    controller.verify();
    expect(component).toBeTruthy();
  });
});
