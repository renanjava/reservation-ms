/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UserService } from '../user/user.service';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    const bookId = createReservationDto.bookId;
    const bookMsUrl = `http://localhost:3002/book/${bookId}`;

    const response = await firstValueFrom(this.httpService.get(bookMsUrl));
    const bookStatus = response.data.status;
    console.log(bookStatus);

    if (bookStatus !== 'disponivel') {
      throw new Error('Book não está disponível');
    }
    /*await firstValueFrom(
      this.httpService.post(`http://localhost:3002/book/${bookId}/status`),
    );*/
    return this.reservationService.create(createReservationDto);
  }

  @Get('user/:userId')
  findOne(@Param('userId') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
