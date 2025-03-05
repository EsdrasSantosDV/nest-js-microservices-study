import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);
  //precisamos converter a nossa aplicação pra hibrida
  //tanto http tanto microservices
  //para isso vamos conectar o microservice
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
      },
    },
    { inheritAppConfig: true },//essa config e pra herdar a configuração do app
  );
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
