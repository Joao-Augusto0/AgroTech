// pegar informações do usuario
function user() {
    let usuario = JSON.parse(localStorage.getItem("user"));

    document.getElementById("nomeUser").innerHTML = usuario.nome
    document.getElementById("roleUser").innerHTML = usuario.role

    const op = document.querySelectorAll('.infoGen')
    const link = document.querySelectorAll('.link')


    if (usuario.role == "Operario") {
        op.forEach((e) => {
            e.classList.remove('infoGen')
            e.classList.add('op')
        })

        link.forEach((e) => {
            e.href = '#'
        })

    }
}


// mostrar modal dos relatorios

function iniciaModal(id) {
    const modal = document.getElementById(id)
    modal.classList.add('mostrar')

    // remover classe que faz aparecer modal
    modal.addEventListener('click', (e) => {
        if (e.target.id == id || e.target.className == 'fechar') {
            modal.classList.remove('mostrar')
        }
    })
}


const dispo = document.querySelector('.dispo')
const manu = document.querySelector('.manutencao')
const aloca = document.querySelector('.alocacao')

dispo.addEventListener('click', function () {
    iniciaModal('modal-relatorio disponibilidade')
})


manu.addEventListener('click', function () {
    iniciaModal('modal-relatorio manuten')
})


aloca.addEventListener('click', function () {
    iniciaModal('modal-relatorio aloca')
})


const tableMoto = document.querySelector('.table-motorista')
const linhaMoto = document.querySelector('.itens-moto')

function listarDispo() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readMotorista', options)
        .then(response => response.json())
        .then(resp => {
            resp.forEach((e) => {

                var lista = linhaMoto.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('.id_motorista').innerHTML = e.id_motorista
                lista.querySelector('.nome_motorista').innerHTML = e.nome
                if (e.Servico.length > 0) {
                    lista.querySelector('.situacao_motorista').innerHTML = 'em serviço'
                } else if (e.Servico.length == 0) {
                    lista.querySelector('.situacao_motorista').innerHTML = 'disponivel'
                }

                tableMoto.appendChild(lista);
            })
        })
}

const tableVeiculo = document.querySelector('.table-veiculo')
const itensVeiculo = document.querySelector('.itens-veiculo')

function listarFrota() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readVeiculo', options)
        .then(response => response.json())
        .then(resp => {
            resp.forEach((e) => {
                
                var lista = itensVeiculo.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('.id_veiculo').innerHTML = e.id
                lista.querySelector('.placa_veiculo').innerHTML = e.placa
                if(e.Servico.length > 1 && e.Manutencao.length > 1){
                    lista.querySelector('.situacao_veiculo').innerHTML = 'disponivel'
                }else if(e.Manutencao.length == 1){
                    lista.querySelector('.situacao_veiculo').innerHTML = 'em manutenção'
                }else{
                    lista.querySelector('.situacao_veiculo').innerHTML = 'em serviço'
                }
                tableVeiculo.appendChild(lista)
            })
        })
}

function carregar(){
    listarDispo()
    listarFrota()
    user()
}

carregar()