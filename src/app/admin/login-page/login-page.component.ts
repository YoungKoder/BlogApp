import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(( params: Params) => {
      if ( params['loginAgain']) {
        this.message = 'Пожалуйста авторизуйтесь';
      }else if(params['authFailed']) {
        this.message = 'Введите данные заного';
      }
    })
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password:  new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {

    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard']);
      this.submitted = false;
    }, () =>  {
      this.submitted = false;
    });
  }
}