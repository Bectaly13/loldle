import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChronologyPage } from './chronology.page';

describe('ChronologyPage', () => {
  let component: ChronologyPage;
  let fixture: ComponentFixture<ChronologyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
