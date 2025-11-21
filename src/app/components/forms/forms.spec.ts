import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Forms } from './forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('Forms - Teste Simplificado', () => {
  let component: Forms;

  beforeEach(() => {
    component = new Forms(
      new FormBuilder(),
      {} as any,
      {} as any
    );

    component.formGroup = new FormBuilder().group({
      hour: '',
      showClosed: true
    });
    component.results = [];
    component.filterResults = [];
  });

  it('a função foi criada?', () => {
    expect(component).toBeTruthy();
  });

  it('após o botão ser clicado, o forms foi limpo?', () => {
    component.formGroup.setValue({
      hour: 'afternoon',
      showClosed: false
    });

    component.onClean();

    expect(component.formGroup.value).toEqual({
      hour: null,
      showClosed: null
    });
  });
});
