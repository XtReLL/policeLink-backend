import { Schema } from 'convict';

export interface GraphQLConfigSchemaInterface {
  graphql: {
    endpoint: string;
    playground: boolean;
    debug: boolean;
  };
}

export const GraphQLConfigSchema: Schema<GraphQLConfigSchemaInterface> = {
  graphql: {
    endpoint: {
      doc: 'Graphql endpoint',
      format: '*',
      default: '/graphql',
      env: 'GRAPHQL_ENDPOINT',
    },
    playground: {
      doc: 'Enable playground for graphql',
      format: Boolean,
      default: true,
      env: 'GRAPHQL_PLAYGROUND',
    },
    debug: {
      doc: 'Enable debug for graphql (enables stacktrace, for example)',
      format: Boolean,
      default: true,
      env: 'GRAPHQL_DEBUG',
    },
  },
};
