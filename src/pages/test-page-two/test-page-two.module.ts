import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TestPageTwo } from './test-page-two';

@NgModule({
    declarations: [
        TestPageTwo
    ],
    imports: [
        IonicPageModule.forChild(TestPageTwo)
    ],
    exports: [
        TestPageTwo
    ]
})
export class TestPageTwoModule {}