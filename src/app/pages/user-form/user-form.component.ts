import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../services/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userService = inject(Users);
  route = inject(ActivatedRoute);
  router = inject(Router);

  userForm: FormGroup;

  isEdit: boolean = false
  userId: string | null = null;

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3) 
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3) 
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      image: new FormControl('', [
        Validators.required
      ]),
    });
  }

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.isEdit = true
      this.userId = id;

      const response = await this.userService.getById(id);

      this.userForm.patchValue(response);
    }
  }

  async onSubmit() {
    if (this.userForm.invalid) return;

    try {
      if (this.isEdit && this.userId){
        await this.userService.updateUser(this.userId, this.userForm.value)
        alert ("Usuario actualizado!")
      }else{
        await this.userService.createUser(this.userForm.value)
        alert("Usario creado")
      }
      this.router.navigate(['/home'])
    } catch (error) {
      console.error(error);
    }
  }

  checkControl(controlName:string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }

}
