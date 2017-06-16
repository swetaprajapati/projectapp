import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SecondPage} from "../second/second";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  username:string;
  password:string;
  addcomment:string;
  student_name:string;
  student_batch:string;
  student_year:string;

  aeroplane:any=[{"type":"indigo", "number":"1"},
    {"type":"GoAir","number":"2"},
    {"type":"kingfisher", "number":"3"},
    {"type":"spicejet" , "number":"4"},
    {"type":"Qatar airways", "number":"5"},
    {"type":"Air India" , "number":"6"}];

  comment:any=["INDIGO", "KINGFISHER", "SPICEJET" ];
  students:any=[{"name":"xyz","batch":"2013","year":"second"},
    {"name":"abc","batch":"2014","year":"third"},
    {"name":"def","batch":"2015","year":"final"}];

  constructor(public navCtrl: NavController) {

  }

  gotosecondpage()
  {
    this.navCtrl.setRoot(SecondPage);
  }

  addcomments(){
    this.comment.push(this.addcomment);
    this.addcomment="";

  }



  login(){
    if(this.username=="sweta"  && this.password=="123456"){
      this.navCtrl.push(SecondPage,{"user":this.username});
    }

  }




delete(no)
{
  (this.comment).splice(no,1);
}
  addstudent()
  {
    this.students.push({"name":this.student_name,"batch":this.student_batch,"year":this.student_year})
    this.student_name="";
    this.student_batch="";
    this.student_year="";
  }
}
