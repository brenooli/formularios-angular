import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { map, throwError } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  estados?: EstadoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
  ) {

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null],
        cidade: [null],
        estado: [null]
      })
    })
  }

  ngOnInit() {
    this.dropDownService.getEstadosBr()
    .subscribe( dados => {
      console.log(dados);
      this.estados = dados
    })
  }

  onSubmit() {
    console.log(this.formulario);

    if(this.formulario.valid){
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(
        (dados) => {
          console.log(dados);
          console.log(this.formulario);
        },
        (error) => console.log('Error ' + error.message)
      )
    }
    else{
      this.verificarValidacoesForm(this.formulario);
    }
  }

  verificarValidacoesForm(formGroup: FormGroup){

    Object.keys(formGroup.controls).forEach( campo => {
      console.log(campo);
      const controle = formGroup.get(campo);
      controle?.markAllAsTouched();
      if( controle instanceof FormGroup){
        this.verificarValidacoesForm(controle);
      }
  })
}

  resetarFormulario() {
    this.formulario.reset();
  }

  verificaInValidTouched(campo: string) {

    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

  verificaDirtyValid(campo: string) {
    return this.formulario.get(campo)?.valid && this.formulario.get(campo)?.dirty;
  }

  aplicaCssErro(campo: string) {
    return {
      'is-valid': this.verificaDirtyValid(campo),
      'is-invalid': this.verificaInValidTouched(campo)
    }
  }

  consultaCep() {
    let cep = this.formulario.get('endereco.cep')?.value;

    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => {
            this.populaDadosForm(dados);
          })
      }
    }
  }

  populaDadosForm(dados: any): void{

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })
  }
}
