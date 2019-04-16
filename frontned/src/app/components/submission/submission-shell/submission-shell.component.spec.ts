import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionShellComponent } from './submission-shell.component';

describe('SubmissionShellComponent', () => {
  let component: SubmissionShellComponent;
  let fixture: ComponentFixture<SubmissionShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
