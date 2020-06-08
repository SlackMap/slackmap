// import '!style-loader!css-loader!leaflet/dist/leaflet.css';
import { LeafletMapComponent } from './leaflet-map.component';

export default {
  title: 'LeafletMapComponent'
}

export const OsmLayer = () => ({
  moduleMetadata: {
    imports: []
  },
  component: LeafletMapComponent,
  props: {
  }
})
