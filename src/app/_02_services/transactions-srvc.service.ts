import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionItem } from '../_01_models/transaction-item';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  transactionsURL = 'http://localhost:4000/Transactions';

  // Pobranie planu oszczednosiowego
  getTransactions() { return this.http.get(`${this.transactionsURL}`) }

  // Dodanie planu oszczednosciowego
  addTransaction(newItem: TransactionItem) 
  {
    const obj = 
    {
      _id:         newItem.id,
      type:        newItem.type,
      subType:     newItem.subType,
      category:    newItem.category,
      name:        newItem.name,
      amount:      newItem.amount,
      description: newItem.description,
      accounted:   newItem.accounted,
      entered:     newItem.entered,
      period:      newItem.period,
      comment:     newItem.comment,
      user:        newItem.user
    };
    this.http.post(`${this.transactionsURL}/add`, obj).subscribe(res => console.log('Dodano transakcje'));
  }

  // Aktualizacja planu oszczednosciowego
  updateTransaction(updatingItem: TransactionItem, id: string) 
  {
    this.deleteTransaction(id);
    this.addTransaction(updatingItem);
  }

  // Usuniecie planu oszczednosciowego
  deleteTransaction(itemID) 
  {
    return this.http.get(`${this.transactionsURL}/delete/${itemID}`).subscribe(res => console.log('Usunieto transakcje'));;
  }
}
