// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.4
//   protoc               v5.28.0
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { CreateUserRequest, User } from "./users";

export const protobufPackage = "auth";

export interface SendOTPRequest {
  phone: string;
}

export interface VerfyOTPRequest {
  phone: string;
  code: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  error: string;
  user: User | undefined;
  tokens: TokenResponse | undefined;
}

export interface AuthResponse {
  error: string;
  success: boolean;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  sendOtp(request: SendOTPRequest): Observable<AuthResponse>;

  verifyOtp(request: VerfyOTPRequest): Observable<LoginResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  register(request: CreateUserRequest): Observable<AuthResponse>;

  refreshToken(request: RefreshRequest): Observable<TokenResponse>;
}

export interface AuthServiceController {
  sendOtp(request: SendOTPRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  verifyOtp(request: VerfyOTPRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  register(request: CreateUserRequest): Promise<AuthResponse> | Observable<AuthResponse> | AuthResponse;

  refreshToken(request: RefreshRequest): Promise<TokenResponse> | Observable<TokenResponse> | TokenResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendOtp", "verifyOtp", "login", "register", "refreshToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
