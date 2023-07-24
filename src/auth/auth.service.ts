import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDTO, RegistrationDTO } from "src/auth/dto/user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ){}

  async register(credentials: RegistrationDTO) {
    try{
      const user = this.userRepository.create(credentials);
      await user.save();
      return user;
    }catch(err){
      if(err.code === '23505'){
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
  
   async login({email, password}: LoginDTO) {
    try{
      const user = await this.userRepository.findOne({ where: {email} });
      if(user && (await user.comparePassword(password))){
        return user;
      }
      throw new UnauthorizedException('Invalid credentials');
    }catch(err){
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}