import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ConfigModule, ConfigService } from '@config';
import { join } from 'path';
// import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { graphql } = configService.get();

        return {
          debug: graphql.debug,
          playground: true,
          // plugins: graphql.playground
          //   ? [ApolloServerPluginLandingPageLocalDefault({ embed: false })]
          //   : [],
          introspection: true,
          path: graphql.endpoint,
          installSubscriptionHandlers: true,
          autoSchemaFile: join(process.cwd(), 'typings/src/graphql.gql'),
          sortSchema: true,
          typePaths: [join(process.cwd(), 'typings/src/graphql.gql')],
          definitions: {
            path: join(process.cwd(), 'typings/src/graphql.ts'),
            outputAs: 'interface',
          },
          subscriptions: {
            'graphql-ws': true,
            //'subscriptions-transport-ws': true,
          },
          context: () => ({
            // TODO: Move possible loaders into enum to use it in other part of api
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class GraphqlModule {}
