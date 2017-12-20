import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TestPageOne } from './test-page-one';

@NgModule({
    declarations: [
        TestPageOne
    ],
    imports: [
        IonicPageModule.forChild(TestPageOne)
    ],
    exports: [
        TestPageOne
    ]
})
export class TestPageOneModule {}