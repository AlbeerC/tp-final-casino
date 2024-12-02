"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Casino_1 = require("./clases/Casino");
var RuletaClasica_1 = require("./clases/RuletaClasica");
var RuletaPotenciada_1 = require("./clases/RuletaPotenciada");
var Usuario_1 = require("./clases/Usuario");
var casino = new Casino_1.Casino("Casino", 123, "Olavarria");
var ruletaClasica = new RuletaClasica_1.RuletaClasica("Ruleta clasica", 1, 30);
var user = new Usuario_1.Usuario("Alberto", 400);
var ruletaPotenciada = new RuletaPotenciada_1.RuletaPotenciada("Ruleta Potenciada", 1, 30);
casino.crearJuego(ruletaClasica);
user.verDinero();
/* ruletaClasica.iniciarTirada(user, 10);
ruletaClasica.mostrarResultado(); */
user.verDinero();
ruletaPotenciada.iniciarTirada(user, 5);
ruletaPotenciada.mostrarResultado();
