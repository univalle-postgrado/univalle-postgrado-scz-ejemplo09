import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existsUser = await this.usersRepository.exists({
      where: [
        { login: createUserDto.login },
        { email: createUserDto.email },
      ]
    });
    if (existsUser) {
      throw new ConflictException('El login o email ya se encuentra registrado con otro usuario');
    }
    // saltRounds = 10, es recomendable ya que mayor valor aumenta la complejidad del hash pero también el uso de procesador
    const hashedPassword = await bcrypt.hash(this.configService.get<string>('ENCRYPTION_KEY') + createUserDto.password, 10);
    const newUser = this.usersRepository.create({  
      ...createUserDto,
      password: hashedPassword
    });
    return this.usersRepository.save(newUser);
  }

}
