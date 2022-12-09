import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './app2.controller';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
