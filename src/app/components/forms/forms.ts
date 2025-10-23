import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUnits } from '../../services/get-units';
import { Location } from '../../types/location.interface';
import { first, last } from 'rxjs';


const OPENING_HOURS = {
  morning: {
    first: '06',
    last: "12"
  },
  afternoon: {
    first:'12',
    last:'18'
  },
  night: {
    first:'18',
    last:"23"
  }
}


type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

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

  transformWeekday(weekday: number) {
    switch(weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }

  filterUnits(unit:Location, open_hour: string, close_hour:string){
    if(!unit.schedules) {
      return true
    }
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let todays_weekday  = this.transformWeekday(new Date().getDay());

    //if(opened === true && unit.opened === true) {

    //}


    for(let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour
      let schedule_weekday = unit.schedules[i].weekdays

      if(todays_weekday === schedule_weekday) {
        if(schedule_hour !== 'Fechada'){
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) {
            return true;
          } else return false;
        }
      }

    }

    return false;
  }



  onSubmit(): void {
    let intermediateResults = this.results;

    if(!this.formGroup.value.showClosed) {
      intermediateResults = this.results.filter(location => location.opened === true)
    }
    if(this.formGroup.value.hour) {
      const OPEN_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].first
      const CLOSE_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].last
      this.filterResults = intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR))
    } else {
      this.filterResults = intermediateResults;
    }

  }
  onClean(): void {
    this.formGroup.reset()
  }

}

