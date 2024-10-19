import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { ClientGrpc } from '@nestjs/microservices'
import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { SendOTPRequest, VerfyOTPRequest, LoginRequest, RefreshRequest } from 'gen/auth'
import { UsersServiceClient, USERS_SERVICE_NAME, CreateUserRequest, User } from 'gen/users'


@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('USERS_PACKAGE') private usersClient: ClientGrpc,
    ) {}

    usersService: UsersServiceClient

    onModuleInit() {
        this.usersService = this.usersClient.getService<UsersServiceClient>(USERS_SERVICE_NAME)
    }

    async login(loginData: LoginRequest) {
        const { user: userData } = await this.usersService.getUser({ email: loginData.email }).toPromise()
        
        if(!userData?.id) {
            return { error: 'User with this email not found' }
        }
        
        const { password, ...user } = userData

        const isMatch = await this.comparePassword(loginData.password, password)
        
        if(!isMatch) {
            return { error: 'Password do not match' }
        }
        
        const tokens = this.createTokens(user)

        return { user, tokens }
    }

    async register(registerData: CreateUserRequest) {
        const { user: userData } = await this.usersService.getUser({ email: registerData.email }).toPromise()

        if(userData) return { error: 'User with this email already exists' }
        
        const hashedPassword = await this.hashPassword(registerData.password)

        await this.usersService.createUser({ ...registerData, password: hashedPassword }).toPromise()

        return { success: true }
    }

    async sendOTP(sendOTPData: SendOTPRequest) {
        // redis
    }

    async verifyOTP(verfyOTPData: VerfyOTPRequest) {
        // redis
    }

    async comparePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash)
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    refreshToken(refreshData: RefreshRequest) {
        const payload = this.jwtService.verify(refreshData.refreshToken)
        const tokens = this.createTokens(payload)
        return tokens
    }

    createTokens(userData: User) {
        const { id, phone, role, email, firstName } = userData

        const accessToken = this.jwtService.sign({id, phone, role, email, firstName}, { expiresIn: '3h' })
        const refreshToken = this.jwtService.sign({id, phone, role, email, firstName})

        return { accessToken, refreshToken }
    }
}