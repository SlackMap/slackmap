import { Pipe, PipeTransform } from '@angular/core';
import { ItemSubtype, STATUS_OPTIONS, StatusType } from '@slackmap/core';

@Pipe({
  name: 'statusLabel'
})
export class StatusLabelPipe implements PipeTransform {

  transform(id: StatusType, ...args: unknown[]): unknown {
    const option = STATUS_OPTIONS.find(o => o.id === id);
    if(option) {
      return option.label;
    }
    return id;
  }
}
