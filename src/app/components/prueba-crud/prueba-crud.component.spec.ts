import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaCrudComponent } from './prueba-crud.component';

describe('PruebaCrudComponent', () => {
  let component: PruebaCrudComponent;
  let fixture: ComponentFixture<PruebaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
