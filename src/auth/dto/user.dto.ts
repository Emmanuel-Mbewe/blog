import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginDTO{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
    
}

export class RegistrationDTO extends LoginDTO{
    username: string;
}