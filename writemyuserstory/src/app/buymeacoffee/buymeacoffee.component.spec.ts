import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuymeacoffeeComponent } from './buymeacoffee.component';

describe('BuymeacoffeeComponent', () => {
  let component: BuymeacoffeeComponent;
  let fixture: ComponentFixture<BuymeacoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuymeacoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuymeacoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
