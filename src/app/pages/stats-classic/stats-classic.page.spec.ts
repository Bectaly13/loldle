import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsClassicPage } from './stats-classic.page';

describe('StatsClassicPage', () => {
  let component: StatsClassicPage;
  let fixture: ComponentFixture<StatsClassicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsClassicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
