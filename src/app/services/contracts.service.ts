import { Injectable } from '@angular/core';
import { Contract, GetContractsParams } from '../models/contract.model';
import { of, Observable, from } from 'rxjs';
import { delay, filter, map, mergeMap, toArray } from 'rxjs/operators';
import { contracts } from '../data/contracts';

@Injectable({
    providedIn: 'root',
})
export class ContractsService {
    private contracts: Contract[] = contracts;

    constructor() {}

    public getContracts(params: Partial<GetContractsParams> = {}): Observable<Contract[]> {
        const { status, contractType, startDate, endDate } = params;
        console.log(params,"params")

        return of(this.contracts).pipe(
            delay(1000),
            mergeMap((contracts) => from(contracts)),
            filter((contract) => this.filterByStatus(contract, status)),
            filter((contract) => this.filterByType(contract, contractType)),
            filter((contract) => this.filterByStartDate(contract, startDate)),
            filter((contract) => this.filterByEndDate(contract, endDate)),
            toArray()
        );
    }

    private filterByStatus(contract: Contract, status?: string): boolean {
        if (!status) return true;
        return contract.contractStatus === status;
    }

    private filterByType(contract: Contract, contractType?: string): boolean {
      if (!contractType) return true;
      return contract.contractType === contractType;
    }

    private filterByStartDate(contract: Contract, startDate?: string): boolean {
      if (!startDate) return true;

      // Convert both values to Date objects for comparison
      const contractDate = new Date(contract.startDate);
      console.log(contractDate,"contractDate")

      const filterDate = new Date(startDate);
      console.log(filterDate,"filterDate")

      // Return true only if the contract's date is on or after the filter date
      return contractDate >= filterDate;
}

    private filterByEndDate(contract: Contract, endDate?: string): boolean {
      if (!endDate) return true;

      const contractDate = new Date(contract.endDate);
      console.log(contractDate,"contractDate")

      const filterDate = new Date(endDate);
      console.log(filterDate,"filterDate")

      // Return true only if the contract's date is on or before the filter date
      return contractDate <= filterDate;
    }

    public deleteContract(id: number): Observable<void> {
        return of(null).pipe(
            delay(1000),
            map(() => {
                this.contracts = this.contracts.filter((c) => c.id !== id);
                console.log(this.contracts,"this.contracts")
            })
        );
    }
}
