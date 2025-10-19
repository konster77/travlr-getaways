import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent,HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private auth:AuthService, private router:Router){}
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    const t=this.auth.getToken();
    if(t) req=req.clone({ setHeaders:{ Authorization:`Bearer ${t}` } });
    return next.handle(req).pipe(tap({ error:(e)=>{
      if(e instanceof HttpErrorResponse && e.status===401){
        this.auth.logout(); this.router.navigate(['/login']);
      }
    }}));
  }
}
