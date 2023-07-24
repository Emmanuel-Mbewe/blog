import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO, RegistrationDTO } from "src/models/dto/user.dto";

@Controller('users')
export class AuthController{
  constructor(private authService: AuthService){}

  @Post()
  register(@Body() credentials: RegistrationDTO){
    return this.authService.register();
  }

  @Post('/login')
  login(@Body() credentials: LoginDTO){
    return this.authService.login(credentials);
  }
}