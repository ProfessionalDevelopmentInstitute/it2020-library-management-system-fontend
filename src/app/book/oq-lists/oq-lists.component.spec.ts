import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OqListsComponent } from './oq-lists.component';

describe('OqListsComponent', () => {
  let component: OqListsComponent;
  let fixture: ComponentFixture<OqListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OqListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OqListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
