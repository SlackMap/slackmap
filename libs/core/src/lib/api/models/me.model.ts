import { LocationPathModel } from './location-path.model';

/**
 * User model definition
 */
export class MeModel {

    rid?: string;
    name?: string;
    facebook_id?: string;
    email?: string;
    imperial?: boolean;
    location_path?: LocationPathModel;
    first_name?: string;
    last_name?: string;
    login_at?: string;

}
