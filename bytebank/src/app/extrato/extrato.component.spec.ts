import { environment } from './../../environments/environment';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TransferenciaService } from '../services/transferencia.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExtratoComponent } from './extrato.component';

describe('ExtratoComponent', () => {
  let component: ExtratoComponent;
  let fixture: ComponentFixture<ExtratoComponent>;
  let service: TransferenciaService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtratoComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    service = TestBed.inject(TransferenciaService);
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a list of Transfers', () => {
    const transferencias = {
      "transferencias": [
        {
          "id": "1",
          "valor": 35,
          "destino": "1212-1",
          "data": "2020-11-04T16:30:10.710Z"
        },
        {
          "id": "2",
          "valor": 40,
          "destino": "1213-1",
          "data": "2020-11-04T21:24:10.710Z"
        },
        {
          "id": "3",
          "valor": 12.5,
          "destino": "1214-1",
          "data": "2020-11-05T21:14:10.710Z"
        },
        {
          "valor": 323232,
          "destino": "3232",
          "data": "2022-02-11T05:33:22.369Z",
          "id": "UVka25l"
        },
        {
          "valor": 32323,
          "destino": "23323",
          "data": "2022-02-13T01:36:28.234Z",
          "id": "3utlatU"
        },
        {
          "valor": 323232,
          "destino": "3232",
          "data": "2022-02-13T01:44:13.656Z",
          "id": "pCndOOb"
        }
      ]
    }

    service.todasAsTransferencias().subscribe(response => {
      expect(response[0].id).toEqual("1");
    })

    const req = httpController.expectOne(environment.url + "/transferencias");
    expect(req.request.method).toBe('GET');

    req.flush(transferencias);
  })

  afterEach(() => {
    httpController.verify();
  });
})
