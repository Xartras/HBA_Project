import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { HomeBillingItem } from '../../_models/home-billing-item';

/**
 * Data source for the HomeBillings view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class HomeBillingsDataSource extends DataSource<HomeBillingItem> {
  

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  data: HomeBillingItem[] = this.getData();

  // Pobranie danych
  getData() : Array<HomeBillingItem>
  {
    let homeBillings: Array<HomeBillingItem> = [
      new HomeBillingItem("Woda_1", "Woda", "2018-10-01", 120, 2.5),
      new HomeBillingItem("Prąd_1", "Prąd", "2018-10-01", 130, 1.1),
      new HomeBillingItem("Czynsz_1", "Czynsz", "2018-10-01", 230, 15)
    ]

    return homeBillings
  }

  // Generowanie ID dla nowego wpisu
  private calculateNewId(item) : string
  {
    let newID : string = item.category+"_"+item.name+'_';
    let newIdNum : number = 0;

    for(let i = 0; i < this.data.length; i++)
    {
      if(this.data[i].name == item.name)
      { 
        if(parseInt(this.data[i].id.split("_")[1])  > newIdNum  )
        { newIdNum = parseInt(this.data[i].id.split("_")[1]) }
      }
      else
      { continue; }
    }  

    newIdNum++;
    return newID+newIdNum.toString();
  }

  // Dodanie wpisu
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
  connect(): Observable<Array<HomeBillingItem>> {
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
  private getPagedData(data: Array<HomeBillingItem>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<HomeBillingItem>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'period': return compare(a.name, b.name, isAsc);
        case 'actualState': return compare(a.name, b.name, isAsc);
        case 'difference': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
