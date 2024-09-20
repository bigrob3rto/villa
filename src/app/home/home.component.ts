import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DbService } from '../services/db.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  res_num: number = 1001
  step = 0
  res_exist = true
  t1_show = true
  res_guests: any
  show_add_guest = false
  show_update_guest = false

  newGuest = {
    res_num: 0,
    nome: '',
    cognome: '',
    data_nascita: null,
    luogo_nascita: '',
    residenza: '',
    cittadinanza: '',
    doc_type: '',
    doc_num: ''
  }
  
  /****************************************************** */
  constructor(
    private dbService: DbService,
    private msg: NotificationsService
  ) {
  }

  /****************************************************** */
  async getAll() {
    const data = await this.dbService.getAll()
    //console.log(data)
  }

  /****************************************************** */
  async getReservation() {
    this.res_guests = await this.dbService.getRows(this.res_num)
    this.res_exist = this.res_guests?.length ? true : false
    if (this.res_exist)
      this.msg.success("Loaded", "Reservation number: " + this.res_num)

    this.step = 1

    if (!this.res_exist) {
      const data = await this.dbService.getAll()
      const last_res = data?.map(v => v.res_num)[0]
      this.res_num = last_res + 1
      this.msg.info("Info", "Your new reservation number: " + this.res_num)
    }
  }

  /****************************************************** */
  async newReservation() {
    const data = await this.dbService.getAll()
    const last_res = data?.map(v => v.res_num)[0]
    this.res_num = last_res + 1
    this.res_guests = []
    this.msg.info("Info", "Your new reservation number: " + this.res_num)

    this.step = 1
  }

  /****************************************************** */
  async addNewGuest() {
    this.newGuest.res_num = this.res_num

    // check validity
    let valid = true
    valid &&= this.newGuest.nome.length > 0
    valid &&= this.newGuest.cognome.length > 0
    valid &&= this.newGuest.data_nascita != null
    valid &&= this.newGuest.luogo_nascita.length > 0
    valid &&= this.newGuest.residenza.length > 0
    valid &&= this.newGuest.cittadinanza.length > 0
    valid &&= this.newGuest.doc_type!=null && this.newGuest.doc_type.length > 0
    valid &&= this.newGuest.doc_type!=null && this.newGuest.doc_num.length > 0

    if (valid) {
      if (this.show_add_guest)
        await this.dbService.insertRow(this.newGuest)
      if (this.show_update_guest)
        await this.dbService.updateRow(this.newGuest)

      this.show_add_guest = false
      this.show_update_guest = false
      this.res_guests = await this.dbService.getRows(this.res_num)
      this.msg.success("OK", "Added new guest: " + this.newGuest.nome)
    }
    else
      this.msg.error("Error", "Please fill in all required fields.")

  }

  /****************************************************** */
  async deleteGuest(guest: any) {
    if (confirm("Are you sure to delete guest: " + guest.nome + " " + guest.cognome + " ?")) {
      const response = await this.dbService.deleteRow(guest.id)
      this.res_guests = await this.dbService.getRows(this.res_num)
      this.msg.success("ok", "Deleted guest: " + guest.nome)
    }
  }

  /****************************************************** */
  async updateGuest(guest: any) {
    this.newGuest = guest
    this.show_update_guest = true
  }

}
