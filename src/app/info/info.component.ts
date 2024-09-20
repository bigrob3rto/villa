import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  images = [0,1,2].map((n) => `img/${n}/img.jpg`);


}
