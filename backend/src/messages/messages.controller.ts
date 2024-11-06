import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/auth/config/guard/jwt-auth.guard';
import { MessageSwaggerDocs } from 'src/swagger/message-swagger';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @MessageSwaggerDocs.create
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @MessageSwaggerDocs.findAll
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }
}
