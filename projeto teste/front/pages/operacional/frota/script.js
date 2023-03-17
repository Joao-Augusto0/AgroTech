const tableFrota = document.querySelector('.table-frota')

const itensFrota = document.querySelector('.itens-frota')

function user() {

    let usuario = JSON.parse(localStorage.getItem("user"));

    document.getElementById("nomeUser").innerHTML = usuario.nome
    document.getElementById("roleUser").innerHTML = usuario.role
}

function listarFrota() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readVeiculo', options)
        .then(response => response.json())
        .then(res => {
            res.forEach(element => {

                var lista = itensFrota.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('#id').innerHTML = element.id_frota
                lista.querySelector('#placa').innerHTML = element.placa
                lista.querySelector('#modelo').innerHTML = element.modelo
                lista.querySelector('#marca').innerHTML = element.marca
                lista.querySelector('#tipo').innerHTML = element.tipo

                tableFrota.appendChild(lista);
                lista.querySelector('#id').classList.add('model')

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

function cadastrarFrota() {

    let usuario = JSON.parse(localStorage.getItem("user"));


    const inpPlaca = document.querySelector('.inpPlaca')
    const inpModelo = document.querySelector('.inpModelo')
    const inpMarca = document.querySelector('.inpMarca')
    const inpTipo = document.querySelector('.tipoVeiculo')

    const dados = {
        modelo: inpModelo.value.trim(),
        marca: inpMarca.value.trim(),
        placa: inpPlaca.value.trim(),
        tipo: inpTipo.value.trim()
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
                document.getElementById("error-message").innerHTML = "PLACA Já Existe"
            }

        })
}

function abrirModalAtualizar(dados) {
    let id = dados.children[0].innerHTML
    let placa = dados.children[1].innerHTML
    let modelo = dados.children[2].innerHTML
    let marca = dados.children[3].innerHTML
    let tipo = dados.children[4].innerHTML

    window.localStorage.setItem('Frota', JSON.stringify({ 'id': Number(id), 'placa': placa, "modelo": modelo, "marca": marca, "tipo": tipo }));

    const modalCadastro = document.querySelector('.atualizacao')
    modalCadastro.classList.add('mostrar')
}

function fecharModalAtualizar() {
    const modalCadastro = document.querySelector('.atualizacao')

    modalCadastro.classList.remove('mostrar')

    localStorage.removeItem("Frota");
}

function atualizarFrota() {
    let usuario = JSON.parse(localStorage.getItem("user"));

    let frota = JSON.parse(localStorage.getItem("Frota"));
    console.log(frota)

    let inpPlaca = document.querySelector('.atualizarPlaca')
    let inpModelo = document.querySelector('.atualizarModelo')
    let inpMarca = document.querySelector('.atualizarMarca')
    let inpTipo = document.querySelector('.atualizarTipo')

    let dados = {
        modelo: inpModelo.value.trim(),
        marca: inpMarca.value.trim(),
        placa: inpPlaca.value.trim(),
        tipo: inpTipo.value.trim()
    }

    if (dados.modelo.length == 0) {
        dados.modelo = frota.modelo
    }
    if (dados.marca.length == 0) {
        dados.marca = frota.marca
    }
    if (dados.placa.length == 0) {
        dados.placa = frota.placa
    }
    if (dados.tipo.length == 0) {
        dados.tipo = frota.tipo
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: usuario.token
        },
        body: JSON.stringify(dados)
    };

    fetch(`http://localhost:3000/putVeiculo/${frota.id}/${frota.placa}`, options)
        .then(response => {
            if (response.status == 200) {
                window.location.reload()
            }
            return response.json()
        })
        .then(res => {
            if (res.error.meta.target == 'Frota_placa_key') {
                document.getElementById("err-message").style.display = "block"
                document.getElementById("err-message").innerHTML = "PLACA pertence a outro veiculo"
            }
        })
}



function filterTable() {
    let busca, filter, table, tr, td, i, txtValue;

    busca = document.querySelector('.filtro')
    filter = busca.value.toUpperCase();

    table = document.querySelector('.table-frota')
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const sair = document.querySelector('.btn-sair')

sair.addEventListener('click', function () {
    localStorage.clear();
    window.location.href = "../../login/login.html"
})

function carregar() {
    listarFrota()
    user()
}

carregar()
