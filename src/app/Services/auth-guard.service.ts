import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './firebaseAuth/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private oAuth: FirebaseAuthService, private router: Router) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.oAuth.fireBaseAuthStatus()
           .pipe(
             map(user => user !== null),
             tap(loggedIn => {
               if (loggedIn === false) {
                  this.router.navigate(['/login']);
               }
             })
           );
  }
}
