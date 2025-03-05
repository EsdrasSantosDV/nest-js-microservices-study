import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsServiceController {
  private readonly logger = new Logger(AlarmsServiceController.name);

  //ESSE E EVENT DRIVEN E NÃO RESPONSE REQUEST
  //O QUE ISSO QUER DIZER, TEMOS UM SUBSCRIBER DE UMA FILA
  //ELE NÃO VAI RESPONDER NADA, ELE VAI RECEBER UM EVENTO E VAI FAZER ALGUMA COISA
  @EventPattern('alarm.created')
  create(@Payload() data: unknown) {
    this.logger.debug(
      `Received new "alarm.created" event: ${JSON.stringify(data)}`,
    );
  }
}