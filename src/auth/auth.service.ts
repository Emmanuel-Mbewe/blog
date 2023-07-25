import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDTO, RegistrationDTO } from "src/auth/dto/user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async register(credentials: RegistrationDTO) {
    try{
      const user = this.userRepository.create(credentials);
      // const payload = {user_name: user.user_name};
      // const token = this.jwtService.sign(payload);
      await user.save();
      // return {user: {...user.toJSON, token}};

      return "User saved successfully";
    }catch(error){
      throw new ConflictException('Username already taken');
    }
  }
  
   async login({email, password}: LoginDTO) {
    try{
      const user = await this.userRepository.findOne({where: {email}});
      const isValid = await user.comparePassword(password);
      if(!isValid){
        throw new UnauthorizedException('Invalid credentials');
      }
      // const payload = {user_name: user.user_name};
      // const token = this.jwtService.sign(payload);
      // return {user: {...user.toJSON, token}};
      return "Loged in successfully";
    }catch(error){
      throw new UnauthorizedException('Inavalid credentials');
    }
  }
}