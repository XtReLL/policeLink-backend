import { Schema } from 'convict';

export interface RestConfigSchemaInterface {
  rest: {
    endpoint: string;
  };
}

export const RestConfigSchema: Schema<RestConfigSchemaInterface> = {
  rest: {
    endpoint: {
      doc: 'Rest API endpoint',
      format: '*',
      default: '/rest',
      env: 'REST_ENDPOINT',
    },
  },
};
