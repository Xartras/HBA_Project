import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Period } from '../../_01_models/period';
import { PeriodsService } from '../../_02_services/periods-srvc.service';


export class PeriodsDataSource extends DataSource<Period> {
  data: Period[];

  constructor(private periods: Observable<Period[]>
             ,private ServicePrds: PeriodsService) { super(); }


  // Pobranie lat
  getYears(data: Period[]) : string
  {
    let yearsTable = [];
    let years;
    if( data.length < 1) { years = data[0].id.split("_")[2] }
    else
    {
      for(let i=0; i < data.length; i++)
      if( yearsTable.indexOf(data[i].id.split("_")[2]) == null )
      yearsTable.push(data[i].id.split("_")[2]);

      yearsTable.forEach(year =>
        years = years + year + "\",\""
        )
      years = years.substring(0, years.length()-3)
      console.log(years);
    }

    return years;
  }

  // Dodanie Okresu
  addItem(data:  Period[], item:  Period)
  {
    item.id = this.calculateNewId(data, item);
    this.ServicePrds.addPeriod(item)
    data.push(item);
  }

  // Wyliczenie ID
  calculateNewId(data:  Period[], item:  Period)
  {
    let newID : string
    let year: Number = parseInt(item.until.toString().substring(0, 4))
    let idNumber = 1

    if( data.length < 1 )
    { newID = idNumber.toString() + "_" + year.toString() + "_" + item.user }
    else
    {
      for( let i = 0; i < data.length; i++ )
      {
        if( parseInt(data[i].id.split("_")[1]) == year )
        { idNumber++ }
      }
      newID = idNumber.toString() + "_" + year.toString() + "_" + item.user
    }

    return newID
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Period[]> { return this.periods }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

}
