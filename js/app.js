'use strict'
var lista = []
const listarFetch = async() => {
    try{
        fetch("https://reqres.in/api/users").then(response => response.json())
        .then(response => {
            lista = response.data
            let contenido = ""
            lista.map((persona, index) => {
                let imagen = persona.avatar ? persona.avatar : 'https://www.licoresfactory.com/web/image/product.product/82457/image_1024/%5B9644%5D%20Cocuy%20De%20Penca%20Pasita%20Mj%200%2C70L?unique=809c0c2'
                let card = `<div class="card col-lg-4"">
                    <img src="${imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${persona.first_name} ${persona.last_name}</h5>
                    <p class="card-text">${persona.email}</p>
                    <a class="btn btn-danger" onclick="eliminar(${index})">Eliminar</a>
                    </div>
                </div>`

                contenido += card
            })
            let personas = document.getElementById('personas');
            personas.innerHTML = contenido
        });
    } catch(error) {
        throw 'Ocurrió un error'
    }
}

const listarLocal = async() => {
    let contenido = ""
    lista.map((persona, index) => {
        let imagen = persona.avatar ? persona.avatar : 'https://www.licoresfactory.com/web/image/product.product/82457/image_1024/%5B9644%5D%20Cocuy%20De%20Penca%20Pasita%20Mj%200%2C70L?unique=809c0c2'
        let card = `<div class="card col-lg-4"">
            <img src="${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${persona.first_name} ${persona.last_name}</h5>
            <p class="card-text">${persona.email}</p>
            <a class="btn btn-danger" onclick="eliminar(${index})">Eliminar</a>
            </div>
        </div>`

        contenido += card
    })
    let personas = document.getElementById('personas');
    personas.innerHTML = contenido
}

const registrar = async() => {
    try{
        let persona = {
            id: 0,
            first_name: document.getElementById("nombre").value,
            name: document.getElementById("nombre").value,
            last_name: document.getElementById("apellido").value,
            job: document.getElementById("trabajo").value,
            email: document.getElementById("correo").value
        }

        fetch("https://reqres.in/api/users", {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        }).then(response => response.json())
        .then(response => {
            if(response.id){
                persona.id = response.id
                lista.push(persona)
                alert(`Persona: ${response.name} con el trabajo: ${response.job} fue registrada con éxito`)
                $('#exampleModal').modal('toggle');
                listarLocal()
                document.getElementById("nombre").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("apellido").value = ""
                document.getElementById("trabajo").value = ""
                document.getElementById("correo").value = ""
            }
        })
    } catch(error){
        throw 'OCurrió un errror'
    }
}

const eliminar = (index) => {
    let opcion = confirm('¿Está seguro de eliminar este elemento?')

    if(opcion === true){
        lista.splice(index,1)
        listarLocal()
    }
}

listarFetch()