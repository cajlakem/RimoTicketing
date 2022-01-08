import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { BreadCrumbId } from './_models/BreadCrumbId'

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  private breadCrumbIds: BreadCrumbId[]
  private currentBreadCrumb: BreadCrumbId

  private subjectName = new Subject<any>()

  constructor() {
    this.breadCrumbIds = this.loadBreadCrumIds()
  }

  sendUpdate(message: BreadCrumbId) {
    this.subjectName.next({ message })
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable()
  }

  private loadBreadCrumIds(): BreadCrumbId[] {
    return (this.breadCrumbIds = JSON.parse(
      localStorage.getItem('breadCrumbIds')!,
    ))
  }

  private initBreadCrumIds(): BreadCrumbId[] {
    var breadCrumbIds: BreadCrumbId[] = []
    return this.saveBreadCrumbIds(breadCrumbIds)
  }

  public getBreadCrumIds(): BreadCrumbId[] {
    var list = JSON.parse(localStorage.getItem('breadCrumbIds')!)
    if (list === null) {
      return this.initBreadCrumIds()
    } else return list
  }

  public pasivateBreadCrumbId(id: BreadCrumbId) {
    this.sendUpdate(id)
    this.currentBreadCrumb = id
    var ids = this.getBreadCrumIds()
    var result = null
    ids.forEach((item, index) => {
      if (item.id == id.id) result = item
    })
    if (result === null) {
      ids.push(id)
      if (ids.length >= 10) ids.shift()
      return this.saveBreadCrumbIds(ids)
    } else return ids
  }

  private saveBreadCrumbIds(ids: BreadCrumbId[]): BreadCrumbId[] {
    localStorage.setItem('breadCrumbIds', JSON.stringify(ids))
    this.breadCrumbIds = ids
    return ids
  }

  public removeBreadCrumbId(id: BreadCrumbId): BreadCrumbId[] {
    var ids = this.getBreadCrumIds()
    ids.forEach((item, index) => {
      if (item.id === id.id) ids.splice(index, 1)
    })
    this.saveBreadCrumbIds(ids)
    return ids
  }

  public getCurrentBreadCrumb(): BreadCrumbId {
    return this.currentBreadCrumb
  }
}
