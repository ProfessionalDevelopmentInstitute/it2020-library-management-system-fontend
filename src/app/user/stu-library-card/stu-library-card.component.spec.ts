import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuLibraryCardComponent } from './stu-library-card.component';

describe('StuLibraryCardComponent', () => {
  let component: StuLibraryCardComponent;
  let fixture: ComponentFixture<StuLibraryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StuLibraryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StuLibraryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
