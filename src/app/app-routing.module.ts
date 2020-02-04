import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { PlanetAddComponent } from './planet-add/planet-add.component';
import { PlanetEditComponent } from './planet-edit/planet-edit.component';

const routes: Routes = [
  {
    path: 'planets',
    component: PlanetsComponent,
    data: { title: 'List of Planets' }
  },
  {
    path: 'planet-details/:id',
    component: PlanetDetailComponent,
    data: { title: 'Planet Details' }
  },
  {
    path: 'planet-add',
    component: PlanetAddComponent,
    data: { title: 'Add Planet' }
  },
  {
    path: 'planet-edit/:id',
    component: PlanetEditComponent,
    data: { title: 'Edit Planet' }
  },
  { path: '',
    redirectTo: '/planets',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
