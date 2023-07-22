import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './entities/post.entity';
import { Category } from 'src/category/entities/category.entity';

//Post Provider class
@Injectable()
export class PostsService {
  //Constructiong the new post in some category
  constructor(
    //New post
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
    //In this category
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ){}

  //Creating a post of dome category
  async createPost(id: number, title: string, content: string): Promise<Posts> {
    //Koma katogoleyo ilipo?
    const category = await this.categoryRepository.findOneBy({id});
    if (!category) {
      //Ngati palibe, onetsani uthenga wosonyeza kuti palibe
      throw new Error(`Post with ID ${id} not found.`);
    }
    //Koma ngati lilipo, ponyani post mu nkhokwe yosungiramo
    const newPost = new Posts();
    //Mutu wa positi
    newPost.title = title;
    //Uthenga wa posisti
    newPost.content = content;
    //Positiyi ili mu gulu liti?
    newPost.category = category;

    //Basitu ikani positi mu nkhokwe
    return this.postRepository.save(newPost);
  }
  
  //Fetching all posts from the database
  async findAll(): Promise<Posts[]> {
    //When fetching the post, fetch together with its category and comments
    return this.postRepository.find({ relations: ['category','comments'] });
  }

  //Fetch one post with its comments
  async findOneWithComments(id: number): Promise<Posts> {
    //Get a post from the database
    const post = await this.postRepository.findOneBy({id});
    if (!post) {
      //If the post is not available, then throw an error
      throw new NotFoundException(`Post with ID ${id} not found.`);
    }
    //Otherwise return the post
    return post;
  }

  //Remove the post from the database | delete
  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
