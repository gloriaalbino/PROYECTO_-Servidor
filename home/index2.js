 //Selectores
const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification')

//Eventos
formC.addEventListener('submit', async e=>{
    e.preventDefault();
    const respuesta = await fetch('http://localhost:3000/users',{method: 'GET'});
    const users = await response.json();
    //Si voy a buscar el usuario que estoy colocando en el campo dentro del recurso users
    const user = users.find(user=>user.username === createInput.value)

    //Validamos
    if(!createInput.value){
        //Si el campo esta vacio
        notificacion.innerHTML = 'El campo de usuario no puede estar vacio';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')

        },3000);
    }else if(user){
        //Caso de que el usuario exista
        notificacion.innerHTML = 'El usuario ya existe'
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')

        },3000);
    }else{
        await fetch('http//localhost:3000/users',{
            method: 'POST',
            headers:{
                'Content-type':'aplication/json'
            },
            body: JSON.stringify({username: createInput.value})
        });

        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`
        notificacion.classList.add('show-notification')
        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },3000);
        createInput.value = '';
    }

})

formL.addEventListener('submit', async e=>{
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/users',{method: 'GET'});
    const users = await respuesta.json();
    
    const user = users.find(user=>user.username === loginInput.value)

    if(!user){
        notificacion.innerHTML = 'El usuario no existe'
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },3000);
    }else{
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '../tareas/tareas.html'
    }
})


