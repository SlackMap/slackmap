import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFacade, AddActions, AddState } from '../../+add';
import { DrawData } from '@slackmap/ui/map';
import { FormBuilder, Validators } from '@angular/forms';
import { untilDestroy } from '@ngrx-utils/store';
import { filter, map } from 'rxjs/operators';
import { SUBTYPE_OPTIONS, ACCESS_OPTIONS, ItemType, DrawType, STATUS_OPTIONS, SportType, AccessType, StatusType } from '@slackmap/core';
import { of } from 'rxjs';
import { SpotModel } from '@slackmap/api/spot/dto';
import * as geohash from 'ngeohash';

@Component({
  selector: 'add-slackline-form',
  templateUrl: './slackline.form.html',
  styleUrls: ['./slackline.form.scss']
})
export class SlacklineForm implements OnInit, OnDestroy {

  DrawType = DrawType;
  state$ = this.addFacade.state$;
  accessOptions$ = of(ACCESS_OPTIONS);
  statusOptions$ = of(STATUS_OPTIONS);
  subtypeOptions$ = this.addFacade.subtypeOptions$;


  form = this.fb.group({
    subtype: [null, [Validators.required]],
    access: [AccessType.OPEN],
    status: [StatusType.ACTIVE],
    name: [],
    length: [],
    height: [],
    lengthLaser: [],
    heightLaser: [],
    version: [0],
  });

  constructor(
    public addFacade: AddFacade,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // dispatch value changes to store
    this.form.valueChanges.subscribe(spotData => this.addFacade.dispatch(AddActions.setSpotData({spotData})))

    // populate form with data for edit
    this.addFacade.spot$.pipe(
      untilDestroy(this),
      filter(v => !!v)
      ).subscribe(spot => this.form.patchValue(spot))

    // update forms length value if the map drawData
    this.addFacade.drawData$.pipe(
      untilDestroy(this),
      filter(v => !!v),
      filter(v => !this.form.value.lengthLaser),
      map(data => data.distance)
      ).subscribe(length => this.form.patchValue({length}))
  }
  reset() {
    this.addFacade.dispatch(AddActions.reset())
  }
  drawTypeChange(drawType: DrawType) {
    this.addFacade.dispatch(AddActions.setDrawType({drawType}))
  }
  onDrawData(drawData: DrawData) {
    this.addFacade.dispatch(AddActions.setDrawData({drawData}))
  }
  onSave(state: AddState) {
    const lat = state.drawData.center.coordinates[1];
    const lon = state.drawData.center.coordinates[0];

    const spot: SpotModel = {
      ...state.spotData,
      rid: ''+Date.now(),
      sport: state.sportType,
      type: ItemType.SPOT,
      position: [lon, lat],
      geohash: geohash.encode(lat, lon, 6),
      geometry: state.drawData.geometry,
      bbox: state.drawData.bbox,
    }
    this.addFacade.dispatch(AddActions.save({spot: spot as any}))
  }
  ngOnDestroy() {}
}
