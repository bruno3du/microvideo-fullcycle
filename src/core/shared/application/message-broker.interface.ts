import { IIntegrationEvent } from '../domain/events/domain-event.interface';

export interface IMessageBroker {
  publishEvent<T = any>(event: IIntegrationEvent<T>): Promise<void>;
}
