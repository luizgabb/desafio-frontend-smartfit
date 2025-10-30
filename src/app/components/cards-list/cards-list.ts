import { Component, Input, OnInit } from '@angular/core';
import { GetUnits } from '../../services/get-units';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-cards-list',
  imports: [],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss'
})
export class CardsList implements OnInit {
  @Input() unitsList: Location[] = []

  constructor() {

  }

  ngOnInit(): void{
    console.log(this.unitsList)
  }
}
