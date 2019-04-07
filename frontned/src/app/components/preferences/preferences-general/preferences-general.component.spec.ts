import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesGeneralComponent } from './preferences-general.component';

describe('PreferencesGeneralComponent', () => {
  let component: PreferencesGeneralComponent;
  let fixture: ComponentFixture<PreferencesGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
