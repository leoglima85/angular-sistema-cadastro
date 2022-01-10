import { Component } from '@angular/core';
import { FireauthservService } from 'src/app/services/fireauthserv.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  {

  usuario : any;

  constructor(private fas: FireauthservService){ 
    this.usuario =  fas.getUser();
    //console.log('profile usuario', this.usuario)
  }



}
