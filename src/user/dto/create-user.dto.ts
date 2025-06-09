/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { User } from '../entities/user.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements User {
  @Exclude()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Exclude()
  reservations: Reservation[];
}
