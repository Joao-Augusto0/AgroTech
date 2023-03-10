function login() {

    let inpEmail = document.getElementById('email').value
    let inpSenha = document.getElementById('senha').value

    let dados = {
        email: inpEmail,
        senha: inpSenha
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    if (dados.email.length > 0 && dados.senha.length > 0) {
        fetch('http://localhost:3000/loginUser', options)
            .then(response => {
                if (response.status == 404) {
                    document.getElementById("error-message").style.display = "block"
                    document.getElementById("error-message").innerHTML = "Email ou Senha incorreto"
                }
                if (response.status == 200) {
                    window.location.href = "../home/index.html"
                }
                return response.json()

            })
            .then(resp => {
                localStorage.setItem('user', JSON.stringify({ "id": resp.result.id, "nome": resp.result.nome, "role": resp.result.role, "token": resp.result.token }));
            })
    } else {
        document.getElementById("error-message").style.display = "block"
        document.getElementById("error-message").innerHTML = "Preencha os Campos"
    }
}

document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault()
})