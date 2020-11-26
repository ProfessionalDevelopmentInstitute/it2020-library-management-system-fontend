import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfOneComponent } from './shelf-one.component';

describe('ShelfOneComponent', () => {
  let component: ShelfOneComponent;
  let fixture: ComponentFixture<ShelfOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
