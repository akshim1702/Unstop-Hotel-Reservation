import { Routes } from '@angular/router';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: ReservationComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }

];
