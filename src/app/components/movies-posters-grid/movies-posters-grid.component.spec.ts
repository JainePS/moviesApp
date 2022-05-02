import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPostersGridComponent } from './movies-posters-grid.component';

describe('MoviesPostersGridComponent', () => {
  let component: MoviesPostersGridComponent;
  let fixture: ComponentFixture<MoviesPostersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesPostersGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesPostersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
