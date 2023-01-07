import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UniqueIdService } from './shared/services/unique-id/unique-id.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a11y-p1';
  //public yesNoAnswer: string = 'no';
  public form: FormGroup;
  public id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private uniqueIdService: UniqueIdService,
  ){
    this.form = this.formBuilder.group({
      yesNoAnswer: [{
        value: null,
        disabled: false
      }],
    });
    this.id = this.uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  public submit(event: any): void {
    this.form.get('yesNoAnswer').disable();
    console.log(event);
    console.log(this.form.value);
  }

  returnYesNoButtonValue(value: string): string {
    if(value === null) {
      return 'not selected';
    } else {
      return value;
    }
  }
}
