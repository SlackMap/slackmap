import { Pipe, PipeTransform } from '@angular/core';
import { getAccessOptionById, AccessType } from '@slackmap/core';

@Pipe({
  name: 'accessLabel'
})
export class AccessLabelPipe implements PipeTransform {

  transform(id: AccessType, ...args: unknown[]): unknown {
    const option = getAccessOptionById(id);
    if(option) {
      return option.label;
    }
    return id;
  }
}
