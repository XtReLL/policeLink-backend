import { registerEnumType } from '@nestjs/graphql';

export enum GraphqlSubscription {}

export enum GraphqlSubscriptionAction {}

registerEnumType(GraphqlSubscriptionAction, {
  name: 'GraphqlSubscriptionAction',
});

export interface GraphqlSubscriptionResponse<P = Record<string, any>> {
  action: GraphqlSubscriptionAction;
  payload: P;
}
