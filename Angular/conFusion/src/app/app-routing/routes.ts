import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

// THESE STRINGS ARE ADDED TO THE BASE URL AND
// CORRESPOND TO THE routerLink ATTRIBUTE IN THE 
// BUTTONS IN THE HTML /string (e.g.: routerLink="/home")
export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];





















// import { Routes } from '@angular/router';
// import { AppComponent } from '../app.component';
// import { MenuComponent } from '../menu/menu.component';
// import { DishdetailComponent } from '../dishdetail/dishdetail.component';
// // import { HeaderComponent } from './header/header.component';
// // import { FooterComponent } from './footer/footer.component';
// import { HomeComponent } from '../home/home.component';
// import { AboutComponent } from '../about/about.component';
// import { ContactComponent } from '../contact/contact.component';

// export const routes: Routes = [

//     { path: 'home', component: HomeComponent },
//     { path: 'menu', component: MenuComponent },
//     { path: '', redirectTo: '/home', pathMatch: 'full' }
// ];
