import { Pipe, PipeTransform } from '@angular/core';
import { ItemSubtype, getSubtypeOptionById } from '@slackmap/core';

@Pipe({
  name: 'subtypeLabel'
})
export class SubtypeLabelPipe implements PipeTransform {

  transform(id: ItemSubtype, ...args: unknown[]): unknown {
    const option = getSubtypeOptionById(id);
    if(option) {
      return option.label;
    }
    return id;
  }
}
