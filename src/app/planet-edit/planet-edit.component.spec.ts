import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetEditComponent } from './planet-edit.component';

describe('PlanetEditComponent', () => {
  let component: PlanetEditComponent;
  let fixture: ComponentFixture<PlanetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
