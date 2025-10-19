import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth.service';

@Component({
  selector:'app-login', standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl:'./login.html', styleUrls:['./login.css']
})
export class LoginComponent{
  email = '';
  password = '';
  loading = false;
  error = '';
  showPassword = false; 
  constructor(private auth:AuthService, private router:Router){}
  onSubmit(){
    this.loading=true; this.error='';
    this.auth.login(this.email,this.password).subscribe({
      next:r=>{ this.auth.saveToken(r.token); this.loading=false; this.router.navigate(['/admin']); },
      error:e=>{ this.loading=false; this.error=e?.error?.message || 'Login failed'; }
    });
  }
}
