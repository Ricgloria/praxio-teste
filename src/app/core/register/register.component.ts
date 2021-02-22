import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {patterns} from '../../shared/helpers/patterns.helper';
import {mask} from '../../shared/helpers/mask.helper';
import {take} from 'rxjs/operators';
import {AddressService} from '../services/address.service';
import {ViaCepAddress} from '../../shared/models/via-cep-address';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  mask = mask;
  show = false;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern(patterns.email)
      ])],
      password: ['', Validators.required],
      address: this.formBuilder.group({
        zipcode: ['', Validators.required],
        street: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required]
      })
    });
  }

  getPhoneMask(): string {
    return (this.registerForm.get('phone')?.value as string).length > 10 ? mask.cellphone : mask.phone;
  }

  checkZipAndRequest(event: string): void {
    if (this.registerForm?.get('address')?.get('zipcode')?.valid) {
      this.addressService.getAddressByZipcode(event).pipe(take(1)).subscribe(
        response => {
          if (response.erro) {
            this.setZipcodeError();
          } else {
            this.zipcodeAutoComplete(response);
          }
        }
      );
    }
  }

  setZipcodeError(): void {
    this.registerForm?.get('address')?.get('zipcode')?.setErrors({incorrect: true});
  }

  zipcodeAutoComplete(response: ViaCepAddress): void {
    this.registerForm?.get('address')?.patchValue({
      neighborhood: response.bairro,
      street: response.logradouro,
    });
    this.registerForm?.get('address')?.get('zipcode')?.setErrors(null);
  }

  onRegisterClick(): void {
    this.authService.registerUserLocalStorage(this.registerForm.getRawValue());
    this.registerForm.disable();
    this.show = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);
  }
}
