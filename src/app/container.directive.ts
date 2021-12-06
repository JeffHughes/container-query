import { Directive, ElementRef, Input, NgZone } from '@angular/core';

@Directive({
  selector: '[container]',
})
export class ContainerDirective {
  @Input('container') inputs: any;

  observer: any;

  constructor(private host: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    this.observer = new ResizeObserver((entries) => {
      this.zone.run(() => {
        // run in angular zone
        this.updateCurrentClass(entries[0].contentRect.width);
      });
    });

    this.observer.observe(this.host.nativeElement);
  }

  prevLowest = 0;

  updateCurrentClass(width: number) {
    this.host.nativeElement.classList.remove('container-fluid');

    const items = this.inputs.split(',');

    let className = 'container';
    //find first item that is not a number and set it as the class name
    for (let i = 0; i < items.length; i++) {
      if (isNaN(Number(items[i]))) {
        className = items[i];
        break;
      }
    }

    // find all numbers in array and sort them greatest to smallest
    const sortedNumbers = items
      .filter((item: any) => {
        return !isNaN(Number(item));
      })
      .sort((a: number, b: number) => {
        return b - a;
      });

    // find lowest value in array greater than width
    let lowest = sortedNumbers.find((item: number) => {
      return item < width;
    });

    // if lowest is not found, set to the last item (smalles) in the array
    if (!lowest) {
      lowest = sortedNumbers[sortedNumbers.length - 1];
    }

    // if the lowest value is not the same as the previous value, set the class
    if (lowest && this.prevLowest !== lowest) {
      this.host.nativeElement.classList.remove(
        `${className}-${this.prevLowest}`
      );
      this.host.nativeElement.classList.add(`${className}-${lowest}`);
      this.prevLowest = lowest;
    }
  }

  ngOnDestroy() {
    this.observer.unobserve(this.host.nativeElement);
  }
}
