import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUnits } from '../../services/get-units';
import { Location } from '../../types/location.interface';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.scss'
})
export class Forms implements OnInit {

  results: Location[] = [];
  formGroup! : FormGroup;
  filterResults: Location[] = [];

  constructor(private formBuilder: FormBuilder, private unitService: GetUnits) {}
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filterResults = data.locations;
    });
  }

  onSubmit(): void {
    if(!this.formGroup.value.showClosed) {
      this.filterResults = this.results.filter(location => location.opened === true)
    } else {
      this.filterResults = this.results
    }
  }
  onClean(): void {
    this.formGroup.reset()
  }

}

