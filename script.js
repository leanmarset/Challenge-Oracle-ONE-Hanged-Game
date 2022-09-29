;(function(){
"use strict"   

var palabras = [
    "ALURA",
    "HTML",
    "PROGRAMAR",
    "JAVASCRIPT",
    "ORACLE",
    "STYLE",
    "CSS",
    "CODIFICAR",
    "SUBLIME"
]

var juego = null
var finalizado = false

var $html = {
    hombre: document.getElementById("hombre"),
    adivinado: document.querySelector(".adivinado"),
    errado: document.querySelector(".errado"),
}

function dibujar(juego) {
    //Actualizar la imagen del hombre
    var $elem
    $elem = $html.hombre
    
    var estado = juego.estado
    if (estado == 10) {
        estado = juego.previo
    }
    $elem.src = "./Imagenes/0" + estado + ".png"

    //Creamos las lestras adivinadas
    var palabra = juego.palabra
    var adivinado = juego.adivinado
    $elem = $html.adivinado
    $elem.innerHTML = ""
    for (let letra of palabra) {
        let $span = document.createElement("span")
        let $txt = document.createTextNode("")
        if (adivinado.indexOf(letra) >= 0) {
            $txt.nodeValue = letra
        }
        $span.setAttribute("class", "letra-adivinada")
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
    //Creamos las letras erradas
    var errado = juego.errado
    $elem = $html.errado
    $elem.innerHTML = ""
    for (let letra of errado) {
      let $span = document.createElement("span")
      let $txt = document.createTextNode(letra)
      $span.setAttribute("class", "letra-errada")
      $span.appendChild($txt)
      $elem.appendChild($span)
    }
}

function adivinar(juego, letra) {
    var estado =  juego.estado
    if (estado == 1 || estado == 10) {
        return
    }
    var adivinado = juego.adivinado
    var errado = juego.errado
    if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
        return
    }

    var palabra = juego.palabra
    if (palabra.indexOf(letra) >= 0) {
       let ganado = true
       for (let l of palabra) {
            if (adivinado.indexOf(l) < 0 && l != letra) {
                ganado = false
                juego.previo = juego.estado
                break
            }
        }
        if (ganado) {
            juego.estado = 10
        }
        adivinado.push(letra)
    } else { 
        juego.estado--
        errado.push(letra)
    }
    
}

    window.onkeypress = function adivinarLetra(e) {
        var letra = e.key
        letra = letra.toUpperCase()
        if (/[*,Ñ]/.test(letra)) {
            return
        }
        adivinar(juego, letra)
        var estado = juego.estado
        if (estado === 10 && !finalizado) {
            setTimeout(alertaGanado, 500)
            finalizado = true
        } else if (estado === 1 && !finalizado) {
            let palabra = juego.palabra
            let fn = alertaPerdido.bind(undefined, palabra)
            setTimeout(fn, 500)
            finalizado = true
        }
        dibujar(juego)
}



window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 9
    juego.adivinado = []
    juego.errado = []
    finalizado = false
    dibujar(juego)
    console.log(juego)
}

function palabraAleatoria() {
    var index = ~~(Math.random() * palabras.length)
    return palabras[index]
}

function alertaGanado() {
    alert("Felicidades, GANASTE!!")
}

function alertaPerdido(palabra) {
    alert("Lo siento, PERDISTE. la palabra era: " + palabra)
}

nuevoJuego()
console.log(juego)

}())