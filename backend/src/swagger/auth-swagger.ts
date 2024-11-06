import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../auth/dto/login.dto';
import { applyDecorators } from '@nestjs/common';

export const AuthSwaggerDocs = {
  login: applyDecorators(
    ApiOperation({ summary: "Connexion de l'utilisateur" }),
    ApiResponse({
      status: 200,
      description: 'Connexion réussie, token généré.',
    }),
    ApiResponse({
      status: 401,
      description: 'Échec de la connexion. Vérifiez vos identifiants.',
    }),
    ApiBody({
      type: LoginDto,
      description: "Les identifiants de connexion de l'utilisateur",
      examples: {
        exemple1: {
          summary: 'Connexion valide',
          value: {
            username: 'utilisateur_test',
            password: 'motdepasse123',
          },
        },
        exemple2: {
          summary: 'Connexion avec des identifiants incorrects',
          value: {
            username: 'utilisateur_invalide',
            password: 'motdepasse_invalide',
          },
        },
      },
    }),
  ),
};
