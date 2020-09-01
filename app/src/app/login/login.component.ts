import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private hc:HttpClient,private ls:LoginService,private route:Router) { }

  ngOnInit() {
    this.ls.logout();
  }
  onSubmit(userobj){
    var a;
    console.log(userobj)
  this.ls.loginuser(userobj).subscribe((res)=>{
    a=res;
    console.log(a.message)
    if (a.message=='1'){
      alert(["you are successfully logged in!"]);
      this.ls.isLoggedIn=true;
      console.log(res["token"])
      localStorage.setItem("token",res["token"])
      this.route.navigate(['logindashboard'])
      console.log("logeed in?",this.ls.isLoggedIn)
    }
    else if (a.message=='2')
    {
      alert(["Invalid password!"]);
    }
    else{
      alert(["Invalid email!"]);
      
    }
  })
  }
}
