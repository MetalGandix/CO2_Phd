import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Co2InputComponent } from './co2-input.component';

describe('Co2InputComponent', () => {
  let component: Co2InputComponent;
  let fixture: ComponentFixture<Co2InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Co2InputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Co2InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
