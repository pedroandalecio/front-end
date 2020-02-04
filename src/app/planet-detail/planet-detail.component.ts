import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Planet } from '../planet';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {

  planet: Planet = { id: 0, name: '', description: '', status: false, dateRegister: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getPlanetDetails(this.route.snapshot.params['id']);
  }

  getPlanetDetails(id: any) {
    this.api.getPlanet(id)
      .subscribe((data: any) => {
        this.planet = data;
        console.log(this.planet);
        this.isLoadingResults = false;
      });
  }

  deletePlanet(id: any) {
    this.isLoadingResults = true;
    this.api.deletePlanet(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/planets']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
