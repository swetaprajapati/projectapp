import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SecondPage} from "../second/second";
import {DatafetchProvider} from "../../providers/datafetch/datafetch";
import {Http, RequestOptions,Headers} from "@angular/http";
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  username: string;
  password: string;
  addcomment: string;
  student_name: string;
  student_batch: string;
  student_year: string;

  aeroplane: any = [{"type": "indigo", "number": "1"},
    {"type": "GoAir", "number": "2"},
    {"type": "kingfisher", "number": "3"},
    {"type": "spicejet", "number": "4"},
    {"type": "Qatar airways", "number": "5"},
    {"type": "Air India", "number": "6"}];

  comment: any = ["INDIGO", "KINGFISHER", "SPICEJET"];
  student_r: any;
  study: any;
  students: any;
  update: any;
  latitude:any;
  longitude:any;
  geoUpdate:any;


  constructor(public navCtrl: NavController, public datafetch: DatafetchProvider, public http: Http,private geolocation: Geolocation) {
    this.getdata();
    this.geolocate();

  }

  getdata() {
    this.datafetch.load().then((data) => {
      this.student_r = data;
      this.study = this.student_r.students;
      console.log("data_load");
      console.log(this.student_r.students);
    })
  }

  gotosecondpage() {
    this.navCtrl.setRoot(SecondPage);
  }

  addcomments() {
    this.comment.push(this.addcomment);
    this.addcomment = "";

  }


  login() {
    if (this.username == "sweta" && this.password == "123456") {
      this.navCtrl.push(SecondPage, {"user": this.username});
    }

  }


  delete(no) {
    (this.comment).splice(no, 1);
  }

  addstudent() {
    this.student_r.push({"name": this.student_name, "batch": this.student_batch, "year": this.student_year})
    this.student_name = "";
    this.student_batch = "";
    this.student_year = "";
  }


//code for posting data on the ionic app from there only

  setdata() {

    this.update = {
      name: this.username,
      password: this.password,
    }

    console.log("data sending");
    var headers = new Headers();

    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers:headers});

    this.http.post('https://vehic.herokuapp.com/welcomeppl', JSON.stringify(this.update), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
    } ,err => {
        console.log("Error!:");
      });
  }

  geolocate() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    //let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // this.lat= data.coords.latitude;
    //this.long=data.coords.longitude;
    //});

    this.geoUpdate = {
      latitude: this.latitude,
      longitude: this.longitude,
    }


    var headers = new Headers();

    headers.append('content-type', 'application/json;charset=UTF-8');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({headers: headers});

    this.http.post('https://vehic.herokuapp.com/geolocation', JSON.stringify(this.geoUpdate), options)
      .map(res => res.json()).subscribe(data => {
      console.log(data)
    }, err => {
      console.log("Error!:");
    }
    );
  }
}
