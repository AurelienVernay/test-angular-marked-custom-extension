import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomId } from './custom-id';

describe('CustomId', () => {
  let component: CustomId;
  let fixture: ComponentFixture<CustomId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomId]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
