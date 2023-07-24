import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { AuthPayload } from "./dto/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: 'TeTe'
        });
    }

    async validate(payload: AuthPayload){
        const { user_name } = payload;
        const user = this.userRepo.find({ where: { user_name } });
        if(!user){
            throw new UnauthorizedException('Payload mismatch');
        }
        return user;
    }
}