import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AlarmsClassifierServiceController {
  private readonly logger = new Logger(AlarmsClassifierServiceController.name);

  @MessagePattern('alarm.classify')
  classifyAlarm(@Payload() data: unknown) {
    //NESSE CASO E UM SERVIÇO MOCKADO DE CLASSIFICAÇÃO DE ALARME
    this.logger.debug(
      `Received new "alarm.classify" message: ${JSON.stringify(data)}`,
    );
    //MAS VAMOS ENTENDER A ORQUESTRAÇÃO DE SERVIÇOS
    return {
      category: ['critical', 'non-critical', 'invalid'][
        Math.floor(Math.random() * 3)
        ],
    };
  }
}