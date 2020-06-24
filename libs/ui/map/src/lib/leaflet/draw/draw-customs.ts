import * as L from "leaflet";
import '@geoman-io/leaflet-geoman-free';

// DOCS: https://github.com/geoman-io/leaflet-geoman

export type ShapeType = 'Marker' | 'Circle' | 'Line' | 'Rectangle' | 'Polygon' | 'Cut';

export enum DrawMapEvents {
  DRAW_START = 'pm:drawstart', //	e	Called when drawing mode is enabled. Payload includes the shape type and working layer
  DRAW_END = 'pm:drawend',     //	e	Called when drawing mode is disabled. Payload includes the shape type.
  CREATE = 'pm:create',        //	e	Called when a shape is drawn/finished. Payload includes shape type and the drawn layer
}
export enum DrawLayerEvents {
  VERTEXADDED = 'pm:vertexadded',  //	Called when a new vertex is added. Payload includes the new vertex, it's marker, index, working layer and shape type
  SNAPDRAG = 'pm:snapdrag',        //
  UNSNAP = 'pm:unsnap',            //
  CENTERPLACED = 'pm:centerplaced',//
}

export interface DrawLayer  {
  getLatLngs: () => L.LatLng[] | L.LatLng[][] | L.LatLng[][][];
  getBounds: () => L.LatLngBounds;
  toGeoJSON: () => GeoJSON.Feature<any>;
  on(type: any, cb: any, c?:any): this;
  off(type: any, cb: any, c?:any): this;
}

export interface PmHandler  {
  _removeLastVertex(): void;
  _finishShape(): void;
  enable(options?: L.PM.EditOptions): void;
  disable(poly?: L.Layer): void;
}

declare module 'leaflet' {
  interface Map {
    pm: PM.Map;
  }
  interface Polygon {
    pm: PM.Edit.Line;
  }

  interface Polyline {
    pm: PM.Edit.Line;
  }

  interface Marker {
    pm: PM.Edit.Marker;
  }

  interface LayerGroup {
    pm: PM.Edit.LayerGroup;
  }

  namespace PM {
    interface Map {
      Draw: Draw;

      addControls(options?: ToolbarOptions): void;
      enableDraw(shape: string, options?: DrawOptions): void;
      disableDraw(shape: string): void;
      setPathOptions(options: PathOptions): void;
      toggleRemoval(enabled: boolean): void;
      globalEditEnabled(): boolean;
      toggleGlobalEditMode(options?: EditOptions): void;
    }

    interface Draw {
      Line: PmHandler,
      Polygon: PmHandler,
      Marker: PmHandler,
      getShapes(): string[];
    }

    interface ToolbarOptions {
      position?: string; // topleft | topright | bottomleft | bottomright
      drawMarker?: boolean;
      drawPolygon?: boolean;
      drawPolyline?: boolean;
      editPolygon?: boolean;
      deleteLayer?: boolean;
    }

    interface DrawOptions {
      snappable?:boolean;         // true	enable snapping to other layers vertices for precision drawing. Can be disabled by holding the ALT key.
      snapDistance?: number;      // 20	the distance to another vertex when a snap should happen
      snapMiddle?:boolean;        //	false	allow snapping to the middle of a layers segments (between two vertexes)
      tooltips?:boolean;          //	true	show helpful tooltips for your user
      allowSelfIntersection?:boolean; //	true	allow self intersections
      templineStyle?:any;         //	{ color: 'red' },	leaflet path options for the lines between drawn vertices/markers.
      hintlineStyle?:any;         //	{ color: 'red', dashArray: [5, 5] }	leaflet path options for the helper line between last drawn vertex and the cursor.
      cursorMarker?:boolean;      //	true	show a marker at the cursor
      finishOn?:any;              //	null	leaflet layer event to finish the drawn shape, like 'dblclick'. Here's a list.
      markerStyle?:any;           //	{ draggable: true }	leaflet marker options (only for drawing markers).
    }

    interface EditOptions {
      draggable?: boolean;
      snappable?: boolean;
      snapDistance?: number;
    }

    interface DrawEvent {
      workingLayer: DrawLayer & L.Layer;
      layer: DrawLayer & L.Layer;
    }

    namespace Edit {
      interface Line {
        enable(options?: EditOptions): void;
        disable(poly?: Layer): void;
        toggleEdit(options?: EditOptions): void;
        enabled(): boolean;
      }

      interface Marker {
        enable(options?: EditOptions): void;
        disable(): void;
        toggleEdit(options?: EditOptions): void;
        enabled(): boolean;
      }

      interface LayerGroup {
        enable(options?: EditOptions): void;
        disable(): void;
        toggleEdit(options?: EditOptions): void;
        enabled(): boolean;
        findLayers(): Layer[];
        dragging(): boolean;
        getOptions(): EditOptions;
      }
    }
  }
}
