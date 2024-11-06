import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEnum } from 'class-validator';
import { UserRole } from 'src/interfaces/enums';

export class CreateUserDto {
  @ApiProperty({ description: "username unique de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: "prénom de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "Nom de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: "mot de passe de l'utilisateur" })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @ApiProperty({ description: "role de l'utilisateur" })
  @IsEnum(UserRole)
  role?: UserRole;
}
