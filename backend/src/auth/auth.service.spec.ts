import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UserRole } from 'src/interfaces/enums';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user data without password if validation succeeds', async () => {
      const username = 'testUser';
      const password = 'testPassword';
      const user: User = {
        id: 1,
        username,
        password: await bcrypt.hash(password, 10),
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
      };

      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(user);

      const result = await authService.validateUser(username, password);
      expect(result).toEqual({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
    });

    it('should throw UnauthorizedException if validation fails', async () => {
      const username = 'testUser';
      const password = 'wrongPassword';

      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(null);

      await expect(
        authService.validateUser(username, password),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user: any = {
        id: 1,
        username: 'testUser',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.USER,
      };
      const token = 'testJwtToken';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.login(user);
      expect(result).toEqual({
        access_token: token,
      });
    });
  });
});
