import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrinciplComponent } from './pagina-principl.component';

describe('PaginaPrinciplComponent', () => {
  let component: PaginaPrinciplComponent;
  let fixture: ComponentFixture<PaginaPrinciplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPrinciplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaPrinciplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
