import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RegistPage} from './regist.page';

describe('RegistPage', () => {
    let component: RegistPage;
    let fixture: ComponentFixture<RegistPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(RegistPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
