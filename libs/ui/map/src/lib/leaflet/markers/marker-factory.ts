import { ItemUtils, ItemType } from "@slackmap/core";
import { ClusterCountsMarker } from './cluster-counts.marker';
import { LocationMarker } from './location.marker';
import { LineMarker } from './line.marker';
import { AreaMarker } from './area.marker';
import { PoiMarker } from './poi.marker';
export class MarkerFactory {

  constructor(
    private itemUtils: ItemUtils
  ) {}

  create(item) {
    if (!item.coordinates || !item.coordinates.coordinates) {
      return null;
    }

    let label = null;

    if (item.type === ItemType.LOCATION) {
      label = new LocationMarker(item);
    } else if (item.type === ItemType.CLUSTER) {
      // label = new ClusterMarker(item);
      label = new ClusterCountsMarker(item);
    } else if (item.type === ItemType.SPOT) {
      if (item.subtype < 50) {
        label = new LineMarker(item, this.itemUtils);
      } else if (item.subtype >= 50) {
        label = new AreaMarker(item, this.itemUtils);
      } else {
        label = new PoiMarker(item);
      }
    } else {
      label = new PoiMarker(item);
    }

    return label;
  }
}
