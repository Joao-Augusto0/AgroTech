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

    fetch('http://localhost:3000/loginUser', options)
        .then(response => {
            if (response.status == 404) {
                document.getElementById("error-message").style.display = "block"
            } if (response.status == 200) {
                window.location.href = "../home/index.html"
            }
            return response.json()
        })
        .then(resp => {
            localStorage.setItem('user', JSON.stringify({ "id": resp.result.id, "nome": resp.result.nome, "role": resp.result.role, "token": resp.result.token }));
        })
}

document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault()
})