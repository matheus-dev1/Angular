import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ModalComponent
      ],
    }).compileComponents();
  });

  it('should create the modalComponent', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const modalComponent = fixture.componentInstance;
    expect(modalComponent).toBeTruthy();
  });

});
