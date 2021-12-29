import { Injectable } from '@angular/core'
import { BreadCrumbId } from './_models/BreadCrumbId'

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  private breadCrumbIds: BreadCrumbId[]
  private currentBreadCrumb: BreadCrumbId

  constructor() {
    this.breadCrumbIds = this.loadBreadCrumIds()
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
    this.currentBreadCrumb = id
    var ids = this.getBreadCrumIds()
    var result = null
    ids.forEach((item, index) => {
      if (item.id == id.id) result = item
    })
    if (result === null) {
      ids.push(id)
      if (ids.length >= 10) ids.pop
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
