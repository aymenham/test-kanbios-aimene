import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  describe('create', () => {
    it('should call the create method of MessagesService', async () => {
      const createMessageDto: CreateMessageDto = {
        user: {
          username: 'testUser',
          firstName: 'firstName',
          lastName: 'lastName',
        },
        content: 'Hello!',
      };

      const createdMessage = {
        user: {
          username: 'testUser',
          firstName: 'firstName',
          lastName: 'lastName',
        },
        content: 'Hello!',
        createdAt: new Date(),
        _id: '1',
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdMessage as any);

      const result = await controller.create(createMessageDto);
      expect(service.create).toHaveBeenCalledWith(createMessageDto);
      expect(result).toEqual(createdMessage);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const createMessageDto: CreateMessageDto = {
        user: {
          username: 'testUser',
          firstName: 'firstName',
          lastName: 'lastName',
        },
        content: 'Hello!',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new NotFoundException('Utilisateur non trouvé'));

      try {
        await controller.create(createMessageDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAll', () => {
    it('should call the findAll method of MessagesService', async () => {
      const messages = [
        { user: { username: 'testUser' }, content: 'Hello!' },
        { user: { username: 'anotherUser' }, content: 'Hi there!' },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(messages as any);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(messages);
    });
  });
});
