import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'products',
      protoPath: join(__dirname, '../src/proto/products.proto'),
      url: 'localhost:3002',
    },
  });
  await app.listen();
}
bootstrap();
