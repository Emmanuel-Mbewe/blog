import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { validate } from "class-validator";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtSrategy extends PassportStrategy(Strat){
    constructor(
        @InjectRepository(User) private readonly userRepo<Repository>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.SECRET,
        });
    }

    async validate(payload){
        const {username} = payload;
        const user = this.userRepo.find({ where: {username} });
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}