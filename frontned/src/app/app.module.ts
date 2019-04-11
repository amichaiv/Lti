import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { TranslateService } from "./services/translate.service";
import { AppComponent } from "./app.component";
import { AppHeaderComponent } from "./components/app-header/app-header.component";
import { TranslatePipe } from "./pipes/translate.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { AppState } from "./store/state/app.state";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { PreferencesShellComponent } from "./components/preferences/preferences-shell/preferences-shell.component";
import { AppResolver } from "./app.resolver";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material";
import { DashboardShellComponent } from "./components/dashboard/dashboard-shell/dashboard-shell.component";
import { ClassroomShellComponent } from "./components/classroom/classroom-shell/classroom-shell.component";
import { PreferencesGeneralComponent } from "./components/preferences/preferences-general/preferences-general.component";
import { AccordionModule } from "primeng/accordion";
import { RouterModule } from "@angular/router";
import { PreferencesAddFileComponent } from "./components/preferences/preferences-add-file/preferences-add-file.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { InputTextModule } from "primeng/inputtext";
import { PreferencesResourcesComponent } from "./components/preferences/preferences-resources/preferences-resources.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { PublishDialogComponent } from "./components/publish-dialog/publish-dialog.component";
import { MatTableModule } from "@angular/material/table";
import { MatStepperModule } from "@angular/material/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material";

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use("en");
}

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    TranslatePipe,
    PreferencesShellComponent,
    DashboardShellComponent,
    ClassroomShellComponent,
    PreferencesGeneralComponent,
    PreferencesAddFileComponent,
    PreferencesResourcesComponent,
    PublishDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    FormsModule,
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
  providers: [
    AppResolver,
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  entryComponents: [PublishDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
