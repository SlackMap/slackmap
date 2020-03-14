
/**
 * UI config
 *
 */
export class ConfigModel {
  /**
   * Domain on witch this app instance is running, exmpl: https://slackmap.com
   */
  host: string;

  /**
   * 'SlackMap Facebook App ID
   */
  facebook_app_id?: string;

  /**
   * Minimum scopes required for user to connect with facebook
   *
   * @uniqueItems
   */
  facebook_scope?: string[];
}
