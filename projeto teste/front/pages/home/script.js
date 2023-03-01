function user(){
    let usuario = JSON.parse(localStorage.getItem("user"));
    
    document.getElementById("nomeUser").innerHTML = usuario.nome
    document.getElementById("roleUser").innerHTML = usuario.role

    if(usuario.role == "Gerente"){
        document.getElementById('infoGen').style.cursor = ""
    }
}

user()