import { Component, ElementRef, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-width',
  templateUrl: './current-width.component.html',
  styleUrls: ['./current-width.component.scss'],
})
export class CurrentWidthComponent implements OnInit {
  width = 0;
  observer: any;

  constructor(private host: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    this.observer = new ResizeObserver((entries) => {
      this.zone.run(() => {
        this.width = entries[0].contentRect.width;
      });
    });

    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.host.nativeElement);
  }
}
