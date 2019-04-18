import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppState } from "./store/state/app.state";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { PreferencesShellComponent } from "./components/preferences/preferences-shell/preferences-shell.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material";
import { DashboardShellComponent } from "./components/dashboard/dashboard-shell/dashboard-shell.component";
import { ClassroomShellComponent } from "./components/classroom/classroom-shell/classroom-shell.component";
import { PreferencesGeneralComponent } from "./components/preferences/preferences-general/preferences-general.component";
import { AccordionModule } from "primeng/accordion";
import { RouterModule, ActivatedRouteSnapshot } from "@angular/router";
import { PreferencesAddFileComponent } from "./components/preferences/preferences-add-file/preferences-add-file.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { InputTextModule } from "primeng/inputtext";
import { PreferencesResourcesComponent } from "./components/preferences/preferences-resources/preferences-resources.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { PublishDialogComponent } from "./components/publish-dialog/publish-dialog.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AppBodyComponent } from "./components/app-body/app-body.component";
import { ClassroomStatsComponent } from "./components/classroom/classroom-stats/classroom-stats.component";
import { ClassroomToolsComponent } from './components/classroom/classroom-tools/classroom-tools.component';
import { ClassroomStudentsComponent } from './components/classroom/classroom-students/classroom-students.component';
import { SubmissionShellComponent } from './components/submission/submission-shell/submission-shell.component';
import { MatSelectModule } from '@angular/material/select';
import { TranslateService } from './services/translate.service';
import { TranslatePipe } from './pipes/translate.pipe';
import { DropdownModule } from 'primeng/dropdown';
import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from "@angular/material";
@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    PreferencesShellComponent,
    DashboardShellComponent,
    ClassroomShellComponent,
    PreferencesGeneralComponent,
    PreferencesAddFileComponent,
    PreferencesResourcesComponent,
    PublishDialogComponent,
    PageNotFoundComponent,
    AppBodyComponent,
    ClassroomStatsComponent,
    ClassroomToolsComponent,
    ClassroomStudentsComponent,
    SubmissionShellComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSelectModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    DropdownModule,
    MatInputModule,
    MatPaginatorModule,
    MatStepperModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule,
    AccordionModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [TranslateService],
  entryComponents: [PublishDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
