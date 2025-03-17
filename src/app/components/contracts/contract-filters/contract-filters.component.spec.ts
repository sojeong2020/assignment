import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractFiltersComponent } from './contract-filters.component';

describe('ContractFiltersComponent', () => {
    let component: ContractFiltersComponent;
    let fixture: ComponentFixture<ContractFiltersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContractFiltersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContractFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
