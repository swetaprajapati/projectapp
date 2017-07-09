import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {resolveDep} from "@angular/core/src/view/provider";

/*
  Generated class for the DatafetchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatafetchProvider {
data:any;
  constructor(public http: Http) {
    console.log('Hello DatafetchProvider Provider');
  }

  load(){

    if(this.data){
      console.log("g");
      //return Promise.resolve(this.data);
      return new Promise(resolve => {


        this.http.get('https://vehic.herokuapp.com/welcome' )
          .map(res => res.json())
          .subscribe(data => {
            this.data=data;
            resolve(this.data);
            //console.log(data);
            console.log("reloded");
          },

            err => {

            console.log("Oops!");
            }
          );
      });
    }

    return new Promise(resolve =>  {
      this.http.get('https://vehic.herokuapp.com/welcome')
        .map(res => res.json())
        .subscribe(data => {
          this.data=data;
          resolve(this.data);
          //console.log(data);
          console.log("reloded");
          },

          err => {

            console.log("Oops!");
          }
        );
    });



  }

}
