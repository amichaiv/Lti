import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesAddFileComponent } from './preferences-add-file.component';

describe('PreferencesAddFileComponent', () => {
  let component: PreferencesAddFileComponent;
  let fixture: ComponentFixture<PreferencesAddFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesAddFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesAddFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
