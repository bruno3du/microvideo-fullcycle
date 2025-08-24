import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { WrapperDataInterceptor } from 'src/nest-modules/shared-module/interceptors/wrapper-data/wrapper-data.interceptor';
import { EntityValidationErrorFilter } from 'src/nest-modules/shared-module/filters/entity-validation-error.filter';
import { NotFoundErrorFilter } from 'src/nest-modules/shared-module/filters/not-found-error.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new WrapperDataInterceptor());
  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new EntityValidationErrorFilter(),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
