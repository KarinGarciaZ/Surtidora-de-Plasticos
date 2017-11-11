import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as database from 'firebase';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save( user: firebase.User ) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): FirebaseObjectObservable<AppUser>  {
    console.log('jeje', this.db.object('/users/' + uid));
    return this.db.object('/users/' + uid);
  }
}
