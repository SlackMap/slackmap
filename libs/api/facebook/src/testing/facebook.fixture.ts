import { FacebookUserModel } from '@slackmap/api/facebook/dto';

export interface FacebookErrorResponse {
  error: Error
}
export interface ProfileFixture {
  token: string;
  response: FacebookUserModel | FacebookErrorResponse;
}
export const profiles: ProfileFixture[] = [
  {
    token: 'valid-profile-token',
    response: {
      id: '1234567890',
      email: 'test@slackmap.com',
      name: 'Valid FB User',
      first_name: 'Test',
      last_name: 'User'

    }
  },
  {
    token: 'invalid-profile-token',
    response: {} as FacebookUserModel
  },
  {
    token: 'user-profile-token',
    response: {
      id: '1184894310',
      email: 'test2@slackmap.com',
      name: 'Test User',
      first_name: 'Test',
      last_name: 'User'
    }
  },
  {
    token: 'invalid-token',
    response: {
      error: {
        message: 'Fb connection error',
        name: 'Error from Facebook'
      }
    }
  }
];
export class FacebookFixture {
  static readonly profiles: ProfileFixture[] = profiles;

  // for testing registration
  static readonly VALID_PROFILE_TOKEN: string = profiles[0].token;

  // for testing profiles returned without id or email
  static readonly INVALID_PROFILE_TOKEN: string = profiles[1].token;

  // for testing existing user (already registered)
  static readonly USER_PROFILE_TOKEN: string = profiles[2].token;

  // for testing not valid fb token
  static readonly INVALID_TOKEN: string = 'invalid-token';

  static getByToken(token: string): FacebookUserModel | FacebookErrorResponse {
    // find response for token
    const profile = profiles.find(p => p.token === token);
    if (profile) {
      return profile.response;
    }
    // if token invalid, return error response
    return profiles.find(p => p.token === FacebookFixture.INVALID_TOKEN).response;
  }
}
