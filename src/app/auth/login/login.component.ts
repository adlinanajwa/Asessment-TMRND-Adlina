import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] ,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 login(): void {
  this.authService.login(this.username, this.password).subscribe((res: any) => {
    if (res.success) {
      this.authService.storeToken(res.token);
      
      // Store username in localStorage for later retrieval
      localStorage.setItem('username', this.username);

      this.router.navigate(['/home']);
    } else {
      alert('Login failed');
    }
  }, error => {
    alert('Login failed: Invalid credentials or server error');
  });
}

}
