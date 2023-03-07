const tableServico = document.querySelector('.table-servico')

const itensServico = document.querySelector('.itens-servico')

function listarServico() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readOperacao', options)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            res.forEach(element => {

                var lista = itensServico.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('#id').innerHTML = "id: " + element.id
                lista.querySelector('#data_saida').innerHTML = "data_saida: " + element.data_saida
                if (element.data_retorno == null) {
                    lista.querySelector('#data_retorno').innerHTML = "data_retorno: " + 'ainda não retornou'
                } else {
                    lista.querySelector('#data_retorno').innerHTML = "data_retorno: " + element.data_retorno
                }
                lista.querySelector('#descricao').innerHTML = "descrição: " + element.descricao
                lista.querySelector('#id_motorista').innerHTML = "id_motorista: " + element.id_motorista
                lista.querySelector('#id_veiculo').innerHTML = "id_veiculo: " + element.id_veiculo

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
            console.log(response)
            window.location.reload()
        })
        .then(res => console.log(res))
}

function excluirFrota() {

}

listarServico()