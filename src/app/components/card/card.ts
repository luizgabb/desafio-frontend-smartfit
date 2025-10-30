import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../types/location.interface';
import { NgClass} from '@angular/common';
@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card implements OnInit {
  @Input() card!: Location;

  constructor() {

  }

  ngOnInit(): void {

  }
}
