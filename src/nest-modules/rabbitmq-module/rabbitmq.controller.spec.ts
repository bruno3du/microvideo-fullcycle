import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQController } from './rabbitmq.controller';

describe('RabbitmqController', () => {
  let controller: RabbitMQController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
          uri: 'amqp://admin:admin@rabbitmq:5672',
        }),
      ],
      controllers: [RabbitMQController],
    }).compile();

    controller = module.get<RabbitMQController>(RabbitMQController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
