import { Component, Input, OnInit } from '@angular/core';
import { GetUnits } from '../../services/get-units';
import { Location } from '../../types/location.interface';
import { Card } from "../card/card";
import { NgForOf } from '@angular/common';
@Component({
  selector: 'app-cards-list',
  imports: [Card, NgForOf],
  templateUrl: './cards-list.html',
  styleUrl: './cards-list.scss'
})
export class CardsList implements OnInit {
  @Input() unitsList: Location[] = []
  cards: any;

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.unitsList)
  }
}
