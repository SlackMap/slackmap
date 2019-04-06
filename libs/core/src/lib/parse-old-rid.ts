import {isNumeric, ItemRidPrefix, ItemType, ParseRidResult} from './item';
export const itemOldRidSuffixes = ['0s', '0u', '0p', '0v', '0c', '0o', '0m', '0t'];
export function parseOldRid(rid: string): ParseRidResult {
  if (!rid || typeof rid !== 'string' || isNumeric(rid)) {
    return {
      valid: false
    };
  }
  rid = rid.trim();

  let suffix = rid.substr(rid.length - 2, 2);

  // parse regular rids
  if (itemOldRidSuffixes.indexOf(suffix) >= 0) {
    suffix = suffix
      .split('')
      .reverse()
      .join('');
    return {
      valid: true,
      rid: suffix + rid.substr(0, rid.length - 2),
      type: (ItemRidPrefix as any)[suffix.substr(0, 1)] || null
    };
  }

  // try to parse location rids
  if ((oldLocationRids as any)[rid]) {
    return {
      valid: true,
      rid: (oldLocationRids as any)[rid],
      type: ItemType.LOCATION
    };
  }
  return {
    valid: false
  };
}

export const oldLocationRids = {
  world: 'l0-world',
  italy: 'l2-it-italy',
  poland: 'l2-pl-poland',
  austria: 'l2-at-austria',
  canada: 'l2-ca-canada',
  'united-kingdom': 'l2-gb-united-kingdom',
  france: 'l2-fr-france',
  netherlands: 'l2-nl-netherlands',
  israel: 'l2-il-israel',
  brazil: 'l2-br-brazil',
  belarus: 'l2-by-belarus',
  'czech-republic': 'l2-cz-czech-republic',
  spain: 'l2-es-spain',
  greece: 'l2-gr-greece',
  'united-states': 'l2-us-united-states',
  switzerland: 'l2-ch-switzerland',
  chile: 'l2-cl-chile',
  australia: 'l2-au-australia',
  germany: 'l2-de-germany',
  armenia: 'l2-am-armenia',
  turkey: 'l2-tr-turkey',
  denmark: 'l2-dk-denmark',
  'hong-kong': 'l2-hk-hong-kong',
  estonia: 'l2-ee-estonia',
  ukraine: 'l2-ua-ukraine',
  russia: 'l2-ru-russia',
  bulgaria: 'l2-bg-bulgaria',
  lithuania: 'l2-lt-lithuania',
  mexico: 'l2-mx-mexico',
  moldova: 'l2-md-moldova',
  romania: 'l2-ro-romania',
  malaysia: 'l2-my-malaysia',
  india: 'l2-in-india',
  lebanon: 'l2-lb-lebanon',
  syria: 'l2-sy-syria',
  ecuador: 'l2-ec-ecuador',
  slovenia: 'l2-si-slovenia',
  'united-arab-emirates': 'l2-ae-united-arab-emirates',
  norway: 'l2-no-norway',
  albania: 'l2-al-albania',
  montenegro: 'l2-me-montenegro',
  'bosnia-and-herzegovina': 'l2-ba-bosnia-and-herzegovina',
  'saudi-arabia': 'l2-sa-saudi-arabia',
  antarctica: 'l2-aq-antarctica',
  hungary: 'l2-hu-hungary',
  ireland: 'l2-ie-ireland',
  'england-uk': 'l2-gb-england-uk',
  tanzania: 'l2-tz-tanzania',
  uruguay: 'l2-uy-uruguay',
  vietnam: 'l2-vn-vietnam',
  argentina: 'l2-ar-argentina',
  bolivia: 'l2-bo-bolivia',
  iceland: 'l2-is-iceland',
  philippines: 'l2-ph-philippines',
  nepal: 'l2-np-nepal',
  somalia: 'l2-so-somalia',
  'cayman-islands': 'l2-ky-cayman-islands',
  belgium: 'l2-be-belgium',
  'new-zealand': 'l2-nz-new-zealand',
  jordan: 'l2-jo-jordan',
  'south-africa': 'l2-za-south-africa',
  croatia: 'l2-hr-croatia',
  'costa-rica': 'l2-cr-costa-rica',
  'macedonia-fyrom': 'l2-mk-macedonia-fyrom',
  sweden: 'l2-se-sweden',
  portugal: 'l2-pt-portugal',
  iran: 'l2-ir-iran',
  china: 'l2-cn-china',
  'georgia-usa': 'l2-us-georgia-usa',
  japan: 'l2-jp-japan',
  indonesia: 'l2-id-indonesia',
  'france-house-london-e1-4qa-uk': 'l2-gb-france-house-london-e1-4qa-uk',
  kyrgyzstan: 'l2-kg-kyrgyzstan',
  malta: 'l2-mt-malta',
  'north-korea': 'l2-kp-north-korea',
  thailand: 'l2-th-thailand',
  latvia: 'l2-lv-latvia',
  morocco: 'l2-ma-morocco',
  finland: 'l2-fi-finland',
  slovakia: 'l2-sk-slovakia',
  kazakhstan: 'l2-kz-kazakhstan',
  colombia: 'l2-co-colombia',
  peru: 'l2-pe-peru'
};
