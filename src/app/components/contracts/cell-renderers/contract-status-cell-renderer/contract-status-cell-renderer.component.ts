import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ContractStatus } from 'src/app/enums/contract-status.enum';

@Component({
  selector: 'app-contract-status-cell-renderer',
  templateUrl: './contract-status-cell-renderer.component.html',
  styleUrls: ['./contract-status-cell-renderer.component.scss']
})
export class ContractStatusCellRendererComponent implements ICellRendererAngularComp {

  public label: string = '';
  public colour: string = '';

    agInit(params: ICellRendererParams): void {
        this.updateDisplay(params.value);
    }

    refresh(params: ICellRendererParams): boolean {
        this.updateDisplay(params.value);
        return true;
    }

    private updateDisplay(contractStatus: ContractStatus): void {
      if (!contractStatus) return;

        switch (contractStatus) {
            case ContractStatus.Active:
                this.label = 'Active';
                this.colour = 'green';
                break;
            case ContractStatus.Initial:
                 this.label = 'Initial';
                 this.colour = 'yellow';
                 break;
            case ContractStatus.Completed:
                this.label = 'Completed';
                this.colour = 'blue';
                break;
            case ContractStatus.Cancelled:
                this.label = 'Cancelled';
                this.colour = 'red';
                break;
            default:
                this.label = 'Unknown';
                this.colour = 'gray';
        }
      }
}
