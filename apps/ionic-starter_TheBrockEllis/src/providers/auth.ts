import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class Auth {
  public loggedIn: Boolean = false;
  public data: any;

  constructor(
    public http: Http,
    public storage: Storage,
    public events: Events
  ) {
    //set the current status of the user to loggedIn when it happens
    this.events.subscribe("user:loggedin", data => {
      this.storage.set("loggedIn", true).then(res => {
        //console.log("I am already logged in");
        this.loggedIn = true;
      });
    });

    // we want to clear out data when the user wants to log out, so listen
    // for the event to take place
    this.events.subscribe("user:loggedout", () => {
      this.logout();
    });

    this.loginStatus();
  }

  loginStatus() {
    this.storage.get("loggedIn").then(res => {
      if (res == true) {
        //the user is logged in and we need to trigger the login events
        let userData = this.storage.get("userData");
        userData.then(data => {
          this.events.publish("user:loggedin", data);
        });
      }
    });
  }

  login(username, password) {
    let url;
    if (document.URL.includes("https://") || document.URL.includes("http://")) {
      url = "http://mbb.lvh.me:3001/token.json";
    } else {
      url = "ADDURLHERESOMEDAY";
    }

    var headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json");

    console.log("Using un and pw combo:", username, password);

    return new Promise((resolve, reject) => {
      this.http
        .get(url, { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {
            console.log("got to the subscribe part: ", data);
            this.data = data;
            resolve(this.data);
          },
          error => {
            console.log("got to the rejected part =(");
            reject(error);
          }
        );
    });
  }

  logout() {
    // We can't just clear out the storage since we want to keep the users
    // notes on the device, even when they've logged out
    this.storage.set("userData", "");
    this.storage.set("loggedIn", false);

    //this.storage.clear();
    this.loggedIn = false;
  }

  register(data) {
    let url = "URL-TO-REGISTRATION";

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return (
      this.http
        .post(url, data, { headers: headers })
        //.map(res => res.json()).toPromise();
        .map((res: Response) => {
          if (res) {
            if (res.status === 201 || res.status == 200) {
              return [{ status: res.status, json: res }];
            }
          }
        })
        .toPromise()
    );
  }

  resetPassword(data) {
    let url = "URL-TO-PASSWORD-RESET";

    var headers = new Headers();
    headers.append("Content-Type", "application/json");

    return (
      this.http
        .post(url, data, { headers: headers })
        //.map(res => res.json()).toPromise();
        .map((res: Response) => {
          if (res) {
            if (res.status === 201 || res.status == 200) {
              return [{ status: res.status, json: res }];
            }
          }
        })
        .toPromise()
    );
  }
}
