import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    });
    console.log(exist);
    if (exist) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Username already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
