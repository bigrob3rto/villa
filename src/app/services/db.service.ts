import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { NotificationsService } from 'angular2-notifications';

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://esmsbiqlsjiiiecvmbru.supabase.co/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzbXNiaXFsc2ppaWllY3ZtYnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MDkxNzAsImV4cCI6MjA0MjE4NTE3MH0.RGxg1d76vXaojTBzNdGDIZRjAKTLcOEJmYExPUhjlGw'
const supabase = createClient(supabaseUrl, supabaseKey)

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private msg: NotificationsService) { }

  /***********************************************************
   * Get all rows
   */
  async getAll() {
    const { data, error } = await supabase
      .from('reservation')
      .select()
      .order('res_num', { ascending: false })

    // show error
    if (error) this.msg.error("Error", error.details)

    return data
  }

  /***********************************************************
 * Get rows with reservation number
 */
  async getRows(res_num: number) {
    const { data, error } = await supabase
      .from('reservation')
      .select()
      .eq('res_num', res_num)
      .order('res_num', { ascending: false })

    // show error
    if (error) this.msg.error("Error", error.details)

    return data
  }

  /***********************************************************
   * new row
   */
  async insertRow(row: any) {
    const { error } = await supabase
      .from('reservation')
      .insert({
        //id: row.id,
        res_num: row.res_num,
        cognome: row.cognome,
        nome: row.nome,
        data_nascita: row.data_nascita,
        luogo_nascita: row.luogo_nascita,
        residenza: row.residenza,
        cittadinanza: row.cittadinanza
      })
    // show error
    if (error) this.msg.error("Error", error.details)
  }


  /***********************************************************
  * update row
  */
  async updateRow(row: any) {
    const { error } = await supabase
      .from('reservation')
      .update({
        id: row.id,
        res_num: row.res_num,
        cognome: row.cognome,
        nome: row.nome,
        data_nascita: row.data_nascita,
        luogo_nascita: row.luogo_nascita,
        residenza: row.residenza,
        cittadinanza: row.cittadinanza,
        doc_type: row.doc_type,
        doc_num: row.doc_num
      })
      .eq('id', row.id)

    // show error
    if (error) this.msg.error("Error", error.details)
  }

  /***********************************************************
  * Delete single row
  */
  async deleteRow(id: number) {
    const response = await supabase
      .from('reservation')
      .delete()
      .eq('id', id)

    return response
  }

  /***********************************************************
  * Login with email & password
  */
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    // show error
    if (error) this.msg.error("Error", error.message)

    return data.user
  }

  /***********************************************************
  * Logout
  */
  async logout() {
    const { error } = await supabase.auth.signOut()

    // show error
    if (error) this.msg.error("Error", error.message)

  }





}
