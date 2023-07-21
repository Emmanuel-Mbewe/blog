import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
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
      entities: [Post],
      synchronize: true, // set to false in production
    }), TypeOrmModule.forFeature([Post]),
  ],providers: [PostsService],
  controllers: [PostsController]
})
export class AppModule {}
