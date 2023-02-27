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
            if (response.status === 200) {
                window.location.href = "../home/index.html"
            } else if (response.status === 404) {
                document.getElementById("error-message").style.display = "block"
            }
        })
        .then(resp => console.log(resp))
}

document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault()
})