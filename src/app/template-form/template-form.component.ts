import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, NgModel } from '@angular/forms';
import { map } from 'rxjs';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

    this.http.post('/formulario', JSON.stringify(form.value))
      .subscribe(dados => console.log(dados));
    console.log(JSON.stringify(form.value));
  }

  consultaCep(cep: string, form: NgForm) {
    console.log(cep);
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {

        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => {
            this.populaDadosForm(dados, form);
          })
      }
    }


  }

  populaDadosForm(dados: any, form: NgForm) {
    /*     form.setValue({
          nome: form.value.nome,
          email: form.value.email,
          endereco: {
            rua: dados.logradouro,
            cep: dados.cep,
            numero: '',
            complemento: dados.complemento,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          }
        }) */

    form.form.patchValue({
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

  verificaInValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  verificaDirtyValid(campo: any) {
    return campo.valid && campo.dirty;
  }

  aplicaCssErro(campo: any) {
    return {
      'is-valid': this.verificaDirtyValid(campo),
      'is-invalid': this.verificaInValidTouched(campo)
    }
  }

}
