import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  create(createAdminDto: CreateAdminDto) {
    return this.prisma.admin.create({
      data: createAdminDto,
    });
  }

  findAll() {
    return this.prisma.admin.findMany();
  }

  findOne(where: Prisma.AdminWhereUniqueInput) {
    return this.prisma.admin.findUnique({
      where,
    });
  }

  update(where: Prisma.AdminWhereUniqueInput, updateAdminDto: UpdateAdminDto) {
    return this.prisma.admin.update({
      data: updateAdminDto,
      where,
    });
  }

  remove(where: Prisma.AdminWhereUniqueInput) {
    return this.prisma.admin.delete({
      where,
    });
  }
}
