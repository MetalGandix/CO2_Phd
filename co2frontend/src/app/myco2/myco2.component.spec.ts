import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myco2Component } from './myco2.component';

describe('Myco2Component', () => {
  let component: Myco2Component;
  let fixture: ComponentFixture<Myco2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myco2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myco2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
