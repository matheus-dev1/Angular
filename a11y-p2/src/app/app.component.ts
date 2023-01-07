import { OnInit } from '@angular/core';
import { TemplateRef, Component, ViewChild, AfterViewChecked, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalRef } from './shared/components/modal/models/modal-ref';
import { ModalService } from './shared/components/modal/services/modal.service';

// AfterViewInit, classe usada para executar funções após a View(html/template) ser renderizado, que é diferente do onInit que é do componente(arquivo .ts)
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  /* Injetar fragmentos de um template, ou um componente que está dentro de um template, dentro do componente pai através do view child.

  O decorator ViewChild('nameTemplate') consegue buscar o template e injetar sua referência em uma propriedade do nosso componente da nossa escolha. */
  @ViewChild('modalTemplate') public modalTemplateRef: TemplateRef<any>;
  // Dois atributos para capturar cada um dos templates
  @ViewChild('test1') public TemplateTest1: TemplateRef<any>;
  @ViewChild('test2') public TemplateTest2: TemplateRef<any>;
  public selectedTemplate: TemplateRef<any>;
  public title: string = 'a11y-p2';
  //public firstName: Event | string;
  public modalRef: ModalRef;
  public info: boolean = false;
  public formGroup: FormGroup;

  constructor(
    private modalService: ModalService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['Matheus', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      info: [false],
    })
  }

  ngAfterViewInit(): void {
    this.selectedTemplate = this.TemplateTest2;
    // Este ChangeDetectorRef é uma classe usada para forçar a 'deteção' da mudança de um template/view
    this.changeDetectorRef.detectChanges();
  }

  public show(): void {
    this.selectedTemplate = this.TemplateTest1;
    console.log(this.modalTemplateRef);
    // Quando um metodo solicita parametros já setados, isso quer dizer que você criou uma interface e colocou ela como parametro pra este metodo.
    this.modalRef = this.modalService.open({
      templateRef: this.modalTemplateRef,
      title: 'User Details',
    });
  }

  public submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    console.log(this.formGroup.value);
    this.modalRef.close();
  }

}
