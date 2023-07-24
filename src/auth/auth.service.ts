import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { LoginDTO, RegistrationDTO } from "src/models/dto/user.dto";

@Injectable()
export class AuthService{
  
  private mockUser = {
    email: 'emmanuel@gmail.com',
    token: 'token.here',
    username: 'Ambewe',
    bio: 'I am a student',
    image: null
  }

  register(credentials: RegistrationDTO) {
    return this.mockUser;
  }
  
   login(credentials: LoginDTO) {
    if(credentials.email === this.mockUser.email){
      return this.mockUser;
    }
    throw new InternalServerErrorException();
  }
}