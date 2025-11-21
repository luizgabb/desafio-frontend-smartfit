import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Forms } from './forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('Forms - Teste Simplificado', () => {
  let component: Forms;

  beforeEach(() => {
    // ⚠️ CRIANDO O COMPONENTE MANUALMENTE - sem TestBed
    component = new Forms(
      new FormBuilder(),
      {} as any, // GetUnits - ignora
      {} as any  // FilterUnits - ignora
    );

    // Inicializa manualmente
    component.formGroup = new FormBuilder().group({
      hour: '',
      showClosed: true
    });
    component.results = [];
    component.filterResults = [];
  });

  it('should create component manually', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form when onClean is called - VERSÃO SIMPLES', () => {
    console.log('🎯 TESTANDO APENAS A FUNÇÃO onClean...');

    // 1️⃣ PREENCHE o formulário
    component.formGroup.setValue({
      hour: 'afternoon',
      showClosed: false
    });

    console.log('📝 ANTES de onClean:', component.formGroup.value);

    // 2️⃣ CHAMA a função
    component.onClean();

    // 3️⃣ VERIFICA se limpou
    console.log('📝 DEPOIS de onClean:', component.formGroup.value);

    expect(component.formGroup.value).toEqual({
      hour: null,
      showClosed: null
    });

    console.log('✅ TESTE PASSOU! Formulário foi resetado corretamente.');
  });
});
