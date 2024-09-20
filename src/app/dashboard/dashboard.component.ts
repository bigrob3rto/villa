import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  data : any
  reservations : number[] = []
  res_guests : any
  res_num = 0

  /****************************************************** */
  constructor(
    private dbService: DbService,
    private msg: NotificationsService
  ) {
  }

  async ngOnInit(): Promise<void> {

    this.data = await this.dbService.getAll()
    const all_rows = this.data.map((v: { res_num: any; }) => v.res_num)
    this.reservations = all_rows.filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index);
  }

  res_guest_number( res_num : number){
    return this.data.filter( (v: { res_num: number; }) => v.res_num == res_num).length
  }

  async loadReservation(item : number){
    this.res_num = item
    this.res_guests = await this.dbService.getRows(this.res_num)

  }

}
