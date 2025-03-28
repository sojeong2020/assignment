import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditContractDialogData } from './edit-contract-dialog.component.model';
import { QuoteService } from 'src/app/services/quote.service';
import { ContractType } from 'src/app/enums/contract-type.enum';
import { ContractStatus } from 'src/app/enums/contract-status.enum';

@Component({
    selector: 'app-edit-contract-dialog',
    templateUrl: './edit-contract-dialog.component.html',
    styleUrls: ['./edit-contract-dialog.component.scss'],
})
export class EditContractDialogComponent implements OnInit {
  public form: FormGroup;
  public quote: number = 0;
  public contractTypes : string[] = Object.values(ContractType);
  public contractStatuses : string[] = Object.values(ContractStatus);

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private data: EditContractDialogData,
        private dialogRef: MatDialogRef<EditContractDialogComponent>,
        private quoteService: QuoteService,
        private fb: FormBuilder,
    ) {
      this.form = this.fb.group({
        contractType: [this.data.contract.contractType, Validators.required],
        contractStatus: [this.data.contract.contractStatus, Validators.required],
        startDate: [new Date(this.data.contract.startDate), Validators.required],
        endDate: [new Date(this.data.contract.endDate), Validators.required]
      });
    }

    ngOnInit(): void {
      this.form.valueChanges.subscribe(() => {
        this.updateQuote();
    });
    this.updateQuote();
    }

    private updateQuote(): void {
      const params = {
          contractType: this.form.get('contractType')?.value,
          contractStaus: this.form.get('contractStaus')?.value,
          startDate: this.form.get('startDate')?.value.toISOString().split('T')[0],
          endDate: this.form.get('endDate')?.value.toISOString().split('T')[0]
      };
      console.log(params,"params")
      this.quoteService.getQuote(params).subscribe((quote) => {
        console.log(quote,"quote")
          this.quote = quote;
      });
  }

    public getQuote(): void {
        throw new Error('Method not implemented.');
    }

    public update(): void {
      if (this.form.valid) {
        const updatedContract = {
            ...this.data.contract,
            contractType: this.form.get('contractType')?.value,
            contractStatus: this.form.get('contractStatus')?.value,
            startDate: this.form.get('startDate')?.value.toISOString().split('T')[0],
            endDate: this.form.get('endDate')?.value.toISOString().split('T')[0]
        };
        console.log(updatedContract,"updatedContract")
        this.dialogRef.close(updatedContract);
      }
    }

}
