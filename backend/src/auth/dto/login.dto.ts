import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom d’utilisateur ne doit pas être vide' })
  @ApiProperty({ description: "L'identifiant de l'utilisateur" })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe ne doit pas être vide' })
  @ApiProperty({ description: "Le mot de passe de l'utilisateur" })
  password: string;
}
