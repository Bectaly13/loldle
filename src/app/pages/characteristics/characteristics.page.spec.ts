import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacteristicsPage } from './characteristics.page';

describe('CharacteristicsPage', () => {
  let component: CharacteristicsPage;
  let fixture: ComponentFixture<CharacteristicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
