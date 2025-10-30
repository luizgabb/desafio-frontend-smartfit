import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
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
  @Output() submitEvent = new EventEmitter();
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

    this.submitEvent.emit()
  }
  onClean(): void {
    this.formGroup.reset()
  }

}

