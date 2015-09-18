function $(el){return document.querySelector(el)}
function u(el){return document.getElementById(el)}
//var boton = $('#boton');
function cambiacolor(el){
    if(el.style.color !== 'blue')
    el.style.color = 'blue'
    
    else if (el.style.color === 'blue')
    el.style.color = 'red'
    
    else if (el.style.color === 'red')
    el.style.color = '#000'
}

function usuario(nombre,apellido,edad,email){
    
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.email = email;
    
    this.presentate = function (){
      console.log('hola, mi nombre es '+this.nombre+' mi edad es '
                  +this.edad)
    }
}