import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
type LoginResponse={token:string};
@Injectable({providedIn:'root'})
export class AuthService{
  private readonly TOKEN_KEY='travlr_token';
  private readonly API='/api/auth'; // or 'http://localhost:3000/api/auth' to bypass proxy
  constructor(private http:HttpClient){}
  login(email:string,password:string){ return this.http.post<LoginResponse>(`${this.API}/login`,{email,password}); }
  saveToken(t:string){ localStorage.setItem(this.TOKEN_KEY,t); }
  getToken(){ return localStorage.getItem(this.TOKEN_KEY); }
  isLoggedIn(){ return !!this.getToken(); }
  logout(){ localStorage.removeItem(this.TOKEN_KEY); }
}
