/* eslint-disable @typescript-eslint/no-unsafe-call */
import { User } from 'src/user/entities/user.entity';
import { Reservation } from '../entities/reservation.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto implements Reservation {
  @Exclude()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Exclude()
  user: User;
}
