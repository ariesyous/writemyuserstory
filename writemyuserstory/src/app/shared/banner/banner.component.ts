import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
})
export class BannerComponent {

  showBanner = true;

  constructor() { }

  toggleBanner() {
    this.showBanner = !this.showBanner;
  }


}
