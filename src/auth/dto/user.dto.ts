import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
    
}

export class RegistrationDTO extends LoginDTO{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    user_name: string;
}

export interface AuthPayload{
    user_name: string;
}