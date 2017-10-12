import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeMdpComponent } from './demande-mdp.component';

describe('DemandeMdpComponent', () => {
  let component: DemandeMdpComponent;
  let fixture: ComponentFixture<DemandeMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
