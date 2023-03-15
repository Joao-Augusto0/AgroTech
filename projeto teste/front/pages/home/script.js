const urlVeiculo = 'http://localhost:3000/readVeiculo'
const urlMotorista = 'http://localhost:3000/readMotorista'
const urlManutencao = 'http://localhost:3000/readManutencao'

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

function iniciaModal(id) {
    const modal = document.getElementById(id)
    modal.classList.add('mostrar')

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

    fetch(urlMotorista, options)
        .then(response => response.json())
        .then(resp => {


            resp.forEach((e) => {

                var lista = linhaMoto.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('.nome_motorista').innerHTML = e.nome
                lista.querySelector('.cpf_motorista').innerHTML = e.cpf
                if (e.ocupado == true) {
                    lista.querySelector('.situacao_motorista').innerHTML = 'em serviço'
                } else if (e.ocupado == false) {
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

    fetch(urlVeiculo, options)
        .then(response => response.json())
        .then(resp => {
            resp.forEach((e) => {

                var lista = itensVeiculo.cloneNode(true)
                lista.classList.remove('model')

                lista.querySelector('.placa_veiculo').innerHTML = e.placa
                lista.querySelector('.tipo_veiculo').innerHTML = e.tipo

                //
                let i = 0
                if (e.ocupado == true) {
                    i++
                }

                console.log()
                if (e.ocupado == false) {
                    lista.querySelector('.situacao_veiculo').innerHTML = 'disponivel'
                } else if (e.Manutencao.length == 1 && e.Manutencao[0].data_fim == null) {
                    lista.querySelector('.situacao_veiculo').innerHTML = 'em manutenção'
                } else if (e.Servico.length == 1 && e.Servico[0].data_retorno == null) {
                    lista.querySelector('.situacao_veiculo').innerHTML = 'em serviço'
                }
                tableVeiculo.appendChild(lista)
            })
        })
}

const tableManutencao = document.querySelector('.relatorio-manu')
const itensVeiculoManutencao = document.querySelector('.itens_veiculo_manutencao')

function listarRelatorioManutencao() {
    const options = { method: 'GET' };

    fetch(urlManutencao, options)
        .then(response => response.json())
        .then(res => {
            res.forEach((e) => {
                var lista = itensVeiculoManutencao.cloneNode(true)
                lista.classList.remove('model')

                var data1 = new Date(e.data_inicio);
                var data2 = new Date(e.data_fim);

                let dataFormatada = data1.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                let dataFormatada2 = data2.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                lista.querySelector('.placa').innerHTML = e.placa
                lista.querySelector('.descicao_manutenca').innerHTML = e.descricao
                lista.querySelector('.data_inicio').innerHTML = dataFormatada
                if (e.data_fim == null) {
                    lista.querySelector('.data_fim').innerHTML = 'manutenção em andamento'
                } else {
                    lista.querySelector('.data_fim').innerHTML = dataFormatada2
                }

                lista.querySelector('.valor').innerHTML = e.valor
                tableManutencao.appendChild(lista)
            })
        })
}

const tableAloca = document.querySelector('.table-aloca')
const itensAloca = document.querySelector('.itens-aloca')

function relatorioAlocacao() {

    const options = { method: 'GET' };

    fetch(urlVeiculo, options)
        .then(response => response.json())
        .then(resp => {
            resp.forEach((e) => {
                var lista = itensAloca.cloneNode(true)
                lista.classList.remove('model')

                // lista.querySelector('.id_vei').innerHTML = e.id
                lista.querySelector('.modelo-vei').innerHTML = e.modelo
                lista.querySelector('.marca-vei').innerHTML = e.marca
                lista.querySelector('.placa_vei').innerHTML = e.placa
                if (e.Servico.length == 1) {
                    lista.querySelector('.servico_vei').innerHTML = e.Servico[0].descricao
                } else {
                    lista.querySelector('.servico_vei').innerHTML = e.Servico
                }

                if (e.Manutencao.length > 1) {
                    lista.querySelector('.manutencao_vei').innerHTML = e.Manutencao
                } else if (e.Manutencao.length == 1) {
                    lista.querySelector('.manutencao_vei').innerHTML = 'em manutenção'
                    lista.querySelector('.servico_vei').innerHTML = 'quebrou no meio do serviço'

                }
                tableAloca.appendChild(lista)
            })
        })
}

const sair = document.querySelector('.btn-sair')

sair.addEventListener('click', function () {
    localStorage.clear();
    window.location.href = "../login/login.html"
})

function graficoDisponibilidadeMotorista() {

    const options = { method: 'GET' };

    fetch(urlMotorista, options)
        .then(response => {
            return response.json()
        })
        .then(res => {
            let disponivelMotoristas = 0;
            let indisponivelMotoristas = 0;
            res.forEach((e) => {
                console.log()
                if (e.ocupado == true) {
                    indisponivelMotoristas++
                }

                if (e.ocupado == false) {
                    disponivelMotoristas++
                }

            })

            var ctx = document.getElementById('chart-motoristas').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Motoristas Disponivel', 'Motoristas Indisponivel'],
                    datasets: [{
                        label: ['Quantidade'],
                        data: [disponivelMotoristas, indisponivelMotoristas],
                        backgroundColor: ['#006400', '#90ee90'],
                        borderColor: 'rgb(000, 00,0)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
}

function graficoDisponibilidadeFrota() {

    const options = { method: 'GET' };

    fetch(urlVeiculo, options)
        .then(response => response.json())
        .then(res => {
            let frotaServico = 0
            let frotaManutencao = 0
            let frotaDisponivel = 0
            res.forEach((e) => {

                if (e.Servico.length == 1 && e.Servico[0].data_retorno == null) {
                    frotaServico++
                }
                if (e.Manutencao.length == 1 && e.Manutencao[0].data_fim == null) {
                    frotaManutencao++
                }
                if (e.ocupado == false) {
                    frotaDisponivel++
                }
            })

            var ctx = document.getElementById('chart-frota').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Disponiveis', 'Em Manutenção', 'Em Serviço'],
                    datasets: [{
                        label: ['Quantidade'],
                        data: [frotaDisponivel, frotaManutencao, frotaServico],
                        backgroundColor: ['#0000ff', '#0066CC', '#00CCCC'],
                        borderColor: 'rgb(000, 00,0)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        })
}

function graficoPizzaManutencao() {
    const options = { method: 'GET' };

    fetch(urlManutencao, options)
        .then(response => response.json())
        .then(res => {

            let emManutencao = 0
            let manutencaoFinalizada = 0

            res.forEach((e) => {

                let data1 = new Date(e.data_inicio);

                dataFormat = data1.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                if (e.data_fim == null) {
                    emManutencao++
                } else {
                    manutencaoFinalizada++
                }
            })

            var ctx = document.getElementById('pizzaManutencao').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Quantidade de veiculos'],
                    datasets: [{
                        label: 'Em manutenção',
                        data: [emManutencao],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Manutenção Finalizada',
                        data: [manutencaoFinalizada],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
}

function graficoLinhaManutencao() {

    const options = { method: 'GET' };

    fetch('http://localhost:3000/readManutencao', options)
        .then(response => response.json())
        .then(res => {
            let tipoVisita = 0
            let tipoVendas = 0
            let tipoCarga = 0
            let valorVisita = 0
            let valorVendas = 0
            let valorCarga = 0
            let total = 0
            res.forEach((e) => {

                if (e.veiculo.tipo == 'Visita') {
                    tipoVisita++
                    valorVisita += e.valor
                }
                if (e.veiculo.tipo == 'Vendas') {
                    tipoVendas++
                    valorVendas += e.valor
                }
                if (e.veiculo.tipo == 'Carga') {
                    tipoCarga++
                    valorCarga += e.valor
                }

            })

            total = total += (valorVisita + valorVendas + valorCarga)

            var ctx = document.getElementById('linhaManutencao').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Visita', 'Vendas', 'Carga', 'total'],
                    datasets: [{
                        label: 'quantidade de veiculo',
                        data: [tipoVisita, tipoVendas, tipoCarga],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,

                    }, {
                        label: 'Preço',
                        data: [valorVisita, valorVendas, valorCarga],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: true
                    },
                    {
                        label: 'total',
                        data: ['', '', '', total],
                        backgroundColor: 'rgba(14, 142, 23, 0.2)',
                        borderColor: 'rgba(14, 142, 23, 1)',
                        borderWidth: 1,
                        fill: true
                    },
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        })
}

function graficoColunaAlocacao() {


    const options = { method: 'GET' };

    fetch(urlVeiculo, options)
        .then(response => response.json())
        .then(res => {

            let ocioso = 0
            let servio = 0
            let manutencao = 0

            res.forEach((e) => {
                console.log(e.ocupado == false)

                if (e.ocupado == false) {
                    ocioso++
                } else if (e.Manutencao.length == 1 && e.Manutencao[0].data_fim == null) {
                    manutencao++
                } else if (e.Servico.length == 1 && e.Servico[0].data_retorno == null) {
                    servio++
                }

            })

            var ctx = document.getElementById('colunaAlocacao').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Manutenção', 'Serviço', 'ociosos'],
                    datasets: [{
                        label: 'quantidade de veiculo',
                        data: [manutencao, servio, ocioso],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,

                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        })


}






function carregar() {
    graficoColunaAlocacao()
    graficoLinhaManutencao()
    graficoPizzaManutencao()
    graficoDisponibilidadeFrota()
    graficoDisponibilidadeMotorista()
    relatorioAlocacao()
    listarRelatorioManutencao()
    listarDispo()
    listarFrota()
    user()
}

carregar()

