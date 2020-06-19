import { Component, OnInit, Input } from '@angular/core';
import { SUBTYPE_OPTIONS, ItemType, DrawType } from "@slackmap/core";
@Component({
  selector: 'add-subtype-input',
  templateUrl: './subtype.input.html',
  styleUrls: ['./subtype.input.scss']
})
export class SubtypeInput implements OnInit {

  options = SUBTYPE_OPTIONS.filter(o => (o.type === ItemType.SPOT && o.drawType === DrawType.LINE));

  @Input()
  name: string;

  constructor() { }

  ngOnInit(): void {
  }

}
