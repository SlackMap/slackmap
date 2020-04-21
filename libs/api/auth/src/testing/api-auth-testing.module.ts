import { Module } from '@nestjs/common';
import { OrientModule } from '@slackmap/api/orient';
import { UserFixture } from './fixtures/user.fixture';

@Module({
  imports: [OrientModule],
  providers: [UserFixture],
  exports: [UserFixture],
})
export class ApiAuthTestingModule { }
