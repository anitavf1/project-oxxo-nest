import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ProvidersService {
  findOneByName() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ){}

  
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto)
  }

  findAll() {
    return this.providerRepository.find({relations:{
      products: true,
    }})
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({
      where: {
        providerId:id
      },
      relations:{
        products:true,
      }
    })
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
  const product =  await this.providerRepository.preload ({
    providerId: id,
    ...updateProviderDto
  })
  return this.providerRepository.save(product);
  }

  remove(id: string) {
    this.providerRepository.delete({
      providerId: id
    })
    return {
      message: "Provider deleted"
    }
  }
}
