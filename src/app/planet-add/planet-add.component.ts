import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-planet-add',
  templateUrl: './planet-add.component.html',
  styleUrls: ['./planet-add.component.scss']
})
export class PlanetAddComponent implements OnInit {

  planetForm: FormGroup;
  name = '';
  description = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.planetForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addPlanet(this.planetForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          console.log(res.id)
          this.isLoadingResults = false;
          this.router.navigate(['/planet-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}

