import { Component, OnInit } from '@angular/core'
import { BreadCrumbService } from '../bread-crumb.service'
import { BreadCrumbId } from '../_models/BreadCrumbId'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  ids: BreadCrumbId[]

  constructor(private breadCrumbService: BreadCrumbService) {}

  ngOnInit(): void {
    this.ids = this.breadCrumbService.getBreadCrumIds()
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
}
