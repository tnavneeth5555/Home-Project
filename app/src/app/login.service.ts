import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private hc:HttpClient) { 
    
  }
  isLoggedIn : boolean=false;
  loginuser(userobj):Observable<any>
  {
    console.log("working",this.isloggedIn())
    return this.hc.post("/home/login",userobj);
  }
  logout()
  {
    console.log("working",this.isloggedIn())
    localStorage.clear();
    this.isLoggedIn=false;
  }
  isloggedIn()
  {
    return !!localStorage.getItem("token");
  }
}
