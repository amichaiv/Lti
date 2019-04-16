import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomStatsComponent } from './classroom-stats.component';

describe('ClassroomStatsComponent', () => {
  let component: ClassroomStatsComponent;
  let fixture: ComponentFixture<ClassroomStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
