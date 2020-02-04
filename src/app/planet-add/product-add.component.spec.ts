import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetAddComponent } from './planet-add.component';

describe('PlanetAddComponent', () => {
  let component: PlanetAddComponent;
  let fixture: ComponentFixture<PlanetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
