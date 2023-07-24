export class LoginDTO{
    email: string;
    password: string;
}

export class RegistrationDTO extends LoginDTO{
    username: string;
}