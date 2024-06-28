import { Schema } from 'convict';

export interface SecurityConfigSchemaInterface {
  security: {
    jwtUsersSecret: string;
  };
}

export const SecurityConfigSchema: Schema<SecurityConfigSchemaInterface> = {
  security: {
    jwtUsersSecret: {
      doc: 'JWT Auth token',
      format: '*',
      default: 'TOP%SECRET',
      env: 'JWT_USERS_SECRET_KEY',
    },
  },
};
