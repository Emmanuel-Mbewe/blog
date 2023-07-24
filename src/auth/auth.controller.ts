import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegistrationDTO } from "src/auth/dto/user.dto";

@Controller('users')
export class AuthController{
  constructor(private authService: AuthService){}

  @Post()
  register(@Body(ValidationPipe) credentials: RegistrationDTO){
    return this.authService.register(credentials);
  }

  @Post('/login')
  login(@Body(ValidationPipe) credentials: LoginDTO){
    return this.authService.login(credentials);
  }
}