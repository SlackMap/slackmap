
/**
 * UI config
 */
export class ConfigModel {
  /**
   * Domain on witch this app instance is running, exmpl: https://slackmap.com
   */
  appHost: string;

  /**
   * Domain of the API this app should use, exmpl: https://api.slackmap.com
   */
  apiHost: string;

  /**
   * 'SlackMap Facebook App ID
   */
  facebookAppId: string;

  /**
   * Minimum scopes required for user to connect with facebook
   *
   * @uniqueItems
   */
  facebookScope: string[];
}
