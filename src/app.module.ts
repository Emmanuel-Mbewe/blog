import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { Category } from './category/entities/category.entity';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { CommentsService } from './comments/comments.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { CommentsController } from './comments/comments.controller';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { Comments } from './comments/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Emma@2023',
      database: 'blog',
      entities: [Post, Category, Comments, Subscription],
      synchronize: true, // set to false in production
    }), TypeOrmModule.forFeature([Post, Category, Comments, Subscription]),
  ],providers: [PostsService, CategoryService, CommentsService, SubscriptionsService],
  controllers: [PostsController, CategoryController, CommentsController, SubscriptionsController]
})
export class AppModule {}
