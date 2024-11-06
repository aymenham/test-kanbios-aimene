import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from '@nestjs/class-transformer';
import { UserDto } from '../dto/user-message.dto';

export class CreateMessageDto {
  @ApiProperty({
    description: "Informations sur l'utilisateur envoyant le message",
  })
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;

  @ApiProperty({
    description: 'Contenu du message',
    example: 'Hello !',
  })
  @IsNotEmpty()
  content: string;
}
