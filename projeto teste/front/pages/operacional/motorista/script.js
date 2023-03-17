const tableMoto = document.querySelector('.table-motoristas')

const itensMoto = document.querySelector('.itens-motorista')

function user() {

  let usuario = JSON.parse(localStorage.getItem("user"));

  document.getElementById("nomeUser").innerHTML = usuario.nome
  document.getElementById("roleUser").innerHTML = usuario.role
}


function listarMotoristas() {
  const options = { method: 'GET' };

  fetch('http://localhost:3000/readMotorista', options)
    .then(response => response.json())
    .then(res => {
      res.forEach(element => {

        var lista = itensMoto.cloneNode(true)
        lista.classList.remove('model')

        lista.querySelector('#id').innerHTML = element.id_motorista
        lista.querySelector('#nome').innerHTML = element.nome
        lista.querySelector('#cpf').innerHTML = element.cpf
        lista.querySelector('#cnh').innerHTML = element.cnh

        tableMoto.appendChild(lista);

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

function cadastrarMotorista() {

  let usuario = JSON.parse(localStorage.getItem("user"));

  const inpNome = document.querySelector('.inpNome')
  const inpCpf = document.querySelector('.inpCpf')
  const inpCnh = document.querySelector('.inpCnh')

  const dados = {
    nome: inpNome.value.trim(),
    cpf: inpCpf.value.trim(),
    cnh: Number(inpCnh.value.trim())
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: usuario.token
    },
    body: JSON.stringify(dados)
  };

  fetch('http://localhost:3000/createMotorista', options)
    .then(response => {
      if (response.status === 201) {
        window.location.reload()
      }
      return response.json()
    })
    .then(res => {
      console.log(res)
      if (res.erro) {
        document.getElementById("error-message").style.display = "block"
        document.getElementById("error-message").innerHTML = "Campo Vazio"
      }
      if (res.meta.target === 'Motorista_cnh_key') {
        document.getElementById("error-message").style.display = "block"
        document.getElementById("error-message").innerHTML = "CNH Ja Existe"
      }
      if (res.meta.target === 'Motorista_cpf_key') {
        document.getElementById("error-message").style.display = "block"
        document.getElementById("error-message").innerHTML = "CPF Ja Existe"
      }
    })
}

function abrirModalAtualizacao(dados) {

  let id = dados.children[0].innerHTML
  let cpf = dados.children[2].innerHTML
  let nome = dados.children[1].innerHTML
  let cnh = Number(dados.children[3].innerHTML)

  window.localStorage.setItem('Motorista', JSON.stringify({ 'id': Number(id), 'cpf': cpf, "nome": nome, "cnh": Number(cnh) }));
  const modalCadastro = document.querySelector('.update')

  modalCadastro.classList.add('mostrar')
}

function fecharModalAtualizacao() {
  const modalCadastro = document.querySelector('.update')

  modalCadastro.classList.remove('mostrar')

  localStorage.removeItem("Motorista");
}

function update() {

  let usuario = JSON.parse(localStorage.getItem("user"));

  let motorista = JSON.parse(localStorage.getItem("Motorista"));

  let inpNome = document.querySelector('.atualizarNome')
  let inpCpf = document.querySelector('.atualizarCpf')
  let inpCnh = document.querySelector('.atualizarCnh')

  let dados = {
    nome: inpNome.value.trim(),
    cpf: inpCpf.value.trim(),
    cnh: inpCnh.value.trim()
  }


  if (dados.nome.length == 0) {
    dados.nome = motorista.nome
  }

  if (dados.cpf.length == 0) {
    dados.cpf = motorista.cpf
  }

  if (dados.cnh.length == 0) {
    dados.cnh = motorista.cnh
  }

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: usuario.token
    },
    body: JSON.stringify(dados)
  };

  fetch(`http://localhost:3000/putMotorista/${motorista.id}/${motorista.cpf}`, options)
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

  table = document.querySelector('.table-motoristas')
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
  listarMotoristas()
  user()
}

carregar()  