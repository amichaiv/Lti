import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomToolsComponent } from './classroom-tools.component';

describe('ClassroomToolsComponent', () => {
  let component: ClassroomToolsComponent;
  let fixture: ComponentFixture<ClassroomToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
