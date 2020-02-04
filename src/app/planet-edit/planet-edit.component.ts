import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-planet-edit',
  templateUrl: './planet-edit.component.html',
  styleUrls: ['./planet-edit.component.scss']
})
export class PlanetEditComponent implements OnInit {

  planetForm: FormGroup;
  id = null;
  name = '';
  description = '';
  status: boolean;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPlanet(this.route.snapshot.params['id']);
    this.planetForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'status' : [null, Validators.required]
    });
  }

  getPlanet(id: any) {
    this.api.getPlanet(id).subscribe((data: any) => {
      this.id = data.id;
      this.planetForm.setValue({
        name: data.name,
        description: data.description,
        status: data.status
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePlanet(this.id, this.planetForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/planet-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  planetDetails() {
    this.router.navigate(['/planet-details', this.id]);
  }

}
