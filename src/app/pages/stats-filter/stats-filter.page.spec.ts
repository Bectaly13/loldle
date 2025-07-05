import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsFilterPage } from './stats-filter.page';

describe('StatsFilterPage', () => {
  let component: StatsFilterPage;
  let fixture: ComponentFixture<StatsFilterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
