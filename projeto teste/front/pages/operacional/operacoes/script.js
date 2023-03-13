const tableServico = document.querySelector('.table-servico')

const itensServico = document.querySelector('.itens-servico')

function listarServico() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readOperacao', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(element => {

                var lista = itensServico.cloneNode(true)
                lista.classList.remove('model')

                var data1 = new Date(element.data_saida);
                var data2 = new Date(element.data_retorno);

                let dataFormatada = data1.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                let dataFormatada2 = data2.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                if (element.data_retorno == null) {
                    lista.querySelector('#data_retorno').innerHTML = "Em Serviço"
                } else {
                    lista.querySelector('#data_retorno').innerHTML = dataFormatada2
                }
                lista.querySelector('#data_saida').innerHTML = dataFormatada
                lista.querySelector('#descricao').innerHTML = element.descricao
                lista.querySelector('#CPF').innerHTML = element.motorista.cpf
                lista.querySelector('#Placa').innerHTML = element.veiculo.placa
                lista.querySelector('#id').innerHTML = element.id_servico
                lista.querySelector('#id').classList.add('model')

                tableServico.appendChild(lista);

            })
        })
}

function abrirModalCadastro() {
    const modalCadastro = document.querySelector('.cadastro')

    modalCadastro.classList.add('mostrar')
}

function fecharModalCadastro() {
    const modalCadastro = document.querySelector('.cadastro')

    modalCadastro.classList.remove('mostrar')
}

function cadastrarServico() {

    let usuario = JSON.parse(localStorage.getItem("user"));

    const inpDescricao = document.querySelector('.inpDescricao')
    const inpCpf = document.querySelector('.inpCpf')
    const inpPlaca = document.querySelector('.inpPlaca')

    const dados = {
        descricao: inpDescricao.value,
        cpf: inpCpf.value,
        placa: inpPlaca.value
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: usuario.token
        },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:3000/createOperacao', options)
        .then(response => {
            return response.json()
        })
        .then(res => {

            console.log(res)

            // if (res.veiculo.tipo === 'Visita' && (dados.descricao.includes('Carga') || dados.descricao.includes('Vendas'))) {
            //     document.getElementById("error-message").style.display = "block"
            //     document.getElementById("error-message").innerHTML = 'Esse veiculo não serve para esse serviço'
            // }

            // if (res.veiculo.tipo === 'Carga' && (dados.descricao.includes('Visita') || dados.descricao.includes('Vendas'))) {
            //     document.getElementById("error-message").style.display = "block"
            //     document.getElementById("error-message").innerHTML = 'Esse veiculo não serve para esse serviço'
            // }

            // if (res.veiculo.tipo === 'Vendas' && (dados.descricao.includes('Visita') || dados.descricao.includes('Carga'))) {
            //     document.getElementById("error-message").style.display = "block"
            //     document.getElementById("error-message").innerHTML = 'Esse veiculo não serve para esse serviço'
            // }

            if (res.menssagem) {
                document.getElementById("error-message").style.display = "block"
                document.getElementById("error-message").innerHTML = res.menssagem
            } else {
                window.location.reload()
            }
        })
}

function abrirModalAtualizacao(info) {

    let id = info.children[0].innerHTML
    let descricao = info.children[1].innerHTML
    let data_saida = info.children[2].innerHTML
    let data_retorno = info.children[3].innerHTML
    let cpf = info.children[4].innerHTML
    let placa = info.children[5].innerHTML

    window.localStorage.setItem('Operações', JSON.stringify({ 'id': Number(id), 'cpf': cpf, "descrição": descricao, "placa": placa, "retorno": data_retorno, "saida": data_saida }));

    const modalCadastro = document.querySelector('.atualizacao')

    modalCadastro.classList.add('mostrar')
}

function fecharModalAtualizacao() {
    const modalCadastro = document.querySelector('.atualizacao')

    modalCadastro.classList.remove('mostrar')
}



function atualizarOperação() {

  

    let infoOperacoes = JSON.parse(localStorage.getItem("Operações"));

    let atualizarDescricao = document.querySelector('.atualizarDescricao')

    let dados = {
        descricao: atualizarDescricao.value.trim()
    }

    if (dados.descricao.length == 0) {
        dados.descricao = infoOperacoes.descrição
    }

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    fetch(`http://localhost:3000/putOperacao/${infoOperacoes.id}`, options)
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(res => console.log(res))
}

function finalizarOperacao() {

    let data_retorno = new Date();

let dados = {
    data_retorno:data_retorno
}
    let infoOperacoes = JSON.parse(localStorage.getItem("Operações"));

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };
    

    fetch(`http://localhost:3000/putOperacao/${infoOperacoes.id}`, options)
    .then(response => {
        console.log(response)
        return response.json()
    })
    .then(res => console.log(res))

}

listarServico()