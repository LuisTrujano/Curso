import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import{ GLOBAL} from './services/global';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
 providers: [UserService]
})
export class AppComponent implements OnInit{
 public title = 'MUSIFY';
 public user: User;
 public user_register: User;
 public identity: any;
 public token: any;
 public errorMessage: any;
 public alertRegister:any;
 public url:string;

 constructor(
  private _route: ActivatedRoute,
	private _router: Router,
  private _userService:UserService
 ){
  this.user = new User('','','','','','ROLE_USER','');
  this.user_register = new User('','','','','','ROLE_USER','');
  this.url = GLOBAL.url; 
 }
ngOnInit(){
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();

console.log(this.identity);
console.log(this.token);
}


 public onSubmit(){
  console.log(this.user);
// Conseguir los datos del usuario identificado
this._userService.signup(this.user).subscribe(
  response => {
let identity = response.user;
this.identity = identity;

if (!this.identity._id) {
  alert("El usuario no esta correctamente identificado")
  
}else{
  //Crear elemento en el localstoraje para tener al usuario sesion
  localStorage.setItem('identity', JSON.stringify(this.identity));
  
  //conseguir el token para enviarselo a cada peticion http

               this._userService.signup(this.user, true).subscribe(
                  response => {
                let token = response.token;
                this.token = token;


                if (this.token && this.token.length <= 0) {
                  alert("El token no se ha generado correctamente")
                  
                }else{
                  //Crear elemento en el localstoraje para tener el token disponble
                  localStorage.setItem('token', this.token);
                  this.user = new User('','','','','','ROLE_USER','');
                }
                  },
                  error =>{
                    var errorMessage = <any>error;
                    
                    if (errorMessage != null) {
                      var body = (typeof error.error === 'string') ? JSON.parse(error.error) : error.error;
                      this.errorMessage = ` : ${body.message}`;
                    console.log(error);
                    }
                  }
                );
}
  },
  error =>{
    var errorMessage = <any>error;
    
    if (errorMessage != null) {
      var body = (typeof error.error === 'string') ? JSON.parse(error.error) : error.error;
      this.errorMessage = ` : ${body.message}`;
    console.log(error);
    }
  }
);
}
logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
}


onSubmitRegister(){
  console.log(this.user_register);

  this._userService.register(this.user_register).subscribe(
    response => {
    let user = response.user;
    this.user_register = user;
if (!user._id) {
  this.alertRegister = 'Error al registrarse';
}else{
  this.alertRegister = 'El registro se ha actualizado correctamente, identificado'+this.user_register.email;
  this.user_register = new User('','','','','','ROLE_USER','');
}

    },
    error =>{
      var errorMessage = <any>error;
      
      if (errorMessage != null) {
        var body = (typeof error.error === 'string') ? JSON.parse(error.error) : error.error;
        this.alertRegister = ` : ${body.message}`;
      console.log(error);
      }
    }
  );
}

}
