const tableManutencao = document.querySelector('.table-manutencao')

const itensManutencao = document.querySelector('.itens-manutencao')

function listarManutecoes() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readManutencao', options)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            res.forEach(element => {

                var lista = itensManutencao.cloneNode(true)
                lista.classList.remove('model')

                var data1 = new Date(element.data_inicio);
                var data2 = new Date(element.data_fim);

                let dataFormatada = data1.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });
                let dataFormatada2 = data2.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                lista.querySelector('#id').innerHTML = "id: " + element.id
                lista.querySelector('#descricao').innerHTML = "descrição: " + element.descricao
                lista.querySelector('#valor').innerHTML = "valor: " + element.valor
                lista.querySelector('#data_inicio').innerHTML = "data_inicio: " + dataFormatada
                if (element.data_fim == null) {
                    lista.querySelector('#data_fim').innerHTML = "data_fim: " + "ainda em manutenção"
                } else {
                    lista.querySelector('#data_fim').innerHTML = "data_fim: " + dataFormatada2
                }
                lista.querySelector('#id_veiculo').innerHTML = "id_veiculo: " + element.id_veiculo

                tableManutencao.appendChild(lista);
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

function cadastrarManutencao() {

    let usuario = JSON.parse(localStorage.getItem("user"));


    const inpDescricao = document.querySelector('.inpDescricao')
    const inpValor = document.querySelector('.inpValor')
    const inpIdVeiculo = document.querySelector('.inpIdVeiculo')

    const dados = {
        descricao: inpDescricao.value,
        valor: Number(inpValor.value),
        id_veiculo: Number(inpIdVeiculo.value)
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: usuario.token
        },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:3000/createManutencao', options)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .then(res => console.log(res))
}

function excluirFrota() {

}

listarManutecoes()