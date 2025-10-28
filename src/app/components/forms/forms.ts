import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUnits } from '../../services/get-units';
import { Location } from '../../types/location.interface';
import { first, last } from 'rxjs';
import { FilterUnits } from '../../services/filter-units';


@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.scss'
})
export class Forms implements OnInit {

  results: Location[] = [];
  formGroup!: FormGroup;
  filterResults: Location[] = [];

  constructor(private formBuilder: FormBuilder,
    private unitService: GetUnits,
    private filterUnitsService: FilterUnits) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filterResults = data;
    });
  }

  onSubmit(): void {
    let { showClosed, hour } = this.formGroup.value
    this.filterResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitService.setFilterUnits(this.filterResults)

  }
  onClean(): void {
    this.formGroup.reset()
  }

}

