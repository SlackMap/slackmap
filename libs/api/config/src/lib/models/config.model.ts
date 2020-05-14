
/**
 * UI config
 */
export class ConfigModel {
  /**
   * Domain on witch this app instance is running, exmpl: https://slackmap.com
   */
  APP_HOST: string;

  /**
   * Domain of the API this app should use, exmpl: https://api.slackmap.com
   */
  API_HOST: string;

  /**
   * 'SlackMap Facebook App ID
   */
  FACEBOOK_APP_ID: string;

  /**
   * Minimum scopes required for user to connect with facebook
   *
   * @uniqueItems
   */
  FACEBOOK_SCOPE: string[];
}
