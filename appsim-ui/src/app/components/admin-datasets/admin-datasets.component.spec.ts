import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatasetsComponent } from './admin-datasets.component';

describe('AdminDatasetsComponent', () => {
  let component: AdminDatasetsComponent;
  let fixture: ComponentFixture<AdminDatasetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDatasetsComponent]
    });
    fixture = TestBed.createComponent(AdminDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
