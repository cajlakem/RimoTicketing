import { Component, OnInit } from '@angular/core'
import { BreadCrumbService } from '../bread-crumb.service'
import { BreadCrumbId } from '../_models/BreadCrumbId'
import { Subscription } from 'rxjs'
import { RimoTicketingClientService } from '../rimo-ticketing-client.service'
import { AuthserviceService } from '../authservice.service'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  ids: BreadCrumbId[] = []
  private subscriptionName: Subscription
  userName: string = this.authService.getCurrentUser().user;

  constructor(
    private breadCrumbService: BreadCrumbService,
    private ticketingApi: RimoTicketingClientService,
    private authService: AuthserviceService) { }

  async ngOnInit(): Promise<void> {

    for (let id of this.breadCrumbService.getBreadCrumIds()) {
      await this.ticketExists(id.id) ? this.ids.push(id) : this.breadCrumbService.removeBreadCrumbId(id)
    }
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

  ngOnDestroy() {
    this.subscriptionName.unsubscribe()
  }

  async ticketExists(id: string) {
    let result: boolean = false;
    try {
      const response = await this.ticketingApi.queryTicketWithlId(id, this.userName).toPromise()
      result = true
    } catch (e) {
      result = false
    }

    return result;
  }
}
