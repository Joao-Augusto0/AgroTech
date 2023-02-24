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
        .then(response => { return response.json() })
        .then(resp => {
            console.log(resp)
            if (resp.result.length != 0) {
                if (resp.result.email === dados.email && resp.result.senha === dados.senha) {
                    window.location.href = "../home/index.html"
                }
            }
        })
}

