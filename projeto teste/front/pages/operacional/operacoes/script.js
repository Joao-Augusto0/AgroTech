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

                tableServico.appendChild(lista);

            })
        })
}

function abrirModalCadastro() {
    const modalCadastro = document.querySelector('.modal-container')

    modalCadastro.classList.add('mostrar')
}

function fecharModalCadastro() {
    const modalCadastro = document.querySelector('.modal-container')

    modalCadastro.classList.remove('mostrar')
}

function cadastrarServico() {

    let usuario = JSON.parse(localStorage.getItem("user"));

    const inpDescricao = document.querySelector('.inpDescricao')
    const inpIdMoto = document.querySelector('.inpIdMotorista')
    const inpIdVei = document.querySelector('.inpIdVeiculo')

    let idMoto = Number(inpIdMoto.value)
    let idVei = Number(inpIdVei.value)

    const dados = {
        descricao: inpDescricao.value,
        id_motorista: idMoto,
        id_veiculo: idVei
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

            console.log(res.menssagem)
            if (res.menssagem) {
                document.getElementById("error-message").style.display = "block"
                document.getElementById("error-message").innerHTML = res.menssagem
            } else {
                window.location.reload()
            }

        })

}

// function atualizarOperação() {

// }

listarServico()