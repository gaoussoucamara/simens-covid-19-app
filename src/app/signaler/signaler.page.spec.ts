import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignalerPage } from './signaler.page';

describe('SignalerPage', () => {
  let component: SignalerPage;
  let fixture: ComponentFixture<SignalerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignalerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
