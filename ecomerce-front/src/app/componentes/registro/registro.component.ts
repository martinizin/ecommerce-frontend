import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelectionList } from '@angular/material/list';

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatCardModule,MatFormFieldModule,MatOption,MatSelectionList,NgIf],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  Roles: any =["ADMIN","CLIENTE","EMPRENDEDOR"]
email: any;
password: any;
registroForm: any;
constructor(){}
ngOnInit():void{

}

}
