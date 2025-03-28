import { Component, HostListener, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';
import { Contract, GetContractsParams } from 'src/app/models/contract.model';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowDataChangedEvent } from 'ag-grid-community';
import { ContractTypeCellRendererComponent } from '../cell-renderers/contract-type-cell-renderer/contract-type-cell-renderer.component';
import { ContractStatusCellRendererComponent } from '../cell-renderers/contract-status-cell-renderer/contract-status-cell-renderer.component';
import { DeleteCellRendererComponent } from '../cell-renderers/delete-cell-renderer/delete-cell-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { EditContractDialogComponent } from '../../edit-contract-dialog/edit-contract-dialog.component';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.scss'],
})
export class ContractListComponent implements OnInit {
    public contracts: Contract[] = [];
    public columnDefs: ColDef[] = this.createColumnDefs();
    public gridOptions: GridOptions = this.getGridOptions();
    private gridApi!: GridApi;

    constructor(private contractsService: ContractsService, private dialog: MatDialog) {}

    ngOnInit(): void {}

    public fetchContracts(filters: Partial<GetContractsParams> = {}): void {
        this.gridApi.showLoadingOverlay();
        this.contractsService.getContracts(filters).subscribe((data) => {
          console.log(filters,"filters")
            this.contracts = data;
            console.log(this.contracts,"this.contracts")
            this.gridApi.hideOverlay();
        });
    }

    private getGridOptions(): GridOptions {
        return {
            enableSorting: true,
            enableFilter: true,
            suppressMenuHide: true,
            suppressMovableColumns: true,
            rowHeight: 40,
            headerHeight: 50,
            animateRows: true,
            context: { componentParent: this },
            onGridReady: (params: GridReadyEvent) => this.onGridReady(params),
            onRowDataChanged: (params: RowDataChangedEvent) => params.api.sizeColumnsToFit(),
            onRowClicked: (event) => this.openEditDialog(event.data),
        };
    }

    private onGridReady(params: GridReadyEvent): void {
        this.gridApi = params.api;
        this.fetchContracts();
    }

    private openEditDialog(contract: Contract): void {
        this.dialog.open(EditContractDialogComponent, {
            data: { contract },
            width: '600px',
        });
    }

    private createColumnDefs(): ColDef[] {
        return [
            {
                field: 'contractType',
                headerName: 'Type',
                cellRendererFramework: ContractTypeCellRendererComponent,
                minWidth: 120,
                width: 120,
                maxWidth: 120,
                suppressFilter: true,
            },
            {
              field: 'contractStatus',
              headerName: 'Status',
              cellRendererFramework: ContractStatusCellRendererComponent,
              minWidth: 100,
              width: 100,
              maxWidth: 100,
              suppressFilter: true,
          },
            {
                field: 'customerName',
                headerName: 'Customer Name',
                valueGetter: 'data.customerName',
            },
            {
                field: 'boatName',
                headerName: 'Boat Name',
                valueGetter: 'data.boatName',
            },
            {
                field: 'location',
                headerName: 'Location',
                valueGetter: 'data.location',
            },
            {
                field: 'startDate',
                headerName: 'Start Date',
                valueGetter: 'data.startDate',
                valueFormatter: (params) => {
                  return new Date(params.value).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                  });
              },
            },
            {
                field: 'endDate',
                headerName: 'End Date',
                valueGetter: 'data.endDate',
                valueFormatter: (params) => {
                  return new Date(params.value).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                  });
              },
            },
            {
              field: 'durationInDays',
              headerName: 'Duration in Days',
              valueGetter: (params) => params.data.getDurationInDays(),
          },
          {
            field: 'totalIncVat',
            headerName: 'Total Inc VAT',
            valueGetter: 'data.totalIncVat',
            valueFormatter: (params) => {
              return params.data.currency + ' ' + params.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
              });
          },
          },
          {
            field: 'delete',
            headerName: 'Delete',
            cellRendererFramework: DeleteCellRendererComponent,
            minWidth: 80,
            width: 80,
            maxWidth: 80,
            suppressFilter: true,
          },
        ];

    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (this.gridApi) {
            this.gridApi.sizeColumnsToFit();
        }
    }
}
