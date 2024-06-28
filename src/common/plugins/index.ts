import { RequestIdPlugin } from './request-id/request-id.plugin';
import { RequestLoggingPlugin } from './request-logging/request-logging.plugin';

export const ApolloPlugins = [RequestIdPlugin, RequestLoggingPlugin];
