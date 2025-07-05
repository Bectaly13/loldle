import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsChronologyPage } from './stats-chronology.page';

describe('StatsChronologyPage', () => {
  let component: StatsChronologyPage;
  let fixture: ComponentFixture<StatsChronologyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsChronologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
