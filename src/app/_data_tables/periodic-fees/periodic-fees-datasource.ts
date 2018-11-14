import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { PeriodicFeeItem } from '../../_models/periodic-fee-item';


/**
 * Data source for the PeriodicFees view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PeriodicFeesDataSource extends DataSource<PeriodicFeeItem> {
  
  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  data: Array<PeriodicFeeItem> = this.getData()

  // Pobranie danych
  getData() : Array<PeriodicFeeItem>
  {
    let periodicFees : Array<PeriodicFeeItem> = [
      new PeriodicFeeItem('Opłaty_Prąd_1', 'Opłaty', 'Prąd', '2018-01-01', '2018-12-31', '2 miesiące', true ),
      new PeriodicFeeItem('Opłaty_Gaz_1', 'Opłaty', 'Gaz', '2018-01-01', '2018-12-31', '2 miesiące', false )
    ]   

    return periodicFees;
  }

  // Generowanie ID dla nowego wpisu
  private calculateNewId(item) : string
  {
    let newID : string = item.category+"_"+item.name+'_';
    let newIdNum : number = 0;

    for(let i = 0; i < this.data.length; i++)
    {
      if(this.data[i].category == item.category && this.data[i].name == item.name)
      { 
        if(parseInt(this.data[i].id.split("_")[2])  > newIdNum  )
        { newIdNum = parseInt(this.data[i].id.split("_")[2]) }
      }
      else
      { continue; }
    }  

    newIdNum++;
    return newID+newIdNum.toString();
  }
  
  // Dodawanie wpisu
  addItem(item)
  {
    item.id = this.calculateNewId(item);
    this.data.push(item);
  }

  // Usuwanie wpisu
  removeItem(item)
  {
    this.data.splice(this.data.indexOf(item), 1);
  }

  // Edycja wpisu
  editItem(oldItem, newItem)
  {
    this.data[this.data.indexOf(oldItem)] = newItem;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<PeriodicFeeItem>> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Array<PeriodicFeeItem>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<PeriodicFeeItem>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'category': return compare(a.category, b.category, isAsc);
        case 'name': return compare(a.category, b.category, isAsc);
        case 'paidFrom': return compare(a.category, b.category, isAsc);
        case 'paidUntil': return compare(a.category, b.category, isAsc);
        case 'paymentPeriod': return compare(a.category, b.category, isAsc);
        case 'ifAlreadyPaid': return compare(a.category, b.category, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
