import * as bcrypt from 'bcryptjs'
import { userSelect } from './constants'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client-users'
import { PrismaService } from '../prisma.service'
import { GetUsersRequest, GetUserRequest } from 'gen/users'
import { ExcludePaginationFields, PickPaginationFields } from 'libs/utils/types'

type UsersPagitanion = PickPaginationFields<GetUsersRequest>
type UsersFiltering = ExcludePaginationFields<GetUsersRequest>

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  
  findUsers(pagination: UsersPagitanion, where: Prisma.UserWhereInput) {
    const { page = 1, limit = 20, orderBy } = pagination
    return this.prismaService.user.findMany({
      where,
      skip: (page-1) * limit,
      take: limit,
      // orderBy, TODO: fix the 0, 1 enum
    })
  }

  countUsers(where: Prisma.UserWhereInput) {
    return this.prismaService.user.count({ where })
  }

  private buildUserFilters(filters: UsersFiltering) { 
    const where: Prisma.UserWhereInput = {}
    const { search, ids } = filters

    if(search) Object.assign(where, {
      text: { contains: search },
    })
    
    if(ids && ids.length) Object.assign(where, { 
      id: { in: ids }
    })

    return where
  }

  async paginatedUsers(findUsers: GetUsersRequest) {
    const { page, limit, orderBy, ...filter } = findUsers
    const where = this.buildUserFilters(filter)

    const [count, users] = await this.prismaService.$transaction([
      this.countUsers(where),
      this.findUsers({ page, limit, orderBy }, where),
    ])

    return {count, users}
  }

  async findUser(findUser: GetUserRequest) {
    const where = {} as Prisma.UserWhereUniqueInput

    if(findUser.email || findUser.phone)
      Object.assign(userSelect, { password: true, role: true })

    Object.assign(where, findUser)
      
    const user = await this.prismaService.user.findUnique({
      where,
      select: userSelect
    })    

    return { user }
  }

  async createUser(createdUser: Prisma.UserCreateInput) {
    if(createdUser.password) createdUser.password = await this.hashPassword(createdUser.password)
    const user = await this.prismaService.user.create({ data: createdUser })
    return { user }
  }

  async updateUser(id: number, updatedUser: Prisma.UserUpdateInput) {
    if(updatedUser.password) updatedUser.password = await this.hashPassword(updatedUser.password as string)
    const user = await this.prismaService.user.update({
      where: { id },
      data: updatedUser
    })
    
    return { user }
  }

  async removeUser(id: number) {
    const { user } = await this.findUser({ id })
    if(user) await this.prismaService.user.delete({ where: { id } })
    return { success: true }
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }
}
