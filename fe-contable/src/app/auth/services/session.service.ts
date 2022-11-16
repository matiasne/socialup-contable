import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Business } from '../../features/business/models/business';
import { Session } from '../model/session';
import { User } from '../../models/user';
import { Box } from 'src/app/features/boxes/models/box';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private currentSessionSubj = new BehaviorSubject<Session>(new Session(''));

  constructor(private router: Router) {
    this.loadSession();
  }

  loadSession(): void {
    let session = localStorage.getItem('session')
      ? JSON.parse(localStorage.getItem('session'))
      : undefined;
    this.currentSessionSubj.next(session);
    console.log("loadSession")
  }

  setSession(session: Session): void {
    localStorage.setItem('session', JSON.stringify(session));
    this.currentSessionSubj.next(session);
    console.log("setSession")
  }

  removeSession() {
    localStorage.removeItem('session');
    this.currentSessionSubj.next(new Session(''));
  }

  observeSession(): Observable<Session> {
    return this.currentSessionSubj.asObservable();
  }

  getToken(): string {
    return this.currentSessionSubj.value?.token;
  }

  getUserData(): User {
    return this.currentSessionSubj.value?.user;
  }

  getSession(): Session {
    console.log (this.currentSessionSubj)
    return this.currentSessionSubj.value;
  }

  updateUser(user: any) {
    let storagedSession = this.getSession();
    let newSession = new Session(
      storagedSession.token,
      user,
      storagedSession.business,
      storagedSession.box
    );
    this.setSession(newSession);
  }

  updateBusiness(business: Business) {
    let storagedSession = this.getSession();
    let newSession = new Session(
      storagedSession.token,
      storagedSession.user,
      business,
      storagedSession.box
    );
    this.setSession(newSession);
  }

  updateBox(box: Box) {
    let storagedSession = this.getSession();
    let newSession = new Session(
      storagedSession.token,
      storagedSession.user,
      storagedSession.business,
      box
    );
    this.setSession(newSession);
    console.log ("updateBox")
  }

  getBox() {
    console.log("getBox")
    return this.currentSessionSubj.value?.box;
  }

  getBusiness() {
    return this.currentSessionSubj.value?.business;
  }

  isAuthenticated(): boolean {
    return (
      this.currentSessionSubj.value &&
      this.currentSessionSubj.value.token !== ''
    );
  }
}
