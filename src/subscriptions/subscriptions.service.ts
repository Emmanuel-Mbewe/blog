import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription) private subscriptionsRepository: Repository<Subscription>
  ){}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsRepository.save(createSubscriptionDto);
  }

  findAll() {
    return this.subscriptionsRepository.find();
  }

  findOne(id: number) {
    return this.subscriptionsRepository.findOneBy({id});
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionsRepository.save(updateSubscriptionDto);
  }

  remove(id: number) {
    return this.subscriptionsRepository.delete(id);
  }
}
