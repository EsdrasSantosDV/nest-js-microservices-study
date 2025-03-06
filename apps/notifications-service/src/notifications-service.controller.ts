import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationsServiceController {
  private readonly logger = new Logger(NotificationsServiceController.name);

  @EventPattern('notification.send') // 👈
  sendNotification(@Payload() data: unknown) {
    this.logger.debug(
      `Sending notification about the alarm: ${JSON.stringify(data)}`,
    );
  }
}