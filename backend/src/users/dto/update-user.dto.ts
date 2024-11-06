import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: "username unique de l'utilisateur" })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: "prénom de l'utilisateur" })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ description: "Nom de l'utilisateur" })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: "mot de passe de l'utilisateur" })
  @IsString()
  @IsOptional()
  @Length(6, 20)
  password?: string;
}
