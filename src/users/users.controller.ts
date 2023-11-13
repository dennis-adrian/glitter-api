import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get()
  async findAll(@Query('artists') artists: string): Promise<User[] | null> {
    const isArtistsOnly = artists === 'true';

    if (isArtistsOnly) {
      return this.usersService.findAllArtists();
    }

    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') firebaseId: string): Promise<User | null> {
    return this.usersService.findOne({ firebaseId });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update({
      where: {
        id: +id,
      },
      data,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({
      id: Number(id),
    });
  }
}
