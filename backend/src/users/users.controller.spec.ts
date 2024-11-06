import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from 'src/interfaces/enums';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should call the create method of UsersService', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };
      const createdUser: CreateUserDto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });

    it('should throw a ConflictException if username is already taken', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testUser',
        password: 'password',
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new ConflictException('Username already taken'));

      try {
        await controller.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('findOne', () => {
    it('should call the findOne method of UsersService', async () => {
      const user = {
        username: 'testUser',
        id: 1,
        role: UserRole.USER,
        firstName: 'firstName',
        lastName: 'lastName',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(new NotFoundException('User not found'));

      try {
        await controller.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should call the update method of UsersService', async () => {
      const updateUserDto = {
        username: 'updatedUser',
        firstName: 'test',
        lastName: 'test',
        role: UserRole.USER,
      };
      const updatedUser = {
        id: 1,
        username: 'updatedUser',
        firstName: 'test',
        lastName: 'test',
        role: UserRole.USER,
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      const result = await controller.update('1', updateUserDto);
      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw a NotFoundException if user to update is not found', async () => {
      const updateUserDto = { username: 'updatedUser' };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('User not found'));

      try {
        await controller.update('1', updateUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should call the remove method of UsersService', async () => {
      const removedUser = { id: 1, firstName: 'John', lastName: 'Doe' };
      const response = {
        message: 'Utilisateur John Doe supprimé avec succès.',
        user: { firstName: 'John', lastName: 'Doe' },
      };

      jest.spyOn(service, 'remove').mockResolvedValue(response);

      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(response);
    });

    it('should throw a NotFoundException if user to remove is not found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException('User not found'));

      try {
        await controller.remove('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAll', () => {
    it('should call the findAll method of UsersService', async () => {
      const users = [
        {
          id: 1,
          username: 'testUser1',
          firstName: 'test',
          lastName: 'test',
          role: UserRole.USER,
        },
        {
          id: 2,
          username: 'testUser2',
          firstName: 'test',
          lastName: 'test',
          role: UserRole.USER,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});
