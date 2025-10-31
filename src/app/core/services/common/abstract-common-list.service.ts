import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractCommonListService<T> {
  abstract searchList(searchValue: string, page: number, pageSize: number): Observable<any>;
  abstract getNotDeletedOrdered(pageSize: number, page: number, sortColumn: string, sortDirection: string): Observable<any>;
  abstract statusEliminado(codigo: any): Observable<any>;
}
