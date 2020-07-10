import { Pipe, PipeTransform } from '@angular/core';
import { SPORT_OPTIONS, SportType } from '@slackmap/core';

@Pipe({
  name: 'sportLabel'
})
export class SportLabelPipe implements PipeTransform {

  transform(id: SportType, ...args: unknown[]): unknown {
    const option = SPORT_OPTIONS.find(o => o.id === id);
    if(option) {
      return option.label;
    }
    return id;
  }
}
