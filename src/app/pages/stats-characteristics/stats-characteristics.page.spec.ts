import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsCharacteristicsPage } from './stats-characteristics.page';

describe('StatsCharacteristicsPage', () => {
  let component: StatsCharacteristicsPage;
  let fixture: ComponentFixture<StatsCharacteristicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsCharacteristicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
