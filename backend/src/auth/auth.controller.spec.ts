import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './config/guard/local-auth.guard';
import { User } from '../users/entities/user.entity';
import { UserRole } from 'src/interfaces/enums';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue({
        canActivate: jest.fn((context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            username: 'testUser',
            firstName: 'John',
            lastName: 'Doe',
            role: UserRole.USER,
            id: 1,
          };
          return true;
        }),
      })
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user: any = {
        id: 1,
        username: 'testUser',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
      };
      const token = 'testJwtToken';
      jest
        .spyOn(authService, 'login')
        .mockResolvedValue({ access_token: token });

      const result = await authController.login({ user });
      expect(result).toEqual({ access_token: token });
    });
  });
});
