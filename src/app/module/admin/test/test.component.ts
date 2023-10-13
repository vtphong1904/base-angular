import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {IColumnTable, IPagination} from '@shared/components/data-table/data-table.component';
import {BaseComponent} from '@app/core/base.component';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {AddOrEditComponent} from '@app/module/admin/test/add-or-edit/add-or-edit.component';
import {TestService} from '@shared/services/test.service';
import {TranslocoService} from '@ngneat/transloco';
import {AbstractControl, FormArray, ValidatorFn, Validators} from '@angular/forms';
import {WebsocketUtil} from '@shared/websocket-util';
import {WebsocketService} from '@shared/services/websocket.service';
import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit, OnDestroy {

    testForm = this.fb.group({
        configs: this.fb.array([
            this.fb.group({
                name: ['', Validators.compose([duplicateNameArray()])],
                age: ''
            })
        ], {validators: checkDuplicate('name')})
    })

    override pagination: IPagination = {
        page: 0,
        size: 10,
        total: 0,
        isShow: true
    }
    columns: IColumnTable[] = [
        {
            columnDef: 'stt',
            header: 'STT',
            flex: 0.3,
        },
        {
            columnDef: 'name',
            header: 'Name',
            flex: 0.3,
        },
        {
            columnDef: 'code',
            header: 'Code',
        },
        {
            columnDef: 'action',
            header: 'Hành động',
            flex: 0.5,
            actions: ['view', 'edit', 'delete'],
        }
    ];
    checked = false;

    dataSocket: any;

    constructor(injector: Injector, private testService: TestService, private _translocoService: TranslocoService, private websocketService: WebsocketService) {
        super(injector, testService);
    }

    get configs() {
        return this.testForm.get('configs') as FormArray
    }

    ngOnInit(): void {


        const lang = this._translocoService.getActiveLang();
        if (lang === 'en') {
            this.checked = false;
        } else {
            this.checked = true;
        }

        this.testService.getContentTest().subscribe(res => {
            console.log(res);
        })
        this.getAll();
    }

    addNewConfigItem() {
        this.configs.push(
            this.fb.group({
                name: ['', Validators.compose([duplicateNameArray()])],
                age: ['']
            })
        )
    }

    deleteConfigItem(index: any) {
        this.configs.removeAt(index)
    }

    changePage(e: any) {
        this.pagination.page = e.pageIndex;
        this.pagination.size = e.pageSize;
    }


    addOrEdit(row: any): void {
        console.log(row);
        this.showDialog(AddOrEditComponent, {}, (value: any) => {
            if (value) {
                this.getAll();
            }
        })
    }

    delete(row: any): void {
        console.log(row);
        this.showDialog(ConfirmDialogComponent, {}, (value: any) => {
            if (value) {
                this.getAll();
            }
        })
    }

    setLanguage() {
        this.checked = !this.checked;
        this._translocoService.setActiveLang(this.checked ? 'vi' : 'en');
    }

    connectSocket() {
        this.websocketService.connect();
        this.websocketService.getMessages()?.subscribe(res => {
            if(res.type = 'trade'){
                this.dataSocket = res.data;
            }
        })
    }

    disConnectSocket() {
        this.websocketService.disConnect();
    }
}

export const duplicateNameArray = (): ValidatorFn => {
    return (control: AbstractControl) => {
        if (control?.value) {
            const formArray = control.parent
                ? (control.parent.parent as FormArray)
                : null;
            if (formArray) {
                const names = formArray.value.map((x: any) => x.name);
                const check = names.indexOf(control?.value);
                if (check > -1) {
                    return {duplicateArray: true};
                } else {
                    return null;
                }
            }
        }
        return null;
    }
}

export const checkDuplicate = (key: string): ValidatorFn => {
    return (arr: AbstractControl) => {
        const names = arr?.value.map((item: any) => item[key]);
        const check = new Set(names).size !== names.length;
        return check ? {dupArr: true} : null;
    };
}
