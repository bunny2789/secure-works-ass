import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform',
  standalone: true
})
export class TransformPipe implements PipeTransform {
  transform(value: any[], transformFn: (data: any[]) => any[]): any[] {
    return value ? transformFn(value) : [];
  }
}