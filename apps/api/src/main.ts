const result = require('dotenv').config()
if (result.error) {
  throw result.error
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

const PORT = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });

  process.on('SIGTERM', closeHandler);
  process.on('SIGINT', closeHandler);
  async function closeHandler() {
    console.log('');
    console.log('Shutdown the server gracefully...');
    await app.close();
    console.log('...shutdown success.');
    process.exit();
  }
}

bootstrap();
