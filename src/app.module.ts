import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/post.entity';
import { Category } from './category/entities/category.entity';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { Comments } from './comments/entities/comment.entity';
import { User } from './auth/entities/user.entity';
import { PostsService } from './posts/posts.service';
import { CategoryService } from './category/category.service';
import { CommentService } from './comments/comments.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { PostsController } from './posts/posts.controller';
import { CategoryController } from './category/category.controller';
import { CommentController } from './comments/comments.controller';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LibraryModule } from './library/library.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'blog',
      entities: [Posts, Category, Comments, Subscription, User],
      synchronize: true, // set to false in production
    }), 
    TypeOrmModule.forFeature([Posts, Category, Comments, Subscription, User]),
    UserModule, AuthModule, LibraryModule
  ],
  providers: [PostsService, CategoryService, CommentService, SubscriptionsService],
  controllers: [PostsController, CategoryController, CommentController, SubscriptionsController],
})
export class AppModule {}
