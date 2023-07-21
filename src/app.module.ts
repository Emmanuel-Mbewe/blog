import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/post.entity';
import { Category } from './category/entities/category.entity';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { CommentService } from './comments/comments.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { CommentController } from './comments/comments.controller';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { Comments } from './comments/entities/comment.entity';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';

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
    }), TypeOrmModule.forFeature([Posts, Category, Comments, Subscription, User]),
  ],providers: [PostsService, CategoryService, CommentService, SubscriptionsService, UsersService],
  controllers: [PostsController, CategoryController, CommentController, SubscriptionsController, UsersController]
})
export class AppModule {}
