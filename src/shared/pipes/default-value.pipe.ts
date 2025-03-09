import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'defaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: string): string {
    if (value === 'N/A' || value === 'null' || value === 'undefined' || value === '' || !value) {
      return '-';
    }

    return value;
  }
}