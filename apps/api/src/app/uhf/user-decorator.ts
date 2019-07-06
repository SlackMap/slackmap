
import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  return (req.tokenPayload && req.tokenPayload.user) ? req.tokenPayload.user : undefined;
});
