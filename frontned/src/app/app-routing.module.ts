import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PreferencesShellComponent } from "./components/preferences/preferences-shell/preferences-shell.component";
import { DashboardShellComponent } from "./components/dashboard/dashboard-shell/dashboard-shell.component";
import { ClassroomShellComponent } from "./components/classroom/classroom-shell/classroom-shell.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppGuard } from "./app.guard";
import { AppBodyComponent } from "./components/app-body/app-body.component";
const routes: Routes = [
  { path: "en", component: AppBodyComponent, canActivate: [AppGuard] },
  { path: "", component: AppBodyComponent },
  { path: "Preferences", component: PreferencesShellComponent },
  { path: "Dashboard", component: DashboardShellComponent },
  { path: "Classroom", component: ClassroomShellComponent },
  { path: "**", component: PageNotFoundComponent }
];
@NgModule({
  declarations: [],
  ///remove enable tracing

  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
