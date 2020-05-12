import { ItemType, ItemSubtype } from './item-type';
import { ItemRidPrefix } from './item-rid';
import * as getSlug from 'speakingurl';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RidGenerator {
  public enableLogs = false;
  public logs: string[] = [];

  /**
   * Generate Rid for General Item
   *
   * @param type ItemType
   */
  forItem(type: ItemType): string {
    if (type === ItemType.LOCATION) {
      throw new Error('not supported type: for ItemType.LOCATION you have to use RidGenerator.forCountry()');
    }
    if (type === ItemType.PHOTO) {
      throw new Error('not supported type: for ItemType.PHOTO you have to use RidGenerator.forPhoto("jpg")');
    }
    const rid = ItemRidPrefix[type] + '0' + uuid();
    if (this.enableLogs) {
      this.logs.push(rid);
    }
    return rid;
  }

  /**
   * Generatei Photo Rid
   *
   * @param ext photo file extension
   */
  forPhoto(ext: string): string {
    if (!ext) {
      throw new Error('file extension for photo rid generation is required');
    }

    const name = uuid();

    const rid = '' + ItemRidPrefix[ItemType.PHOTO] + '0' + name + ext.toLowerCase();
    if (this.enableLogs) {
      this.logs.push(rid);
    }
    return rid;
  }

  /**
   * Generate Country rid
   *
   * @param code
   * @param name
   */
  forCountry(code: string, name: string): string {
    if (!code) {
      throw new Error('country code for rid generation is required');
    }
    if (!name) {
      throw new Error('country name for rid generation is required');
    }
    const rid = '' + ItemRidPrefix[ItemType.LOCATION] + (ItemSubtype.LOCATION_COUNTRY - 100) + '-' + code.toLowerCase() + '-' + getSlug(name);
    if (this.enableLogs) {
      this.logs.push(rid);
    }
    return rid;
  }
}
