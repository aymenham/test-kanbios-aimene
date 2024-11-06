import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { Message } from '../messages/schemas/message.schema';
import { applyDecorators } from '@nestjs/common';

export const MessageSwaggerDocs = {
  create: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Crée un nouveau message' }),
    ApiBody({
      description: 'Données du message à créer',
      type: CreateMessageDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Message créé avec succès.',
      type: CreateMessageDto,
    }),
  ),

  findAll: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Récupère tous les messages' }),
    ApiResponse({
      status: 200,
      description: 'Liste des messages récupérée avec succès.',
      type: [CreateMessageDto],
    }),
  ),
};
