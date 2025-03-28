import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
    selector: 'app-delete-cell-renderer',
    templateUrl: './delete-cell-renderer.component.html',
    styleUrls: ['./delete-cell-renderer.component.scss'],
})
export class DeleteCellRendererComponent implements ICellRendererAngularComp {
    private params!: ICellRendererParams;

    constructor(private contractsService: ContractsService) {}

    agInit(params: ICellRendererParams): void {
        this.params = params;
        console.log(this.params,"this.params")
    }

    refresh(params: ICellRendererParams): boolean {
        return false;
    }

    deleteContract(): void {
        const contractId = this.params.data.id;
        console.log(contractId,"contractId")

        this.contractsService.deleteContract(contractId).subscribe(() => {
          this.params.api.updateRowData({ remove: [this.params.node.data] });
        });
    }
}
