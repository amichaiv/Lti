import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomShellComponent } from './classroom-shell.component';

describe('ClassroomShellComponent', () => {
  let component: ClassroomShellComponent;
  let fixture: ComponentFixture<ClassroomShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
