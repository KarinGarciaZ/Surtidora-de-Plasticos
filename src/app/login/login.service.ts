import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LoginService {
  username: string = 'Entrar';
  user: Observable<firebase.User>;

  constructor( 
    private afAuth: AngularFireAuth, 
    public router: Router,
    private route: ActivatedRoute 
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

  checkUser(){
    this.afAuth.authState.subscribe( resp => {
      if (resp.displayName)
        this.username = resp.displayName;
      else
        this.username = resp.email;
    });
  }   
  

  login(mail, pass){         
      this.afAuth.auth.signInWithEmailAndPassword(mail, pass).then(resolved => { 
        this.checkUser();
      }).catch(function (e : Error) {
        if ( e.message === 'There is no user record corresponding to this identifier. The user may have been deleted.')
          alert("Ususrio no existe.")
        else
          alert(e.message);
      });    
  }

  createUserMail(kind, mail?, pass?){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    if ( kind === 'Google') this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    
    if ( kind === 'Mail')  
      this.afAuth.auth.createUserWithEmailAndPassword(mail, pass).then(resolved => { 
          if( resolved ) {
            this.checkUser();
          }
        }).catch(function (e : Error) {
          if ( e.message === 'The email address is already in use by another account.')
            alert("Ususrio ya existe.")
          else
            alert(e.message);
        });
  }

  logout(){
    this.afAuth.auth.signOut();
    this.username = 'Entrar';
  }

  toggleAccount(ban){
    return !ban;
  }
}
