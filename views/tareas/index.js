const user = JSON.parse(localStorage.getItem('user'));
const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
const inputF = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');
const listaA = document.querySelector('#todos-list');

if (!user) {
    window.location.href = '../home/index.html';
}

const obtenerLista = async () => {
    limpiarHTML();
    try {
        const respuesta = await fetch('http://localhost:3000/api/tareas', { method: 'GET' });
        const list = await respuesta.json();
        const userList = list.filter(lista => lista.user === user.username);
        console.log(userList);
        userList.forEach(lista => {
            const listado = document.createElement('li');
            listado.innerHTML = `
                <li id=${lista._id} class="todo-item">
                <button class="delete-btn">&#10006;</button>
                <p class="${lista.checked ? 'check-todo' : ''}">${lista.text}</p>
                <button class="check-btn">&#10003;</button>
                </li>
            `;
            listaA.appendChild(listado);
            inputF.value = '';
        });
    } catch (error) {
        console.error('Error al obtener la lista de tareas:', error);
    }
};
obtenerLista();

formulario.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const respuesta = await fetch('http://localhost:3000/api/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputF.value, user: user.username })
        });
        if (respuesta.ok) {
            obtenerLista();
        } else {
            console.error('Error al agregar tarea:', await respuesta.text());
        }
    } catch (error) {
        console.error('Error al agregar tarea:', error);
    }
});

lista.addEventListener('click', async e => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.parentElement.id;
        try {
            const respuesta = await fetch(`http://localhost:3000/api/tareas/${id}`, {
                method: 'DELETE'
            });
            if (respuesta.ok) {
                e.target.parentElement.remove();
            } else {
                console.error('Error al eliminar tarea:', await respuesta.text());
            }
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    } else if (e.target.classList.contains('check-btn')) {
        const id = e.target.parentElement.id;
        try {
            const respuestaJSON = await fetch(`http://localhost:3000/api/tareas/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ checked: e.target.parentElement.classList.contains('check-todo') ? false : true })
            });
            const respuesta = await respuestaJSON.json();
            console.log(respuesta);
            e.target.parentElement.classList.toggle('check-todo');
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
        }
    }
});

// Funcionalidad del botón "Cerrar sesión"
cerrarBtn.addEventListener('click', async () => {
    try {
      // Opcional: si tu backend tiene un endpoint para cerrar sesión en el servidor
      const respuesta = await fetch('http://localhost:3000/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (respuesta.ok) {
        // Quitamos al usuario del localStorage
        localStorage.removeItem('user');
        // Redireccionamos a la página "home"
        window.location.href = '../home/index.html';
      } else {
        console.error('Error al cerrar sesión:', await respuesta.text());
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  });

function limpiarHTML() {
    while (listaA.firstChild) {
        listaA.removeChild(listaA.firstChild);
    }
}