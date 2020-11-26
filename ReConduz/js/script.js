function validaCampos() {

    if (document.getElementById("nome").value.length < 1) {
        alert('Por favor, preencha o campo nome');
        document.getElementById("nome").focus();
        return false
    }
    if (document.getElementById("logradouro").value.length < 1) {
        alert('Por favor, preencha o campo logradouro');
        document.getElementById("logradouro").focus();
        return false
    }
    if (document.getElementById("numero").value.length < 1) {
        alert('Por favor, preencha o campo numero');
        document.getElementById("numero").focus();
        return false
    }
    if (document.getElementById("bairro").value.length < 1) {
        alert('Por favor, preencha o campo bairro');
        document.getElementById("bairro").focus();
        return false
    }
    if (document.getElementById("cidade").value.length < 1) {
        alert('Por favor, preencha o campo cidade');
        document.getElementById("cidade").focus();
        return false
    }
    if (document.getElementById("uf").value.length < 1) {
        alert('Por favor, preencha o campo uf');
        document.getElementById("uf").focus();
        return false
    }
    if (document.getElementById("renda").value.length < 1) {
        alert('Por favor, preencha o campo renda');
        document.getElementById("renda").focus();
        return false
    }
    if (document.getElementById("senha").value.length < 1) {
        alert('Por favor, preencha o campo senha');
        document.getElementById("senha").focus();
        return false
    }

    return true;
}

function informaEmTela() {

    if (validaCampos()) {
        var sexo = '';

        document.getElementById("nomeForm").innerHTML = document.getElementById('nome').value;

        if (document.getElementById('masculino').checked) {
            sexo = document.getElementById('masculino').value;
        } else if (document.getElementById('feminino').checked) {
            sexo = document.getElementById('feminino').value;
        } else {
            sexo = document.getElementById('outros').value;
        }
        document.getElementById("sexoForm").innerHTML = sexo;

        document.getElementById("dataNascimentoForm").innerHTML = document.getElementById('dataNascimento').value;
        document.getElementById("logradouroForm").innerHTML = document.getElementById("logradouro").value;
        document.getElementById("numeroForm").innerHTML = document.getElementById("numero").value;
        document.getElementById("bairroForm").innerHTML = document.getElementById("bairro").value;
        document.getElementById("cidadeForm").innerHTML = document.getElementById("cidade").value;
        document.getElementById("ufForm").innerHTML = document.getElementById("uf").value;
        document.getElementById("cepForm").innerHTML = document.getElementById("cep").value;
        document.getElementById("estadoCivilForm").innerHTML = document.getElementById("estadoCivil").value;
        document.getElementById("rendaForm").innerHTML = document.getElementById("renda").value;
        document.getElementById("senhaForm").innerHTML = document.getElementById("senha").value;
    }
}

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            document.getElementById('logradouro').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)

    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
}