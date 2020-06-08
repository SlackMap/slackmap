import * as L from "leaflet";
import "leaflet-draw";

declare module "leaflet" {
  export interface Map {
    _container: any;
  }
  export namespace Edit {
    export interface PolyVerticesEdit {
      _createMiddleMarkerOld(): any;
      _createMiddleMarker(): any;
    }
    export let noMiddleMarker: boolean;
  }
}

L.Edit.PolyVerticesEdit.prototype._createMiddleMarkerOld = L.Edit.PolyVerticesEdit.prototype._createMiddleMarker;
L.Edit.PolyVerticesEdit.prototype._createMiddleMarker = function() {
  if (L.Edit.noMiddleMarker) {
    return;
  }
  this._createMiddleMarkerOld.apply(this, arguments);
};
L.Edit.noMiddleMarker = false;

/**
 * polyline error fix
 */
// var _updateFinishHandler = L.Draw.Polyline.prototype._updateFinishHandler;
// L.Draw.Polyline.prototype._updateFinishHandler = function() {
//   if (this._markers) {
//     _updateFinishHandler.apply(this, arguments);
//   }
// };
// var _updateRunningMeasure = L.Draw.Polyline.prototype._updateRunningMeasure;
// L.Draw.Polyline.prototype._updateRunningMeasure = function() {
//   if (this._markers) {
//     _updateRunningMeasure.apply(this, arguments);
//   }
// };
