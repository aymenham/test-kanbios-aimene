import { UserRole } from 'src/interfaces/enums';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: "L'ID unique de l'utilisateur" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Nom d'utilisateur unique" })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: "Prénom de l'utilisateur" })
  @Column()
  firstName: string;

  @ApiProperty({ description: "Nom de famille de l'utilisateur" })
  @Column()
  lastName: string;

  @ApiProperty({ description: "Mot de passe de l'utilisateur" })
  @Column()
  password: string;

  @ApiProperty({
    description: "Rôle de l'utilisateur",
    enum: UserRole,
    default: UserRole.USER,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
