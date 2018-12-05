import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { WerehouseItem } from '../../_01_models/werehouse-item';

/**
 * Data source for the Werehouse view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class WerehouseDataSource extends DataSource<WerehouseItem> {
  

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }
  data: Array<WerehouseItem> = this.getData()

  // Pobranie danych
  getData() : Array<WerehouseItem>
  {
    let werehouse : Array<WerehouseItem> = [
      new WerehouseItem("Chemia_Cif", "Chemia", "Cif", "2 butelki"),
      new WerehouseItem("Chemia_Płyn_do_prania", "Chemia", "Płyn do prania", "8 butelek"),
      new WerehouseItem("Spożywcze_Mąka", "Spożywcze", "Mąka", "3 kg"),
      new WerehouseItem("Spożywcze_Cukier", "Spożywcze", "Cukier", "2 kg"),
      new WerehouseItem("Spożywcze_Cola", "Spożywcze", "Cola",  "2 litry")
      ]   
  
    return werehouse;
  }
    
  // Dodawanie wpisu
  addItem(item)
  {
    item.id = item.category + "_" + item.name;
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
  connect(): Observable<Array<WerehouseItem>> {
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
  private getPagedData(data: Array<WerehouseItem>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<WerehouseItem>) {
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
