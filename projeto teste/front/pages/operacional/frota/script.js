const tableFrota = document.querySelector('.table-frota')

const itensFrota = document.querySelector('.itens-frota')


// listar por filtro com os dados do motorista

function listarFrota() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readVeiculo', options)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            res.forEach(element => {

                var lista = itensFrota.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('#id').innerHTML = "id: " + element.id
                lista.querySelector('#placa').innerHTML = "placa: " + element.placa
                lista.querySelector('#modelo').innerHTML = "modelo: " + element.modelo
                lista.querySelector('#marca').innerHTML = "marca: " + element.marca

                tableFrota.appendChild(lista);
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

function cadastrarFrota() {

    let usuario = JSON.parse(localStorage.getItem("user"));


    const inpPlaca = document.querySelector('.inpPlaca')
    const inpModelo = document.querySelector('.inpModelo')
    const inpMarca = document.querySelector('.inpMarca')

    const dados = {
        modelo: inpModelo.value,
        marca: inpMarca.value,
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

    fetch('http://localhost:3000/createVeiculo', options)
        .then(response => {
            console.log(response)
            window.location.reload()
        })
        .then(res => console.log(res))
}

function excluirFrota() {

}

listarFrota()