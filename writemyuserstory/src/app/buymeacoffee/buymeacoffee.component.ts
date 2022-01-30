import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buymeacoffee',
  templateUrl: './buymeacoffee.component.html',
})
export class BuymeacoffeeComponent {
  showBanner = true;

  constructor() { }

  toggleBanner() {
    this.showBanner = !this.showBanner;
  }

}
