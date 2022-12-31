import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './Guards/auth.guard';
import { AuthService } from './Modules/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const authService = app.get(AuthService)
  app.useGlobalGuards(new AuthGuard(authService, {whitelist: [ { method: 'POST', path: '/auth/login' }, { method: 'POST', path: '/' }]}))
  await app.listen(3001);
}
bootstrap();
