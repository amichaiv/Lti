import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-preferences-add-file",
  templateUrl: "./preferences-add-file.component.html",
  styleUrls: ["./preferences-add-file.component.css"]
})
export class PreferencesAddFileComponent implements OnInit {
  formGroup: FormGroup;
  value = 'Clear me';
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      description: new FormControl(""),
      link: new FormControl("")
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
