import { AsyncLocalStorage } from 'async_hooks';
import { RequestContextDataInterface } from './request-context.interfaces';

export class RequestContextStorage {
  static cls = new AsyncLocalStorage<RequestContextStorage>();

  constructor(private readonly data: RequestContextDataInterface) {}

  static get data() {
    return RequestContextStorage.cls.getStore()?.data;
  }
}
