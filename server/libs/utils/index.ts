import { join } from 'path';
import { packages } from './constants'
import { ReflectionService } from '@grpc/reflection';
import { MicroserviceOptions, Transport, ClientProviderOptions } from '@nestjs/microservices';

export const microserviceOpitons = (
  pack: string,
  port: number,
): MicroserviceOptions => ({
  transport: Transport.GRPC,
  options: {
    package: pack,
    url: `localhost:${port}`,
    protoPath: join(__dirname, `../../../protos/${pack}.proto`),
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
});


export const microService = (name: keyof typeof packages): MicroserviceOptions => {
  return microserviceOpitons(packages[name].package, packages[name].port)
};

export const clientService = (name: keyof typeof packages): ClientProviderOptions => {
  return {
    name,
    ...microService(name) as any,
  };
};