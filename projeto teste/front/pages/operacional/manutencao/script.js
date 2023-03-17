const tableManutencao = document.querySelector('.table-manutencao')

const itensManutencao = document.querySelector('.itens-manutencao')

function user() {

    let usuario = JSON.parse(localStorage.getItem("user"));

    document.getElementById("nomeUser").innerHTML = usuario.nome
    document.getElementById("roleUser").innerHTML = usuario.role
}

function listarManutecoes() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/readManutencao', options)
        .then(response => response.json())
        .then(res => {
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

                lista.querySelector('#id').innerHTML = element.id_manutencao
                lista.querySelector('#id').classList.add('model')
                lista.querySelector('#descricao').innerHTML = element.descricao
                lista.querySelector('#valor').innerHTML = element.valor
                lista.querySelector('#data_inicio').innerHTML = dataFormatada
                if (element.data_fim == null) {
                    lista.querySelector('#data_fim').innerHTML = "ainda em manutenção"
                } else {
                    lista.querySelector('#data_fim').innerHTML = dataFormatada2
                }
                lista.querySelector('#placa').innerHTML = element.placa

                tableManutencao.appendChild(lista);
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

function cadastrarManutencao() {

    let usuario = JSON.parse(localStorage.getItem("user"));


    const inpDescricao = document.querySelector('.inpDescricao')
    const inpValor = document.querySelector('.inpValor')
    const inpPlaca = document.querySelector('.placaManutencao')

    const dados = {
        descricao: inpDescricao.value.trim(),
        valor: Number(inpValor.value.trim()),
        placa: inpPlaca.value.trim()
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
            return response.json()

        })
        .then(res => {

            if (res.menssagem) {
                document.getElementById("error-message").style.display = "block"
                document.getElementById("error-message").innerHTML = res.menssagem
            } else {
                window.location.reload()
            }
            console.log(res)
        })
}


function abrirModalAtualizacao(dados) {

    console.log(dados.children)

    let id = dados.children[0].innerHTML
    let descricao = dados.children[1].innerHTML
    let valor = dados.children[2].innerHTML
    let dataInicio = dados.children[3].innerHTML
    let dataFim = dados.children[4].innerHTML
    let placa = dados.children[5].innerHTML

    window.localStorage.setItem('Manutenções', JSON.stringify({ 'id': Number(id), 'valor': Number(valor), "descrição": descricao, "dataInicio": dataInicio, "dataFim": dataFim, "placa": placa }));

    const modalCadastro = document.querySelector('.atualizar')

    modalCadastro.classList.add('mostrar')
}

function fecharModalAtualizacao() {
    const modalCadastro = document.querySelector('.atualizar')

    modalCadastro.classList.remove('mostrar')

    localStorage.removeItem("Manutenções");
}

function AtualizarManutencao() {

    let usuario = JSON.parse(localStorage.getItem("user"));

    let infoManutencoes = JSON.parse(localStorage.getItem("Manutenções"));

    let atualizarDescricao = document.querySelector('.atualizarDescricao')
    let atualizarValor = document.querySelector('.atualizarValor')

    let dados = {
        descricao: atualizarDescricao.value.trim(),
        valor: atualizarValor.value.trim()
    }

    if (dados.descricao.length == 0) {
        dados.descricao = infoManutencoes.descrição
    }

    if (dados.valor.length == 0) {
        dados.valor = infoManutencoes.valor
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: usuario.token
        },
        body: JSON.stringify(dados)
    };

    fetch(`http://localhost:3000/putManutencao/${infoManutencoes.id}`, options)
        .then(response => {
            if (response.status == 200) {
                window.location.reload()
            }
            console.log(response)
            return response.json()
        })
        .then(res => {
            console.log(res)
        })
}

function finalizarManutencao() {

    let usuario = JSON.parse(localStorage.getItem("user"));

    let data = new Date();

    let infoManutencoes = JSON.parse(localStorage.getItem("Manutenções"));

    let atualizarValor = document.querySelector('.atualizarValor')

    let dados = {
        data_fim: data,
        valor: atualizarValor.value.trim()
    }



    if (dados.valor.length == 0) {
        dados.valor = infoManutencoes.valor
    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: usuario.token,
        },
        body: JSON.stringify(dados)
    };

    fetch(`http://localhost:3000/putManutencao/${infoManutencoes.id}`, options)
        .then(response => {
            if (response.status == 200) {
                window.location.reload()
            }
            console.log(response)
            return response.json()
        })
        .then(res => {
            console.log(res)
        })
}

function filterTable() {
    let busca, filter, table, tr, td, i, txtValue;

    busca = document.querySelector('.filtro')
    filter = busca.value.toUpperCase();

    table = document.querySelector('.table-manutencao')
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
    listarManutecoes()
    user()
}

carregar()