import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddFacade, AddActions } from '../../+add';
import { DrawData } from '@slackmap/ui/map';
import { FormBuilder } from '@angular/forms';
import { untilDestroy } from '@ngrx-utils/store';
import { filter } from 'rxjs/operators';
import { SUBTYPE_OPTIONS, ACCESS_OPTIONS, ItemType, DrawType } from '@slackmap/core';
import { of } from 'rxjs';

@Component({
  selector: 'add-slackline-form',
  templateUrl: './slackline.form.html',
  styleUrls: ['./slackline.form.scss']
})
export class SlacklineForm implements OnInit, OnDestroy {

  DrawType = DrawType;
  addState$ = this.addFacade.addState$;
  accessOptions$ = of(ACCESS_OPTIONS);
  subtypeOptions$ = this.addFacade.subtypeOptions$;


  form = this.fb.group({
    subtype: [],
    access: [],
    name: [],
    length: [],
    height: [],
    lengthLaser: [],
    heightLaser: [],
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
  ngOnDestroy() {}
}
