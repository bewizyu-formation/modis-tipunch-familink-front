import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMdpComponent } from './update-mdp.component';

describe('UpdateMdpComponent', () => {
  let component: UpdateMdpComponent;
  let fixture: ComponentFixture<UpdateMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
