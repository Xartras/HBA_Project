import { Component, OnInit } from '@angular/core';
import { PeriodsDataSource } from './periods-datasource';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Period } from '../../_01_models/period';
import { PeriodsService } from '../../_02_services/periods-srvc.service';
import { UserAuthService } from '../../_02_services/user-auth-service.service';
import { BehaviorSubject } from 'rxjs'



@Component({
  selector: 'periods',
  templateUrl: './periods.component.html',
  styleUrls: ['../../app.component.css']
})
export class PeriodsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
           , private ServicePrds: PeriodsService
           , private ServiceUsr: UserAuthService) {}
  
  dataSource: PeriodsDataSource = new PeriodsDataSource(null, this.ServicePrds);
  dataTable: Period[] = [];
  dataBS = new BehaviorSubject(this.dataTable)
  isFormSubmitted = false;
  areDatesCorrect = false;
  displayedColumns = ['id', 'from', 'until'];

  addPeriodForm: FormGroup
  get formInput() { return this.addPeriodForm.controls }

  ngOnInit() 
  {
    this.dataSource = new PeriodsDataSource(this.dataBS.asObservable(), this.ServicePrds);
    // Pobranie okresow rozliczeniowych
    this.ServicePrds.getPeriods().subscribe((data: any[]) =>
    {
      data.forEach(item => 
        {
          if(item.user == this.ServiceUsr.usersLogin)
          {
            this.dataTable.push(new Period(item._id, item.periodFrom, item.periodUntil, item.user))
          }
          else
          {
            data.splice(data.indexOf(item), 1);
          }
        })
        this.dataSource = new PeriodsDataSource(this.dataBS.asObservable(), this.ServicePrds);        
    })

    // zdefiniowanie formularza
    this.addPeriodForm = this.formBuilder.group(
      {
         cPeriodBegin: new FormControl( '', Validators.compose([Validators.required]) )
        ,cPeriodEnd:   new FormControl( '', Validators.compose([Validators.required, ]) )
      });
  }

  btnAddPeriod()
  {
    this.isFormSubmitted = true;

    if(this.addPeriodForm.valid)
    {
      if( this.dateRangeCheck( this.addPeriodForm.controls.cPeriodBegin.value, this.addPeriodForm.controls.cPeriodEnd.value ) )
      {
        let newPeriod = new Period("", this.addPeriodForm.controls.cPeriodBegin.value, this.addPeriodForm.controls.cPeriodEnd.value, this.ServiceUsr.usersLogin)
        this.dataSource.addItem(this.dataTable, newPeriod);
        this.dataBS.next(this.dataTable);
        this.isFormSubmitted = false;
        this.areDatesCorrect = false;
      }
      else { this.areDatesCorrect = true }
    }
  }

  private dateRangeCheck(from: Date, until: Date)
  {
    return until > from;
  }
  
}


