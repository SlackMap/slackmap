/**
 * TypeScript type definitions for Facebook Graph API version 6
 * https://developers.facebook.com/docs/graph-api/reference
 */

export interface FacebookUserModel {

  /** The ID of this person's user account. This ID is unique to each app and
   * cannot be used across different apps. Our upgrade guide provides more
   * information about app-specific IDs */
  id: string;

  /** The User's primary email address listed on their profile. This field
   * will not be returned if no valid email address is available. */
  email: string;

  /** The person's first name */
  first_name: string;

  /** The person's last name */
  last_name: string;

  /** The person's full name */
  name: string;

  picture: FacebookPictureModel;

}

export interface FacebookPictureModel {
  data: {
    width: number
    height: number;
    url: string;
    is_silhouette: boolean
  }
}
