import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/interfaces/enums';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { password, role, ...userData } = createUserDto;

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role && !Object.values(UserRole).includes(role as UserRole)) {
      throw new BadRequestException(
        `Le rôle ${role} n'est pas valide. Utilisez admin ou user.`,
      );
    }

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      role: role || UserRole.USER,
    });

    try {
      const savedUser = await this.usersRepository.save(user);
      const { password: _, ...result } = savedUser;
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          "Le nom d'utilisateur est déjà utilisé. Veuillez en choisir un autre.",
        );
      }

      throw new InternalServerErrorException(
        "Erreur lors de la création de l'utilisateur. Veuillez réessayer plus tard.",
      );
    }
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find({
      order: { id: 'ASC' },
    });
    return users.map(({ password, ...user }) => user);
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }
    const { password, ...result } = user; // Exclure le mot de passe
    return result;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }

    // check usename existe
    if (updateUserDto.username) {
      const existingUser = await this.usersRepository.findOne({
        where: { username: updateUserDto.username },
      });
    }

    // Hachage du mot de passe si celui-ci est mis à jour
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);

    const { password, ...result } = user;
    return result;
  }

  async remove(id: number): Promise<{
    message: string;
    user: { firstName: string; lastName: string };
  }> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }

    await this.usersRepository.delete(id);

    return {
      message: `Utilisateur ${user.firstName} ${user.lastName} supprimé avec succès.`,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(
        `Utilisateur avec le nom d'utilisateur ${username} non trouvé.`,
      );
    }
    return user;
  }
}
