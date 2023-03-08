const tableMoto = document.querySelector('.table-motoristas')

const itensMoto = document.querySelector('.itens-motorista')

// listar por filtro com os dados do motorista

function listarMotoristas() {
  const options = { method: 'GET' };

  fetch('http://localhost:3000/readMotorista', options)
    .then(response => response.json())
    .then(res => {
      res.forEach(element => {

        var lista = itensMoto.cloneNode(true)
        lista.classList.remove('model')

        lista.querySelector('#id').innerHTML = "ID: " + element.id_motorista
        lista.querySelector('#nome').innerHTML = "Nome: " + element.nome
        lista.querySelector('#cpf').innerHTML = "CPF: " + element.cpf
        lista.querySelector('#cnh').innerHTML = "CNH: " + element.cnh

        tableMoto.appendChild(lista);
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

function cadastrarMotorista() {

  let usuario = JSON.parse(localStorage.getItem("user"));


  const inpNome = document.querySelector('.inpNome')
  const inpCpf = document.querySelector('.inpCpf')
  const inpCnh = document.querySelector('.inpCnh')

  const dados = {
    nome: inpNome.value,
    cpf: inpCpf.value,
    cnh: inpCnh.value
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: usuario.token
    },
    body: JSON.stringify(dados)
  };


  console.log(inpCnh.value.length)

  fetch('http://localhost:3000/createMotorista', options)
    .then(response => {
      console.log(response)
      window.location.reload()
    })
    .then(res => console.log(res))
}

listarMotoristas()