// pegar informações do usuario
function user(){
    let usuario = JSON.parse(localStorage.getItem("user"));
    
    document.getElementById("nomeUser").innerHTML = usuario.nome
    document.getElementById("roleUser").innerHTML = usuario.role

    if(usuario.role == "Gerente"){
        document.getElementById('infoGen').style.cursor = ""
    }
}

// mostrar modal dos relatorios

function iniciaModal(id){
    const  modal = document.getElementById(id)
    modal.classList.add('mostrar')
    
    // remover classe que faz aparecer modal
    modal.addEventListener('click',(e)=>{
        if(e.target.id == id || e.target.className == 'fechar'){
            modal.classList.remove('mostrar')
        }
    })
} 
 

const dispo = document.querySelector('.dispo')
const manu = document.querySelector('.manutencao')
const aloca = document.querySelector('.alocacao')

dispo.addEventListener('click',function(){
    iniciaModal('modal-relatorio disponibilidade')
})


manu.addEventListener('click',function(){
    iniciaModal('modal-relatorio manuten')
})


aloca.addEventListener('click',function(){
    iniciaModal('modal-relatorio aloca')
})

