import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UhfController } from './uhf.controller';
import { UhfMailRegConfig } from './uhf-mail-reg-config';
import { OrientModule } from '@slackmap/api/orient';
import { UhfMiddleware } from './uhf.middleware';
import { JwtService } from './jwt.service';

@Module({
  imports: [OrientModule],
  controllers: [UhfController],
  providers: [UhfMailRegConfig, JwtService]
})
export class UhfModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UhfMiddleware)
      .forRoutes(UhfController);
  }
}
