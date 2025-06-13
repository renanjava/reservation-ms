/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Controller, Logger } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { UserService } from '../user/user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger(ReservationController.name);

  @MessagePattern('create-reservation')
  async create(@Payload('body') body: any) {
    this.logger.log(
      `Received create-reservation message with data: ${JSON.stringify(body)}`,
    );
    const reservation = await this.reservationService.create(body);
    return JSON.stringify(reservation);
  }

  @MessagePattern('find-user-reservation')
  async findOne(@Payload('id') id: string) {
    this.logger.log(
      `Received find-user-reservation message with data: ${JSON.stringify(id)}`,
    );
    const reservation = await this.userService.findOne(+id);
    return JSON.stringify(reservation);
  }

  @MessagePattern('delete-reservation')
  remove(@Payload('id') id: string) {
    this.logger.log(
      `Received delete-reservation message with data: ${JSON.stringify(id)}`,
    );
    const reservation = this.reservationService.remove(+id);
    return JSON.stringify(reservation);
  }
}
