const tableFrota = document.querySelector('.table-frota')

const itensFrota = document.querySelector('.itens-frota')


// listar por filtro com os dados do motorista

function listarFrota() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readVeiculo', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(element => {

                var lista = itensFrota.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('#placa').innerHTML = element.placa
                lista.querySelector('#modelo').innerHTML = element.modelo
                lista.querySelector('#marca').innerHTML = element.marca
                lista.querySelector('#tipo').innerHTML = element.tipo

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
    const inpTipo = document.querySelector('.tipoVeiculo')

    const dados = {
        modelo: inpModelo.value,
        marca: inpMarca.value,
        placa: inpPlaca.value,
        tipo: inpTipo.value
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
            if (response.status === 201) {
                window.location.reload()
            }
            return response.json()
        })
        .then(res => {
            if (res.message === 'campo vazio') {
                document.getElementById("error-message").style.display = "block"
                document.getElementById("error-message").innerHTML = "Campo Vazio"
            }
            if (res.meta.target == 'Frota_placa_key') {
                document.getElementById("error-message").style.display = "block"
                document.getElementById("error-message").innerHTML = "PLACA JáRS Existe"
            }

        })
}

function excluirFrota() {

}

listarFrota()