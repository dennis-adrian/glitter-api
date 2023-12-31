import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data,
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        festivals: true,
      },
    });
  }

  async findAllArtists(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        festivals: true,
      },
      where: {
        isArtist: true,
        status: 'ACTIVE',
      },
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        firebaseId: userWhereUniqueInput.firebaseId,
      },
      include: {
        festivals: true,
        reservations: {
          include: {
            stand: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput & {
      festivals: Prisma.FestivalUpdateManyWithoutArtistsNestedInput['connect'];
    };
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      include: {
        festivals: true,
      },
      data: {
        ...data,
        festivals: {
          connect: data.festivals,
        },
      },
      where,
    });
  }

  async remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
