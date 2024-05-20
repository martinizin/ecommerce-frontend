import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../servicios/registro.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario:FormGroup;
  registroService=inject(RegistroService);
  constructor(){
    this.formulario=new FormGroup({
      username:new FormControl(),
      password:new FormControl()
    })
  }
  async onSubmit(){
    const response=await this.registroService.login(this.formulario.value);
    console.log(response);

  }
}
