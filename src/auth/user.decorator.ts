import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Users = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) =>{
        const request = ctx.switchToHttp().getRequest();
        console.log(request.user);
        return request.user;
    },
);