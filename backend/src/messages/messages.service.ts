import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly usersService: UsersService,
  ) {}

  async create(createMessageDto: any): Promise<Message> {
    const { sendMessage } = createMessageDto;

    const { user, content } = sendMessage;

    const existingUser = await this.usersService.findByUsername(user.username);

    if (!existingUser) {
      throw new NotFoundException(
        `Utilisateur avec le nom ${user.username} non trouvé`,
      );
    }

    if (user.username !== user.username) {
      throw new UnauthorizedException(
        "Vous ne pouvez envoyer des messages qu'en votre nom",
      );
    }

    const message = await this.messageModel.create({
      user,
      content,
      createdAt: new Date(),
    });

    return message;
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModel.find();
  }
}
