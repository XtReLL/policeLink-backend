import { Resolver, Query } from '@nestjs/graphql';

@Resolver(() => String)
export class AppResolver {
  @Query(() => String)
  ping(): string {
    return 'pong';
  }
}
