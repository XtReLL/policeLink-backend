import { Plugin } from '@nestjs/apollo';

import { ConfigService } from '@config';
import { RequestContextStorage } from '@common/request-context';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestListener,
} from '@apollo/server';

@Plugin()
export class RequestIdPlugin implements ApolloServerPlugin {
  constructor(private readonly configService: ConfigService) {}

  async requestDidStart(
    incomingContext: GraphQLRequestContext<any>,
  ): Promise<GraphQLRequestListener<any>> {
    const requestId = RequestContextStorage.data.requestId;
    const { application } = this.configService.get();

    incomingContext.request.http.headers.set(
      application.requestIdFieldName,
      requestId,
    );

    incomingContext.response.http.headers.set(
      application.requestIdFieldName,
      requestId,
    );

    return {
      willSendResponse: async (outgoingContext) => {
        const { response } = outgoingContext;

        if (
          response.body.kind === 'single' &&
          'data' in response.body.singleResult
        ) {
          response.body.singleResult.extensions = {
            ...response.body.singleResult.extensions,
            requestId,
          };
        }
      },
    };
  }
}
