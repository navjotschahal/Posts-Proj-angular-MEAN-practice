import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { WarningComponent } from '../components/warning/warning.component';
import { ComponentType } from '@angular/cdk/portal';
import { PRIMITIVE_VALUE } from 'src/assets/constants/common-constants';

export class CommonDialogUtil {

    constructor() {}

    public static confirmDialog(
        msg: string,
        matDialog: MatDialog,
        component: ComponentType< ConfirmationComponent | WarningComponent >,
        disableClose: boolean = PRIMITIVE_VALUE.true,
        buttonName: string = 'ok',
        perform: () => void = () => {}
        ) {
        const initialState = {
            disableClose ,
            data: {
            message: msg,
            buttonName
            }
        };
        const performFn: () => void = perform;
        const confirmDialogRef = matDialog.open(component, initialState);
        confirmDialogRef.afterClosed().subscribe((confirm: boolean) => {
            console.log(confirm);
            if (confirm) {
                performFn();
            }
        });
    }
}
