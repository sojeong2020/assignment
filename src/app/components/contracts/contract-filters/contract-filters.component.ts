import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EnumView } from 'src/app/models/enum-view.model';
import { ContractStatus } from 'src/app/enums/contract-status.enum';
import { ContractType } from 'src/app/enums/contract-type.enum';
import { EnumService } from 'src/app/services/enum.service';
import { GetContractsParams } from 'src/app/models/contract.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-contract-filters',
    templateUrl: './contract-filters.component.html',
    styleUrls: ['./contract-filters.component.scss'],
})
export class ContractFiltersComponent implements OnInit {
    @Output() filtersChanged = new EventEmitter<Partial<GetContractsParams>>();

    public statuses$!: Observable<EnumView<ContractStatus>[]>;
    public contractTypes$!: Observable<EnumView<ContractType>[]>;

    public form: FormGroup = this.fb.group({});

    constructor(private fb: FormBuilder, private enumService: EnumService) {}

    ngOnInit(): void {
        this.statuses$ = this.enumService.getContractStatuses();
        this.contractTypes$ = this.enumService.getContractTypes();

        this.addControls();
    }

    private addControls(): void {
        this.form.addControl('status', this.fb.control(null));
        this.form.addControl('contractType', this.fb.control(null));
        this.form.addControl('startDate', this.fb.control(null));
        this.form.addControl('endDate', this.fb.control(null));

    }

    public applyFilters(): void {
        const { status, contractType, startDate, endDate } = this.form.value;
        console.log(this.form,"this.form")

        this.filtersChanged.emit({
            status: status || undefined,
            contractType: contractType || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined
        });
    }

    public clearFilters(): void {
      this.form.reset();
      this.filtersChanged.emit({});
    }
}
