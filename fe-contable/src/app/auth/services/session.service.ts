import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Business } from '../../features/business/models/business';
import { Session } from '../model/session';
import { User } from '../../models/user';

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
  }

  setSession(session: Session): void {
    localStorage.setItem('session', JSON.stringify(session));
    this.currentSessionSubj.next(session);
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
    return this.currentSessionSubj.value;
  }

  updateUser(user: any) {
    let storagedSession = this.getSession();
    let newSession = new Session(
      storagedSession.token,
      user,
      storagedSession.business
    );
    this.setSession(newSession);
  }

  updateBusiness(business: Business) {
    let storagedSession = this.getSession();
    let newSession = new Session(
      storagedSession.token,
      storagedSession.user,
      business
    );
    this.setSession(newSession);
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
