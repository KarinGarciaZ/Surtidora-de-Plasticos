import { UserService } from './../services/user.service';

import { AppUser } from './../models/app-user';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class LoginService {
  username: string = 'Entrar';
  user: Observable<firebase.User>;
  count: number = 0;
  createAccount: boolean = false;
 
  constructor( 
    private afAuth: AngularFireAuth, 
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {  
    this.user = afAuth.authState;
    afAuth.authState.subscribe( resp => {
      if (resp)
        if (resp.displayName)
          this.username = resp.displayName;
        else
          this.username = resp.email;
      else
        this.username = 'Entrar';
    });  
  }  

  checkUser(name?) {
    this.count += 1;    
    this.afAuth.authState.subscribe( resp => {
      if ( name ) resp.updateProfile({ displayName: name, photoURL: '' }).then( () => this.checkUser());
      this.username = ( resp.displayName )? resp.displayName : resp.email; 
    });
    if ( this.count == 2 ){
      window.location.reload(true);
      this.count = 0;
    }      
  }   
  

  login(mail, pass){   
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
          
      this.afAuth.auth.signInWithEmailAndPassword(mail, pass).then(resolved => { 
        this.checkUser();
      }).catch(function (e : Error) {
        if ( e.message === 'There is no user record corresponding to this identifier. The user may have been deleted.')
          alert("Ususrio no existe.")
        else
          alert(e.message);
      });    
  }

  createUserMail(kind, mail?, pass?, name?){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    if ( kind === 'Google') this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    if ( kind === 'Mail')  
      this.afAuth.auth.createUserWithEmailAndPassword(mail, pass).then(resolved => { 
          if( resolved ) {
            this.checkUser(name);
            //this.user = this.afAuth.authState;
          }
        }).catch(function (e : Error) {
          if ( e.message === 'The email address is already in use by another account.')
            alert("Ususrio ya existe.")
          else
            alert(e.message);
        });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.username = 'Entrar';
    localStorage.removeItem('cartId');
  }

  get appUser() : Observable<AppUser> {
    return this.user
    .switchMap(user => {
      return (user)? this.userService.get(user.uid): Observable.of(null)})
  }
}
