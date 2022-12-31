import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Database/User.entity';
import { AdminModule } from './Modules/admin/admin.module';
import { AuthModule } from './Modules/auth/auth.module';
import { UserModule } from './Modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      username: 'MYSQL_USER',
      password: 'MYSQL_PASSWORD',
      database: 'mydb',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AdminModule,
  ]
})
export class AppModule {}
