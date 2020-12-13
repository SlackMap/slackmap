import { Measure } from './measure';
import { ItemType, ItemSubtype } from './item-type';
import { TypeOption, SubtypeOption, SUBTYPE_OPTIONS, TYPE_OPTIONS } from './item-type-options';
import { DrawType } from './spot-shape-type';
import { isNumber, isObject } from './helpers';
import { Item, SpotItem } from './interfaces';
import { ACCESS_OPTIONS, AccessOption, AccessType } from './spot-access';


export function getSpotSubtypeOptions(shapeType: DrawType, subtypeOptions = SUBTYPE_OPTIONS): SubtypeOption[] {
  const options = subtypeOptions.filter((t) => t.type === ItemType.SPOT && t.order && t.drawType === shapeType);
  return options.sort(function (a, b) {
    return a.order - b.order;
  });
}

export function getItemTypeOptionFromItem(item: Item, itemTypeOptions = TYPE_OPTIONS): TypeOption | null {
  let id;
  if (isNumber(item)) {
    id = item;
  } else if (isObject(item)) {
    id = item.type;
  }
  return itemTypeOptions.find(i => i.id === id);
}

export function getSubtypeOptionsByItemType(itemType: ItemType, subtypeOptions = SUBTYPE_OPTIONS): SubtypeOption[] {
  return subtypeOptions.filter(i => i.type === itemType);
}

export function getSubtypeOptionFromItem(item: Item, subtypeOptions = SUBTYPE_OPTIONS): SubtypeOption | null {
  try {
    let id;
    if (isNumber(item)) {
      id = item;
    } else if (isObject(item)) {
      id = item.subtype;
    }
    if (!id) {
      return null;
    }
    return subtypeOptions.find(i => i.id === id);
  } catch (err) {
    return null;
  }
}

export function getSubtypeOptionByName(name: string, subtypeOptions = SUBTYPE_OPTIONS): SubtypeOption | null {
    return subtypeOptions.find(i => i.name === name);
}

export function getSubtypeOptionById(id: ItemSubtype, subtypeOptions = SUBTYPE_OPTIONS): SubtypeOption | null {
    return subtypeOptions.find(i => i.id === id);
}

export function getItemTypeByItemName(itemName: string, typeOptions = TYPE_OPTIONS): ItemType | null {
  const option = typeOptions.find(i => i.name === itemName);
  return option ? option.id : null;
}

export function getAccessOptionFromItem(item: SpotItem, accessOptions = ACCESS_OPTIONS): AccessOption | null {
  let accessId;
  if (isNumber(item)) {
    accessId = item;
  } else if (isObject(item)) {
    accessId = item.access;
  }
  if (!accessId) {
    return null;
  }
  return accessOptions.find(i => i.id === accessId) || null;
}

export function getAccessOptionById(id: AccessType, accessOptions = ACCESS_OPTIONS): AccessOption | null {
  return accessOptions.find(i => i.id === id) || null;
}

/**
 * Returns lentgth of the item, converted to imperial if needed
 * with suffix about measure unit m/ft
 */
export function getLength(item, imperial = false): string {
  if (imperial) {
    return Math.round(Measure.convert(item.length || 0, Measure.METRIC_TO_IMPERIAL)) + 'ft';
  }
  return Math.round(item.length) + 'm';
}
export function getLengthHtml(item, imperial = false): string {
  if (imperial) {
    return '<b>' + Math.round(Measure.convert(item.length || 0, Measure.METRIC_TO_IMPERIAL)) + '</b><i>ft</i>';
  }
  return '<b>' + Math.round(item.length) + '</b><i>m</i>';
}

export function getTitleHtmlFromItem(item: SpotItem, imperial = false): string {
  if (!item) {
    return '';
  }

  const type = getItemTypeOptionFromItem(item);
  if (!type) {
    return '';
  }
  const subtype = getSubtypeOptionFromItem(item);
  if (!subtype) {
    return '';
  }

  let title = ''; // title = `<span class="name"><i>„</i>${toTitleCase(item.name)}<i>”</i></span> `;

  /**
   * USER
   */
  if (type.id === ItemType.USER) {
    title = '<span class="name">' + item.name + '</span>';
  } else if (type.name === 'location') {
    /**
     * LOCATION
     */

    if (subtype.name === 'world') {
      title = `<span class="name">open slackline database</span>`;
    } else if (subtype.name === 'google') {
      // google geocode result
      title = `<span class="name google-name">${item.name}</span> <i class="google-label">from google</i>`;
    } else if (subtype.name === 'country') {
      // country, contintent, region, street, city, district
      title = `${name}`;
    }
  } else if (type.id === ItemType.SPOT) {
    /**
     * SPOT
     */
    if (subtype.drawType === DrawType.AREA) { // slack area
      const access = getAccessOptionFromItem(item) || {label: '', name: ''};
      title = `<span class="access access-${access.name}">${access.label || ''}</span> <span class="type">${subtype.label ||
        'Slack Area'}</span> ${name} `;
    } else { // line
      title = `<span class="length item-${subtype.name}">${getLengthHtml(item, imperial)}</span> <span class="type">${subtype.label ||
        'Line Spot'}</span> ${name}`;
    }
  }

  return title;
}


