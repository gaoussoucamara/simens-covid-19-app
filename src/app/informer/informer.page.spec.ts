import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformerPage } from './informer.page';

describe('InformerPage', () => {
  let component: InformerPage;
  let fixture: ComponentFixture<InformerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
