import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patterns} from '../../shared/helpers/patterns.helper';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  alert = false;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(patterns.email)
      ])],
      password: ['', Validators.required]
    });
  }

  showAlert(): void {
    this.alert = true;
    setTimeout(() => this.alert = false, 3000);
  }

  onLoginClick(): void {
    const user = this.loginForm.getRawValue();
    if (this.authService.login(user)) {
      this.router.navigate(['/home']);
    } else {
      this.showAlert();
    }
  }
}
