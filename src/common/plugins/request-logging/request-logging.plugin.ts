import * as safeJsonStringify from 'safe-json-stringify';
import { Plugin } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';

import { ConfigService } from '@config';
import { PossibleOperationName } from './request-logging.plugin.interface';
import {
  ApolloServerPlugin,
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener,
} from '@apollo/server';

@Plugin()
export class RequestLoggingPlugin implements ApolloServerPlugin {
  private logger: Logger = new Logger('Request');

  constructor(private readonly configService: ConfigService) {}

  async requestDidStart(
    incomingContext: GraphQLRequestContext<any>,
  ): Promise<GraphQLRequestListener<any>> {
    const requestDate = new Date();

    if (!this.checkForIntrospectionRequest(incomingContext)) {
      this.logRequest();
    }

    return {
      willSendResponse: async (outgoingContext) => {
        if (!this.checkForIntrospectionRequest(outgoingContext)) {
          this.logResponse(requestDate, outgoingContext);
        }
      },
    };
  }

  /**
   * Prints log of request
   * @param context - Graphql context
   */
  private logRequest(): void {
    this.logger.log(`Incoming request`);
  }

  /**
   * Prints log of response
   * @param requestDate - Date of the request
   * @param context - Graphql context
   */
  private logResponse<C>(
    requestDate: Date,
    context: GraphQLRequestContextWillSendResponse<C>,
  ): void {
    // TODO: make mechanism to check large response data to minify/collapse it
    const restrictedDataProperties = [
      'getPossibleRooms',
      'getProductsByFilters',
    ];
    const requestTime = Date.now() - requestDate.getTime();
    const [responseDataKey] = context.response.body
      ? Object.keys(context.response.body)
      : [];
    const responseMeta = safeJsonStringify({
      data: restrictedDataProperties.includes(responseDataKey)
        ? {}
        : context.response.body,
      errors: context.errors || {},
    });

    this.logger.log(`Request finished in ${requestTime}ms. ${responseMeta}`);
  }

  /**
   * Returns true of the request is introspection
   * @param context Graphql context
   */
  private checkForIntrospectionRequest<C>(
    context:
      | GraphQLRequestContextWillSendResponse<C>
      | GraphQLRequestContext<C>,
  ): boolean {
    const operationName =
      context.request.operationName || context.operationName;

    return operationName === PossibleOperationName.INTROSPECTION_QUERY;
  }

  /**
   * Parse request headers
   * @param context - Graphql context
   */
  private parseHeaders<C>(
    context:
      | GraphQLRequestContextWillSendResponse<C>
      | GraphQLRequestContext<C>,
  ): Record<string, string> {
    const headersArray = Object.entries(context.request.http.headers);
    const { application } = this.configService.get();

    return headersArray
      .filter(([key]) => key !== application.requestIdFieldName)
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {},
      );
  }

  /**
   * Formats graphql query to read in one line
   * @param query - Graphql query string
   */
  private formatGraphqlQuery(query: string): string {
    const regexps = {
      graphqlCommentLines: /#{1}([^\n]+)/g,
      graphqlNewlineSymbols: /\n[ ]*/g,
      extraSpaces: /[ ]{2,}/g,
    };

    return query
      .replace(regexps.graphqlCommentLines, '')
      .replace(regexps.graphqlNewlineSymbols, ' ')
      .replace(regexps.extraSpaces, ' ');
  }
}
