"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Casino_1 = require("./clases/Casino");
var ruletaClasica_1 = require("./clases/ruletaClasica");
var RuletaPotenciada_1 = require("./clases/RuletaPotenciada");
var TragamonedaClasico_1 = require("./clases/TragamonedaClasico");
var TragamonedasMatriz_1 = require("./clases/TragamonedasMatriz");
var Usuario_1 = require("./clases/Usuario");
var casino = new Casino_1.Casino("Casino", 123, "Olavarria");
var ruletaClasica = new ruletaClasica_1.RuletaClasica("Ruleta clasica", 1, 30);
var user = new Usuario_1.Usuario("Alberto", 1000);
var ruletaPotenciada = new RuletaPotenciada_1.RuletaPotenciada("Ruleta Potenciada", 1, 30);
var tragamonedaClasico = new TragamonedaClasico_1.TragamonedaClasico("Tragamoneda Clasico", 1, 20);
var tragamonedaMatriz = new TragamonedasMatriz_1.TragamonedaMatriz("Tragamoneda 3x3", 1, 200);
casino.crearJuego(ruletaClasica);
user.verDinero();
/* ruletaClasica.iniciarTirada(user, 10);
ruletaClasica.mostrarResultado(); /

/ ruletaPotenciada.iniciarTirada(user, 5);
ruletaPotenciada.mostrarResultado(); /
/ tragamonedaClasico.iniciarTirada(user, 5)
tragamonedaClasico.mostrarResultado() */
for (var i = 0; i < 1; i++) {
    tragamonedaMatriz.iniciarTirada(user, 100);
    tragamonedaMatriz.mostrarResultado();
}
user.verDinero();
