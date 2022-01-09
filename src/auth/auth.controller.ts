import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async createUser(@Body() authCredentialsDto: AuthCredentialsDto) {
    await this.authService.signUp(authCredentialsDto);
  }
}
