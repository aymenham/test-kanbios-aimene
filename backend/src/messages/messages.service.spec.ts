import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getModelToken } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { UsersService } from 'src/users/users.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserRole } from 'src/interfaces/enums';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageModel: Model<Message>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getModelToken(Message.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn().mockResolvedValue({
              id: 1,
              username: 'testUser',
              firstName: 'Test',
              lastName: 'User',
              role: UserRole.USER,
              password: 'hashedPassword',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageModel = module.get<Model<Message>>(getModelToken(Message.name));
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should successfully create a message', async () => {
      const createMessageDto: any = {
        sendMessage: {
          user: { username: 'testUser', firstName: 'Test', lastName: 'User' },
          content: 'Test message content',
        },
      };

      jest.spyOn(usersService, 'findByUsername').mockResolvedValue({
        id: 1,
        username: 'testUser',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.USER,
        password: 'hashedPassword',
      });

      // Creating a mock instance of a Message document
      const messageInstance = {
        user: { id: 1, username: 'testUser', role: UserRole.USER },
        content: createMessageDto.sendMessage.content,
        createdAt: new Date(),
        save: jest.fn().mockResolvedValue({
          user: { id: 1, username: 'testUser', role: UserRole.USER },
          content: 'Test message content',
          createdAt: new Date(),
        }),
      };

      // Mocking the creation of a new message instance
      jest
        .spyOn(messageModel, 'create')
        .mockReturnValue(messageInstance as any);

      const result = await service.create(createMessageDto);
      const { save, ...restResult } = result;
      expect(restResult).toEqual({
        user: { id: 1, username: 'testUser', role: UserRole.USER },
        content: 'Test message content',
        createdAt: expect.any(Date),
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createMessageDto: any = {
        sendMessage: {
          user: { username: 'testUser', firstName: 'Test', lastName: 'User' },
          content: 'Test message content',
        },
      };

      const messageInstance = {
        user: { id: 1, username: 'testUser', role: UserRole.USER },
        content: createMessageDto.sendMessage.content,
        createdAt: new Date(),
        save: jest.fn().mockResolvedValue({
          user: { id: 1, username: 'testUser', role: UserRole.USER },
          content: 'Test message content',
          createdAt: new Date(),
        }),
      };

      // Mocking the creation of a new message instance
      jest
        .spyOn(messageModel, 'create')
        .mockReturnValue(messageInstance as any);

      // Mocking the response from UsersService.findByUsername to return null
      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

      try {
        await service.create(createMessageDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of messages', async () => {
      const messages = [
        {
          user: { id: 1, username: 'user1', role: UserRole.USER },
          content: 'Message 1',
          createdAt: new Date(),
        },
        {
          user: { id: 2, username: 'user2', role: UserRole.USER },
          content: 'Message 2',
          createdAt: new Date(),
        },
      ];

      // Mock de find pour retourner directement un tableau de messages
      jest.spyOn(messageModel, 'find').mockResolvedValue(messages as any);

      const result = await service.findAll();
      expect(result).toEqual(messages);
    });
  });
});
