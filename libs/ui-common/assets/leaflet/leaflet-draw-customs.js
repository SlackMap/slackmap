
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
