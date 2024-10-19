import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { GatewayModule } from './gateway.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule)

  app.enableCors()
  app.useStaticAssets(join(__dirname, '../../../upload'))
  app.setGlobalPrefix('/api')

  const config = new DocumentBuilder().setTitle('Shop Api').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api', app, document)

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }))
  
  await app.listen(3000)
}
bootstrap();