import { Component, Inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner-service/spinner.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})

/**
 * Spinner component will load a spinner when any server side call is made.
 */
export class SpinnerComponent {

  /**
   * active of spinner component.
   */
  public active: boolean;

  /**
   * @param  {SpinnerService} privatespinner
   */
  constructor(
    public dialogRef: MatDialogRef<SpinnerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}