export function toTitleCase(str: string): string {
  return (str || '').replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export class ItemUtils {
  private host = 'https://slackmap.com';
  private imperial = false;

  setImperial(imperial: boolean): ItemUtils {
    this.imperial = imperial;
    return this;
  }
  setHost(host: string): ItemUtils {
    this.host = host;
    return this;
  }


  // getQrcodeUrl(item): string {
  //   if (item && item.rid) {
  //     return `/api/v1/items/${item.rid}/qrcode`;
  //   }
  // }

  // getUrl(item): string {
  //   if (item && item.rid && this.host) {
  //     return this.host + '/x/' + item.rid;
  //   }
  // }
  // getNavigateUrl(item): string {
  //   if (item && item.coordinates) {
  //     const lon = item.coordinates.coordinates[0];
  //     const lat = item.coordinates.coordinates[1];
  //     return `http://maps.google.com/maps?q=loc:${lat},${lon}`;
  //   }
  // }
  // get3dUrl(item): string {
  //   if (item && item.coordinates) {
  //     const lon = item.coordinates.coordinates[0];
  //     const lat = item.coordinates.coordinates[1];
  //     // return `http://www.google.com/maps/place/52.440406799316406,21.099708557128906/@52.440406799316406,21.099708557128906,150a,35y,10t
  //     // /data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086`;
  //     // return `http://www.google.com/maps/place/${lat},${lon}/@${lat},${lon},0a,35y,39.25t
  //     // /data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086`;
  //     return `http://maps.google.com/maps?&t=k&q=${lat}+${lon}`;
  //   }
  // }
  // // https://www.google.com/maps/place/52%C2%B026'25.5%22N+21%C2%B005'59.0%22E/@52.4404068,21.0975199,559m
  // // /data=!3m2!1e3!4b1!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086
  // // https://www.google.com/maps/place/52%C2%B026'25.5%22N+21%C2%B005'59.0%22E/@52.4353649,21.0975199,686a,35y,39.25t
  // // /data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d52.4404068!4d21.0997086

  // getPhotoUrl(item, size): string {
  //   if (!item) {
  //     item = {};
  //   }

  //   if (item.type === 7) {
  //     // google search result
  //     if (item.subtype === 110) {
  //       return `/assets/images/google.png`;
  //     }
  //     // country
  //     const sizes = {
  //       '16': true,
  //       '24': true,
  //       '48': true,
  //       '64': true,
  //       '1600': true
  //     };
  //     if (!sizes[size]) {
  //       size = 24;
  //     }
  //     if (item.rid) {
  //       const code = item.rid.substr(3, 2).toLocaleLowerCase();
  //       return `/assets/uploads/flag-icon-css/flags/4x3/${code}.svg`;
  //     }
  //   } else if (!this.photoSizes[size]) {
  //     size = 'xs_s';
  //   }

  //   if (item.photo_src) {
  //     return `/assets/uploads/p0/${size}/${item.photo_src}`;
  //   }

  //   if (item.photos && item.photos[0]) {
  //     return `/assets/uploads/p0/${size}/${item.photos[0]}`;
  //   }

  //   if (typeof item === 'string') {
  //     return `/assets/uploads/p0/${size}/${item}`;
  //   }

  //   if (item.facebook_id) {
  //     return 'https://graph.facebook.com/' + item.facebook_id + '/picture?type=square';
  //   }

  //   if (item.rid) {
  //     return `/assets/uploads/p0/${size}/${item.rid}`;
  //   }

  //   // if(item.user_facebook_id) {
  //   //    return 'https://graph.facebook.com/'+item.user_facebook_id+'/picture?type=square';
  //   // }
  //   return this.photoPlaceholder.s_s;
  // }

  // getTitle(item, noName = false): string {
  //   if (!item) {
  //     return '';
  //   }

  //   const type = this.getType(item);
  //   const subtype = this.getSubtype(item);

  //   let name = '';
  //   if (item.name && !noName) {
  //     name = this.toTitleCase(item.name);
  //   }
  //   let title = name;

  //   /**
  //    * USER
  //    */
  //   if (type.name === 'user') {
  //     // leave the name
  //   } else if (type.name === 'location') {
  //     /**
  //      * LOCATION
  //      */
  //     if (subtype.name === 'world') {
  //       title = `The World of Slacklining`;
  //     } else if (subtype.name === 'google') {
  //       // google geocode result
  //       title = `${name} from google`;
  //     } else if (subtype.name === 'country') {
  //       // country, contintent, region, street, city, district
  //       title = `${name}`;
  //     }
  //   } else if (type.name === 'spot') {
  //     /**
  //      * SPOT
  //      */
  //     // slack area
  //     if (item.subtype >= 50) {
  //       const access = this.getAccess(item);
  //       let label = access.label;
  //       if (access.name === 'unknown') {
  //         label = '';
  //       }
  //       title = `${label || ''} ${subtype.label || 'Slack Area'} ${name} `;
  //     } else if (item.subtype < 50) {
  //       // line
  //       title = `${this.getLength(item)} ${subtype.label} ${name}`;
  //     }
  //   }

  //   return title;
  // }

  // /**
  //  * Returns length of the item
  //  * in metric and imerial units, separated with slash
  //  *
  //  * @param item
  //  */
  // getLengthWithImperial(item): string {
  //   return Math.round(item.length || 0) + 'm/' + Math.round(Measure.convert(item.length || 0, Measure.METRIC_TO_IMPERIAL)) + 'ft';
  // }
  // getLengthWithImperialHtml(item): string {
  //   return `<b>${Math.round(item.length || 0)}</b><i>m</i>/<b>${Math.round(
  //     Measure.convert(item.length || 0, Measure.METRIC_TO_IMPERIAL)
  //   )}</b><i>ft</i>`;
  // }

  // getIconClass(item): string {
  //   if (typeof item === 'number') {
  //     item = { subtype: item };
  //   }
  //   return 'icon-item icon-' + this.getSubtype(item).name;
  // }

}
