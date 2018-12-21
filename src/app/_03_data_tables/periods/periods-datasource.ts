import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Period } from '../../_01_models/period';
import { PeriodsService } from '../../_02_services/periods-srvc.service';


/**
 * Data source for the Periods view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PeriodsDataSource extends DataSource<Period> {
  data: Period[];

  constructor(private periods: Observable<Period[]>
             ,private servicePrds: PeriodsService) { super(); }

  private getPeriods() : Period[]
  {
    let allPeriods: Period[]


    return allPeriods;
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
