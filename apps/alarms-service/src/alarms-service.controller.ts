import { Controller, Inject, Logger } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { MESSAGE_BROKER } from './constants';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AlarmsServiceController {
  private readonly logger = new Logger(AlarmsServiceController.name);
  constructor(@Inject(MESSAGE_BROKER) private readonly messageBroker: ClientProxy) {
  }
  //ESSE E EVENT DRIVEN E NÃO RESPONSE REQUEST
  //O QUE ISSO QUER DIZER, TEMOS UM SUBSCRIBER DE UMA FILA
  //ELE NÃO VAI RESPONDER NADA, ELE VAI RECEBER UM EVENTO E VAI FAZER ALGUMA COISA
  @EventPattern('alarm.created')
  async create(@Payload() data: { name: string; buildingId: number }) {
    this.logger.debug(
      `Received new "alarm.created" event: ${JSON.stringify(data)}`,
    );


    /*
    // Se decidimos usar o padrão de coreografia, simplesmente emitíamos um evento aqui e permitiríamos que outros serviços lidasse com o resto.
    //
    // Então, por exemplo:
    // 1. "Serviço de alarmes" emitiria um evento para o "Serviço de Classificador de Alarmes" para classificar o alarme.
    // 2. "Serviço de classificador de alarme" classificaria o alarme e emitia um evento no "Serviço de Notificações" para notificar outros serviços sobre o alarme.
    // 3. "Serviço de notificações" assinaria o evento "alarm.classified" e notificaria outros serviços sobre o alarme.
     */
    const alarmClassification = await lastValueFrom(
      this.messageBroker.send('alarm.classify', data),
    );
    this.logger.debug(
      `Alarm "${data.name}" classified as ${alarmClassification.category}`,
    );

    const notify$ = this.messageBroker.emit('notification.send', { // 👈
      alarm: data,
      category: alarmClassification.category,
    });
    await lastValueFrom(notify$);
    this.logger.debug(`Dispatched "notification.send" event`);
  }
}