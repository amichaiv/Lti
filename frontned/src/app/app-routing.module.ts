import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PreferencesShellComponent } from "./components/preferences/preferences-shell/preferences-shell.component";
import { AppResolver } from "./app.resolver";
import { PreferencesGeneralComponent } from "./components/preferences/preferences-general/preferences-general.component";
import { PreferencesAddFileComponent } from "./components/preferences/preferences-add-file/preferences-add-file.component";
import { PreferencesResourcesComponent } from "./components/preferences/preferences-resources/preferences-resources.component";
import { DashboardShellComponent } from "./components/dashboard/dashboard-shell/dashboard-shell.component";
import { ClassroomShellComponent } from "./components/classroom/classroom-shell/classroom-shell.component";
const routes: Routes = [
  {
    path: "start",
    component: PreferencesShellComponent,
    resolve: { AppResolver }
  },
  { path: "", component: PreferencesShellComponent },
  { path: "Preferences", component: PreferencesShellComponent },
  { path: "Dashboard", component: DashboardShellComponent },
  { path: "Classroom", component: ClassroomShellComponent }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
