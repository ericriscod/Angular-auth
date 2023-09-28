import { AuthService } from './../../../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public formAuth: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public msgError: string | undefined;

  public submitForm(): void {
    if (this.formAuth.valid) {
      this.authService
        .sign({
          email: this.formAuth.value.email,
          password: this.formAuth.value.password,
        })
        .subscribe({
          next: (res) => {
            this.msgError = undefined;
            return res;
          },
          error: (error) => (this.msgError = error),
        });
    }
  }
}
