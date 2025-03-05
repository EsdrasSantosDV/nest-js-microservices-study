import { NestFactory } from '@nestjs/core';
import { AlarmsGeneratorModule } from './alarms-generator.module';
// SE NÃO QUEREMOS FAZER NADA PRA ESC UTAR HTTP E SO RODAR O APP
//COMO UMA APLICAÇÃO STANDOLONE
//COLCOAMOS O createApplicationContext

async function bootstrap() {
   await NestFactory.createApplicationContext(AlarmsGeneratorModule);

}
bootstrap();
