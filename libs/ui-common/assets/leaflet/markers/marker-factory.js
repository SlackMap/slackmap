L.slackmap = L.slackmap || {};
if(!L.slackmap.ItemType) {
  throw Error('L.slackmap.ItemType has to be provided, assign it before using markerFactory');
}
if(!L.slackmap.itemUtils) {
  throw Error('L.slackmap.itemUtils has to be provided, assign it before using markerFactory');
}
L.slackmap.markerFactory = function(item) {
  if (!item.coordinates || !item.coordinates.coordinates) {
    return null;
  }

  let label = null;

  if (item.type === L.slackmap.ItemType.LOCATION) {
    label = new L.slackmap.LocationMarker(item);
  } else if (item.type === L.slackmap.ItemType.CLUSTER) {
    // label = new ClusterMarker(item);
    label = new L.slackmap.ClusterCountsMarker(item);
  } else if (item.type === L.slackmap.ItemType.SPOT) {
    if (item.subtype < 50) {
      label = new L.slackmap.LineMarker(item, L.slackmap.itemUtils);
    } else if (item.subtype >= 50) {
      label = new L.slackmap.AreaMarker(item, L.slackmap.itemUtils);
    } else {
      label = new L.slackmap.PoiMarker(item);
    }
  } else {
    label = new L.slackmap.PoiMarker(item);
  }

  return label;
}
