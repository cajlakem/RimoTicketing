import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchServiceService {
  private subjectName = new Subject<any>()

  constructor() { }

  sendUpdate() {
    this.subjectName.next("")
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable()
  }
}

