import { Component, OnInit } from '@angular/core'
import { BreadCrumbService } from '../bread-crumb.service'
import { BreadCrumbId } from '../_models/BreadCrumbId'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  ids: BreadCrumbId[]
  private subscriptionName: Subscription

  constructor(private breadCrumbService: BreadCrumbService) {}

  ngOnInit(): void {
    this.ids = this.breadCrumbService.getBreadCrumIds()
    this.subscriptionName = this.breadCrumbService
      .getUpdate()
      .subscribe((message) => {
        this.ids = this.breadCrumbService.getBreadCrumIds()
      })
  }

  public getCurrentBC(): BreadCrumbId {
    return this.breadCrumbService.getCurrentBreadCrumb()
  }

  public getCurrentBCId(): String {
    return this.breadCrumbService.getCurrentBreadCrumb() == null
      ? ''
      : this.breadCrumbService.getCurrentBreadCrumb().id
  }

  public isActive(item: BreadCrumbId): Boolean {
    return this.getCurrentBCId() == item.id
  }

  public isIdsEmpty(): Boolean {
    return this.ids.length === 0
  }
  ngOnDestroy() {
    this.subscriptionName.unsubscribe()
  }
}
