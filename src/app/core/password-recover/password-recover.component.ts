import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patterns} from '../../shared/helpers/patterns.helper';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.scss']
})
export class PasswordRecoverComponent implements OnInit {

  recoverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.recoverForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(patterns.email)
      ])]
    });
  }

  onSendClick(): void {
    const email = this.recoverForm.getRawValue();
    console.log(email);
  }
}
