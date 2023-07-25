import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/post.entity';
import { Category } from './category/entities/category.entity';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { Comments } from './comments/entities/comment.entity';
import { User } from './auth/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { PostsService } from './posts/posts.service';
import { CategoryService } from './category/category.service';
import { CommentService } from './comments/comments.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { AuthService } from './auth/auth.service';
import { PostsController } from './posts/posts.controller';
import { CategoryController } from './category/category.controller';
import { CommentController } from './comments/comments.controller';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Emma@2023',
      database: 'blog',
      entities: [Posts, Category, Comments, Subscription, User],
      synchronize: true, // set to false in production
    }), 
    TypeOrmModule.forFeature([Posts, Category, Comments, Subscription, User]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 86400000,
      }
    }),
    PassportModule.register({defaultStrategy: 'jwt'})
  ],
  providers: [PostsService, CategoryService, CommentService, SubscriptionsService, AuthService, JwtStrategy],
  controllers: [PostsController, CategoryController, CommentController, SubscriptionsController, AuthController],
  exports: [PassportModule, JwtStrategy],
})
export class AppModule {}
