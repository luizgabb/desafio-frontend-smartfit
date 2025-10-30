import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component/header';
import { Forms } from "./components/forms/forms";
import {  ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CardsList } from "./components/cards-list/cards-list";
import { CommonModule } from '@angular/common';
import { Location } from './types/location.interface';
import { GetUnits } from './services/get-units';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Forms, ReactiveFormsModule, CardsList, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showList = new BehaviorSubject(false)
  unitsList: Location[] = []

  constructor(private unitService: GetUnits) {

  }

  onSubmit() {
    this.showList.next(true)
    this.unitsList  = this.unitService.getFilterUnits()
  }
}
