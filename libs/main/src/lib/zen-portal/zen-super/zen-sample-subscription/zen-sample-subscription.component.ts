import { Component } from '@angular/core';
import { SampleSubscriptionGQL } from '@zen/graphql';
import gql from 'graphql-tag';

gql`
  subscription SampleSubscription {
    sampleSubscription
  }
`;

@Component({
  selector: 'zen-sample-subscription',
  templateUrl: 'zen-sample-subscription.component.html',
})
export class ZenSampleSubscriptionComponent {
  constructor(private sampleSubscriptionGQL: SampleSubscriptionGQL) {}

  subscribe() {
    this.sampleSubscriptionGQL.subscribe().subscribe(result => {
      console.log(result.data);
    });
  }
}
