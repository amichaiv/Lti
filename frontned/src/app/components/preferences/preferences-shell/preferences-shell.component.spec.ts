import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesShellComponent } from './preferences-shell.component';

describe('PreferencesShellComponent', () => {
  let component: PreferencesShellComponent;
  let fixture: ComponentFixture<PreferencesShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
