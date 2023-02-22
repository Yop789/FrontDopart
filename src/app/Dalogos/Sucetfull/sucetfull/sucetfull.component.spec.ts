import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucetfullComponent } from './sucetfull.component';

describe('SucetfullComponent', () => {
  let component: SucetfullComponent;
  let fixture: ComponentFixture<SucetfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucetfullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucetfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
