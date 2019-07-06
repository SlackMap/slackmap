import { Module } from '@nestjs/common';
import { ControllersModule } from '@slackmap/api/core';
import { UhfModule } from './uhf/uhf.module';
import { JwtService } from './uhf/jwt.service';
import { UhfGuard } from './uhf/uhf.guard';
import { UhfMiddleware } from './uhf/uhf.middleware';

@Module({
  imports: [ControllersModule, UhfModule],
  providers: [JwtService, UhfGuard,UhfMiddleware],
})
export class AppModule {}
