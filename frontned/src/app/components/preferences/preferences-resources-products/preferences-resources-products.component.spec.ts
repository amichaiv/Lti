import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesResourcesProductsComponent } from './preferences-resources-products.component';

describe('PreferencesResourcesProductsComponent', () => {
  let component: PreferencesResourcesProductsComponent;
  let fixture: ComponentFixture<PreferencesResourcesProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesResourcesProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesResourcesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
