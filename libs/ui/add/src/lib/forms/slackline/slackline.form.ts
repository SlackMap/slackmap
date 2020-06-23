import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AddFacade, AddActions, AddState } from '../../+add';
import { DrawData, MapActions } from '@slackmap/ui/map';
import { FormBuilder, Validators } from '@angular/forms';
import { ACCESS_OPTIONS, ItemType, DrawType, STATUS_OPTIONS, SportType, AccessType, StatusType, RidGenerator } from '@slackmap/core';
import { of } from 'rxjs';
import { SpotModel } from '@slackmap/api/spot/dto';
import { CoreActions } from '@slackmap/ui/core';

@Component({
  selector: 'add-slackline-form',
  templateUrl: './slackline.form.html',
  styleUrls: ['./slackline.form.scss']
})
export class SlacklineForm implements OnInit, OnDestroy {

  @Input()
  drawType: DrawType;

  _spot: SpotModel;

  @Input()
  set spot(spot: SpotModel) {
    // populate form with data for edit
    if(spot) {
      this._spot = spot;
      this.form.patchValue(spot)
    }
  };
  get spot(): SpotModel {
    return this._spot;
  }

  @Input()
  data: SpotModel;

  DrawType = DrawType;
  accessOptions$ = of(ACCESS_OPTIONS);
  statusOptions$ = of(STATUS_OPTIONS);
  subtypeOptions$ = this.addFacade.subtypeOptions$;


  form = this.fb.group({
    rid: [null, [Validators.required]],
    sport: [SportType.SLACKLINE, [Validators.required]],
    type: [ItemType.SPOT, [Validators.required]],
    subtype: [null, [Validators.required]],
    access: [AccessType.OPEN, [Validators.required]],
    status: [StatusType.ACTIVE, [Validators.required]],
    name: [],
    length: [],
    height: [],
    lengthLaser: [],
    heightLaser: [],
    version: [0, [Validators.required]],
    position: [null, [Validators.required]],
    bbox: [null, [Validators.required]],
    geohash: [null, [Validators.required]],
    geometry: [null, [Validators.required]],
  });

  constructor(
    public addFacade: AddFacade,
    public fb: FormBuilder,
    private ridGenerator: RidGenerator,
  ) {
    this.form.patchValue(this.getDefaultData());
   }

  getDefaultData(): Partial<SpotModel> {
    return {
      rid: this.ridGenerator.forItem(ItemType.SPOT),
      type: ItemType.SPOT,
      sport: SportType.SLACKLINE,
      version: 0,
      access: AccessType.OPEN,
      status: StatusType.ACTIVE,
    }
  }

  ngOnInit(): void {
    // dispatch form value changes to store
    this.form.valueChanges.subscribe(data => this.addFacade.dispatch(AddActions.setData({data})))
  }

  reset() {
    this.form.reset(this.getDefaultData());
    this.addFacade.dispatch(AddActions.resetData());
  }
  showMap(showMap: boolean) {
    this.addFacade.dispatch(CoreActions.showMap({showMap}));
  }
  toggleMap(showMap: boolean) {
    this.addFacade.dispatch(CoreActions.showMapToggle());
  }

  onDrawData(drawData: DrawData) {

    if(drawData.geometry) {
      const data: Partial<SpotModel> = {
        position: drawData.position,
        bbox: drawData.bbox,
        geohash: drawData.geohash,
        geometry: drawData.geometry,
      };

      // update length if not lasered
      if(!this.form.value.lengthLaser) {
        data.length = drawData.distance;
      }
      this.form.patchValue(data)
    } else {
      this.reset();
    }
  }

  onSave() {
    this.addFacade.dispatch(AddActions.save({spot: this.data}))
  }
  ngOnDestroy() {}
}
