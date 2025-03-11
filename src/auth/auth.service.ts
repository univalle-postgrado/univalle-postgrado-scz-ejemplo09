import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usuariosRepository: Repository<User>,
  ) {}

  register(createUserDto: CreateUserDto) {
    const newUser = this.usuariosRepository.create({  
      ...createUserDto,
      last_access: new Date()
    });
    return this.usuariosRepository.save(newUser);
  }

}
