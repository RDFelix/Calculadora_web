var screen = document.querySelector('#screen');
var btn = document.querySelectorAll('.btn');
var entrada = document.getElementById('entrada');
var consola = document.getElementById('consola');
var color_f = document.getElementById('color_fonts');
var color_bg = document.getElementById('color_bg');
var color_w = document.getElementById('color_windows');
var div_notas = document.getElementById("div_notas");
window.onload = function() {screen.value=""};

var botones = document.querySelectorAll('button');
  botones.forEach(function(boton){boton.style.color = localStorage.getItem('dtb_f');});
  botones.forEach(function(boton){boton.style.backgroundColor = localStorage.getItem('dtb_w');});

var config = document.querySelectorAll('.config');
  config.forEach(function(cf){cf.style.color = localStorage.getItem('dtb_f');});
  config.forEach(function(cf){cf.style.backgroundColor = localStorage.getItem('dtb_w');});

var div_consola = document.querySelectorAll('.div_consola');
  div_consola.forEach(function(cf){cf.style.color = localStorage.getItem('dtb_f');});
  div_consola.forEach(function(cf){cf.style.backgroundColor = localStorage.getItem('dtb_w');});

var body = document.querySelectorAll('body');
  body.forEach(function(b){b.style.backgroundColor = localStorage.getItem('dtb_bg');});



for (item of btn) {
  item.addEventListener('click', (e) => {
    screen.value += e.target.innerText;
    entrada.innerHTML += e.target.innerText + " "; 
  });
}

function sin(){entrada.innerHTML = ""; consola.innerHTML+= "<p>sin(" + screen.value + ") = " + Math.sin(screen.value); + "</p>"; screen.value = Math.sin(screen.value);}
function cos(){entrada.innerHTML = ""; consola.innerHTML+= "<p>cos(" + screen.value + ") = " + Math.cos(screen.value); + "</p>"; screen.value = Math.cos(screen.value);}
function tan(){entrada.innerHTML = ""; consola.innerHTML+= "<p>tan(" + screen.value + ") = " + Math.tan(screen.value); + "</p>"; screen.value = Math.tan(screen.value);}
function pow(){entrada.innerHTML = ""; consola.innerHTML+= "<p>" + screen.value + "² = " + Math.pow(screen.value); + "</p>"; screen.value = Math.pow(screen.value, 2);}
function sqrt(){entrada.innerHTML = ""; consola.innerHTML+= "<p>√" + screen.value + " = " + Math.sqrt(screen.value); + "</p>"; screen.value = Math.sqrt(screen.value, 2);}
function log(){entrada.innerHTML = ""; consola.innerHTML+= "<p>log(" + screen.value + ") = " + Math.log(screen.value); + "</p>"; screen.value = Math.log(screen.value);}
function pi(){entrada.innerHTML = ""; consola.innerHTML+= "<p>π = 3.14159265359</p>"; screen.value = 3.14159265359;}
function e(){entrada.innerHTML = ""; consola.innerHTML+= "<p>e = 2.71828182846</p>"; screen.value = 2.71828182846;}
function fact() {
  var i, num, f;
  f = 1
  num = screen.value;
  for (i = 1; i <= num; i++) {f *= i;}
  i -= 1;
  screen.value = f;
}

function backspc() {
  screen.value = screen.value.substr(0, screen.value.length - 1);
  entrada.innerHTML = entrada.innerHTML.substr(0, entrada.innerHTML.length - 2)
}

function cons(){
  entrada.innerHTML += "= " + eval(screen.value);
  consola.innerHTML += "<p>" + entrada.innerHTML + "</p>";
  entrada.innerHTML = screen.value;
}

color_f.addEventListener('input', function() {
  botones.forEach(function(boton){boton.style.color = color_f.value;});
  config.forEach(function(cf){cf.style.color = color_f.value;});
  div_consola.forEach(function(cf){cf.style.color = color_f.value;});
  localStorage.setItem('dtb_f', color_f.value);
});

color_w.addEventListener('input', function() {
  botones.forEach(function(boton){boton.style.backgroundColor = color_w.value;});
  config.forEach(function(cf){cf.style.backgroundColor = color_w.value;});
  div_consola.forEach(function(cf){cf.style.backgroundColor = color_w.value;});
  localStorage.setItem('dtb_w', color_w.value);
});

color_bg.addEventListener('input', function() {
  body.forEach(function(b){b.style.backgroundColor = color_bg.value;});
  localStorage.setItem('dtb_bg', color_bg.value);
});


function show_n(){
  document.getElementById("div_nueva").style.visibility = "visible";
}
function hide_n(){
  document.getElementById("div_nueva").style.visibility = "hidden";
}

var notas = [];
var text_p = null;

function guardar_n() {
    var nombre = document.getElementById("name_nota");
    var color = document.getElementById("color_n");
    notas.push({ nombre: nombre.value, color: color.value, texto: "" });
    nombre.value = "";
    color.value = "#3d3d3d";
    hide_n();
    mostrarListaNotas();
    actualizarLocalStorage();
}

function mostrarListaNotas() {
    div_notas.innerHTML = "";
    for (var i = 0; i < notas.length; i++) {
        div_notas.innerHTML += "<button style='font-size:14px;background-color:" + notas[i].color + "' onclick='mostrarTexto(" + i + ")'>" + notas[i].nombre + "</button>";
    }
}

function mostrarTexto(id) {
    if (text_p !== null) {
        notas[text_p].texto = document.getElementById("notas").value;
        actualizarLocalStorage();  // Actualizar localStorage cuando cambia el texto
    }
    text_p = id;
    document.getElementById("label_n").style.backgroundColor = notas[text_p].color;
    document.getElementById("label_n").innerHTML = notas[text_p].nombre;
    document.getElementById("notas").value = notas[text_p].texto;
}

function actualizarLocalStorage() {
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Al cargar la página, recuperar las notas del localStorage
window.onload = function () {
    var notasGuardadas = localStorage.getItem('notas');
    if (notasGuardadas) {
        notas = JSON.parse(notasGuardadas);
        mostrarListaNotas();
    }
};

function borrar_n() {
    if (text_p !== null) {
        notas.splice(text_p, 1);
        actualizarLocalStorage();
        mostrarListaNotas();
        text_p = null;
        document.getElementById("label_n").style.backgroundColor = "#3d3d3d";
        document.getElementById("label_n").innerHTML = "Agrega una nota";
        document.getElementById("notas").value = "Agrega una nota";
    }
}
