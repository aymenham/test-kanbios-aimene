import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/interfaces/enums';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a user successfully and return without password', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = { id: 1, ...createUserDto, password: hashedPassword };

      jest.spyOn(repository, 'create').mockReturnValue(newUser as any);
      jest.spyOn(repository, 'save').mockResolvedValue(newUser as any);

      const result = await service.create(createUserDto);
      const { password, ...userResult } = createUserDto;
      expect(result).toEqual({ id: 1, ...userResult });
    });

    it('should throw a ConflictException if the username is already taken', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };
      jest.spyOn(repository, 'create').mockReturnValue(createUserDto as any);
      jest.spyOn(repository, 'save').mockRejectedValue({ code: '23505' });

      try {
        await service.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw an InternalServerErrorException for other errors', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };
      jest.spyOn(repository, 'create').mockReturnValue(createUserDto as any);
      jest.spyOn(repository, 'save').mockRejectedValue(new Error());

      try {
        await service.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('update', () => {
    it('should update a user successfully', async () => {
      const updateUserDto = {
        username: 'updatedUser',
        password: 'newPassword',
      };
      const existingUser = {
        id: 1,
        username: 'testUser',
        password: await bcrypt.hash('password', 10),
        role: 'user',
      };
      const updatedUser = {
        ...existingUser,
        ...updateUserDto,
        password: await bcrypt.hash('newPassword', 10),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser as any);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser as any);

      const result = await service.update(1, updateUserDto);
      expect(result).toEqual({ id: 1, username: 'updatedUser', role: 'user' });
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      const updateUserDto = {
        username: 'updatedUser',
        password: 'newPassword',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      try {
        await service.update(1, updateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      const existingUser = { id: 1, firstName: 'John', lastName: 'Doe' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser as any); // Mock de findOne
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined); // Mock de delete

      const result = await service.remove(1);
      expect(result).toEqual({
        message: 'Utilisateur John Doe supprimé avec succès.',
        user: { firstName: 'John', lastName: 'Doe' },
      });
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null); // Mock de findOne qui renvoie null

      try {
        await service.remove(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findOne', () => {
    it('should find a user by id', async () => {
      const existingUser = {
        id: 1,
        username: 'testUser',
        password: 'hashedPassword',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingUser as any); // Mock de findOne

      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, username: 'testUser' });
    });

    it('should throw a NotFoundException if the user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null); // Mock de findOne qui renvoie null

      try {
        await service.findOne(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
