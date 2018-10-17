import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TransactionsDataItem {
  type: string;
  category: string;
  name: string;
  amount: number;
  accounted: string;
  entered: string;
  period: string;
  description: string;
  actions: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TransactionsDataItem[] = 
[
  { type: "Zysk", category: "Wypłata", name: "Wypłata 10.2018", amount: 2550, accounted: "2018-10-27", entered: "2018-10-28", period: "11", description: "", actions: "Edytuj;Usuń" },
  { type: "Zysk", category: "Dodatkowe", name: "Inne", amount: 750, accounted: "2018-10-31", entered: "2018-10-31", period: "11", description: "", actions: "Edytuj;Usuń" },
  { type: "Koszt", category: "Opaty", name: "Gaz", amount: 25, accounted: "2018-11-05", entered: "2018-11-05", period: "11", description: "", actions: "Edytuj;Usuń" },
  { type: "Koszt", category: "Opaty", name: "Prąd", amount: 120, accounted: "2018-11-05", entered: "2018-11-05", period: "11", description: "", actions: "Edytuj;Usuń" },
];

/**
 * Data source for the TransactionsData view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TransactionsDataDataSource extends DataSource<TransactionsDataItem> {
  data: TransactionsDataItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TransactionsDataItem[]> {
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
  private getPagedData(data: TransactionsDataItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TransactionsDataItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
