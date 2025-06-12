/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @MessagePattern('create-user')
  async create(@Payload('body') body: any) {
    this.logger.log(
      `Received create-user message with data: ${JSON.stringify(body)}`,
    );
    const user = await this.userService.create(body);
    return JSON.stringify(user);
  }

  @MessagePattern('find-all-user')
  async findAll() {
    this.logger.log('Received find-all-user message');
    return await this.userService.findAll();
  }

  @MessagePattern('delete-user')
  remove(@Payload('id') id: string) {
    this.logger.log(
      `Received delete-user message with data: ${JSON.stringify(id)}`,
    );
    const user = this.userService.remove(+id);
    return JSON.stringify(user);
  }
}
