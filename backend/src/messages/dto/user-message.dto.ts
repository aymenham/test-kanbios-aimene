import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: "Nom d'utilisateur de la personne",
    example: 'joe123',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Prénom de la personne',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Nom de famille de la personne',
    example: 'Doe',
  })
  @IsString()
  lastName: string;
}
