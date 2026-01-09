import { Module } from '@nestjs/common';
import { RabbitMQFakeConsumer } from '../../rabbitmq-fake.consumer';

@Module({
  providers: [RabbitMQFakeConsumer],
})
export class RabbitmqFakeModule {}
