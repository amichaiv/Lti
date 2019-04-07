import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesResourcesComponent } from './preferences-resources.component';

describe('PreferencesResourcesComponent', () => {
  let component: PreferencesResourcesComponent;
  let fixture: ComponentFixture<PreferencesResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
