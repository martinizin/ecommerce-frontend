import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelectionList } from '@angular/material/list';
import { FormControl,FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegistroService } from '../../servicios/registro.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatCardModule,MatFormFieldModule,MatOption,MatSelectionList,NgIf,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  formulario: FormGroup;
  registroService= inject(RegistroService); 
  router: any;
  constructor(){
    this.formulario=new FormGroup({
      username: new FormControl(),
      email:new FormControl(),
      password: new FormControl(),
      rol:  new FormControl(['CLIENTE'])
    })
  }
  async onSubmit() {
    if (this.formulario.valid) {
      try {
        const response = await this.registroService.login(this.formulario.value);
        console.log('Inicio de sesión exitoso:', response);
        // Lógica adicional para manejar la respuesta (redireccionar, mostrar mensaje, etc.)
        this.router.navigate(['/home']); // Assuming you have a 'home' route
      } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        // Maneja el error adecuadamente (muestra un mensaje de error, etc.)
      }
    } else {
      this.formulario.markAllAsTouched();
    }
  }




}
