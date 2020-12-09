import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OqComponent } from './oq.component';

describe('OqComponent', () => {
  let component: OqComponent;
  let fixture: ComponentFixture<OqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
