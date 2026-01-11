import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const privateKey = configService.get<string>('JWT_PRIVATE_KEY');
        const publicKey = configService.get<string>('JWT_PUBLIC_KEY');

        if (!publicKey) {
          throw new Error('JWT_PUBLIC_KEY devem estar configuradas');
        }

        return {
          privateKey: privateKey,
          publicKey: publicKey,
          signOptions: {
            algorithm: 'RS256',
          },
        };
      },
      inject: [ConfigService],
      //global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
