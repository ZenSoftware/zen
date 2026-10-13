import { Component, OnDestroy, inject, signal } from '@angular/core';
import { SampleSubscriptionGQL } from '@zen/graphql';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

// eslint-disable-next-line  @typescript-eslint/no-unused-expressions
gql`
  subscription SampleSubscription {
    sampleSubscription {
      message
    }
  }
`;

@Component({
  selector: 'zen-sample-subscription',
  templateUrl: 'zen-sample-subscription.component.html',
  standalone: true,
})
export class ZenSampleSubscriptionComponent implements OnDestroy {
  recentValue = signal<string | undefined>('');
  #sub: Subscription;
  private sampleSubscriptionGQL = inject(SampleSubscriptionGQL);

  constructor() {
    this.#sub = this.sampleSubscriptionGQL.subscribe().subscribe(({ data }) => {
      this.recentValue.set(data?.sampleSubscription.message);
    });
  }

  ngOnDestroy() {
    if (this.#sub) this.#sub.unsubscribe();
  }
}
