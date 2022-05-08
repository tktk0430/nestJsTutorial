import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ItemsModule, AuthModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
