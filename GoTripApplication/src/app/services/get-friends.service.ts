import { Injectable } from '@angular/core';
import * as Parse from 'parse';

import { getTripDetails } from  './getTripDetails.service';
import { currentUser } from './getCurrentUserData.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFriendsService {

  

  constructor(private getTripDetails: getTripDetails, private currentUser: currentUser) { }

  async getFrieds(){
    let listFriends:{}[] = [];


    let TripPlan = Parse.Object.extend('TripsPlan');
    let tripPlan = new TripPlan();
    let id = this.getTripDetails.currentTrip.id; // set up the trip id to the id of current trip
    let queryTrip = new Parse.Query(TripPlan);

    //Find date ID
    queryTrip.equalTo("objectId", id )

    let tripList = await queryTrip.find();

    if(!tripList[0]){
      console.log('No trip row found');
      return
    }

    // Check if user have voted before in one of the three options
    await tripList[0].relation(`listUsersPending2`).query().each(friend=>{
      listFriends.push({
        name: friend.get('username') ,
        photo: friend.get('photo') ? friend.get('photo').url() : null ,
        status: 'pending',
      })
      console.log(listFriends)
    });

    //Find frinds with pending invitation

    //Find frinds with accepted invitation

    //Find friends who does not have account


    return listFriends
  }
}
