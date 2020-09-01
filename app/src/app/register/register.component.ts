import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private hc:HttpClient,private route:Router) { }
  
  ngOnInit() {
  }
  onSubmit(user)
  {
    var a;
    var name;
    console.log("yes");
    this.hc.post("/home/signup",user).subscribe((res)=>{
      a=res;
      console.log(a.message,a.n);
      var name =a.n;
      if (a.message=='0'){
        alert(["email already exists"])
      }
      else{
        alert(["succesfully registered"])
        console.log(a.n)
        this.route.navigate(['login']);
      }
    })
  }
}
