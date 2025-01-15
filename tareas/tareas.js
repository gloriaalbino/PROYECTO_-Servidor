const user = localStorage.getItem('user')
const formulario = document.querySelector('#form-todos')
const lista = document.querySelector('#todos-list')
const inputF = document.querySelector('#form-input')
const cerrarBtn = document.querySelector('#cerrar-btn')
const listaA = document.querySelector('#todos-list')

if(!user){
    window.location.href = '../home/index.html'
}
/* console.log(inputF)*/

const obtenerLista = async ()=>{
    limpiarHTML()
    const respuesta = await fetch('http://localhost:3000/tareas', {method: 'GET'});
    const list = await respuesta.json();
    const userList = list.filter(lista=> lista.user === user.username);
    console.log(userList)
        userList.forEach(lista=>
            {
            const listado = document.createElement('li')
            listado.innerHTML = `
            <li id=${lista.id} class="todo-item">
            <button class="delete-btn">&#10006;</button>
            <p class="${lista.checked ? 'check-todo' : ''}">${lista.text}</p>
            <button class="check-btn">&#10003;</button>
            </li>
            `
            listaA.appendChild(listado);
            inputF.value='';
        })
}
obtenerLista();

formulario.addEventListener('submit', async e=>{
    e.preventDefault();

    await fetch('http://localhost:3000/tareas', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({text:inputF.value,user:user.username,}),
    })
    obtenerLista();

})

lista.addEventListener('click', async e=>{

    if(e.target.classList.contains('delete-btn')){
        const id = e.target.parentElement.id;
        //console.log(id)

        await fetch(`http://localhost:3000/tareas/${id}`,{
            method:'DELETE'})
            e.target.parentElement.remove();
    }else if(e.target.classList.contains('check-btn'));
        const id = e.target.parentElement.id;
        
        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },

            body: JSON.stringify({checked:e.target.parentElement.classList.contains('check-todo')?false:true})
        })

        const respuesta = await respuestaJSON.json();
        console.log(respuesta)
        e.target.parentElement.classList.toggle('check-todo')
})

function limpiarHTML(){

    while(listaA.firstChild){
        listaA.removeChild(listaA.firstChild)
    }
}
