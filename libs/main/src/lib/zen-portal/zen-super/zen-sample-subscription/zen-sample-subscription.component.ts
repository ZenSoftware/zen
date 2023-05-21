import { Component, OnDestroy } from '@angular/core';
import { SampleSubscriptionGQL } from '@zen/graphql';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

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
  recentValue: any;
  #sub: Subscription;

  constructor(private sampleSubscriptionGQL: SampleSubscriptionGQL) {
    this.#sub = this.sampleSubscriptionGQL.subscribe().subscribe(({ data }) => {
      this.recentValue = data?.sampleSubscription.message;
    });
  }

  ngOnDestroy() {
    if (this.#sub) this.#sub.unsubscribe();
  }
}
