import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    options: {
      package: 'auth',
    },
  });

  // await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
