import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';
import { applyDecorators } from '@nestjs/common';

export const UserSwaggerDocs = {
  findAll: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Récupère tous les utilisateurs' }),
    ApiResponse({
      status: 200,
      description: 'Liste des utilisateurs récupérée avec succès.',
      type: [User],
    }),
  ),

  findOne: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Récupère un utilisateur par ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID de l’utilisateur',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Utilisateur récupéré avec succès.',
      type: User,
    }),
    ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }),
  ),

  create: applyDecorators(
    ApiOperation({ summary: 'Crée un nouvel utilisateur' }),
    ApiBody({
      description: 'Données de l’utilisateur à créer',
      type: CreateUserDto,
    }),
    ApiResponse({
      status: 201,
      description: 'Utilisateur créé avec succès.',
      type: User,
    }),
  ),

  update: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Met à jour un utilisateur par ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID de l’utilisateur à mettre à jour',
      type: Number,
    }),
    ApiBody({
      description: 'Données mises à jour de l’utilisateur',
      type: UpdateUserDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Utilisateur mis à jour avec succès.',
      type: User,
    }),
    ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }),
  ),

  remove: applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Supprime un utilisateur par ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID de l’utilisateur à supprimer',
      type: Number,
    }),
    ApiResponse({
      status: 200,
      description: 'Utilisateur supprimé avec succès.',
    }),
    ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }),
  ),
};
