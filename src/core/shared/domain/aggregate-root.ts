import { IDomainEvent } from '@core/shared/domain/events/domain-event.interface';
import { Entity } from './entity';

export abstract class AggregateRoot extends Entity {
  applyEvent(event: IDomainEvent) {}

  registerHandler(event: string, handler: (event: IDomainEvent) => void) {}
}
