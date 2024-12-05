"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Menu_1 = require("./clases/Menu");
/* const casino = new Casino("Casino", 123, "Olavarria");
const user = new Usuario("Alberto", 1000);
const ruletaClasica = new RuletaClasica("Ruleta clasica", 1, 30);
const ruletaPotenciada = new RuletaPotenciada("Ruleta Potenciada", 1, 30);
const tragamonedaClasico = new TragamonedaClasico("Tragamoneda Clasico", 1, 20);
const tragamonedaMatriz = new TragamonedaMatriz("Tragamoneda 3x3", 1, 200)

casino.crearJuego(ruletaClasica); */
// Dinero antes de la prueba
// user.verDinero();
/* Prueba Ruleta Clásica */
// ruletaClasica.iniciarTirada(user, 10);
// ruletaClasica.mostrarResultado();
/* Prueba Ruleta Potenciada */
// ruletaPotenciada.iniciarTirada(user, 5);
// ruletaPotenciada.mostrarResultado();
/* Prueba Tragamoneda Clásico */
/* tragamonedaClasico.iniciarTirada(user, 100);
tragamonedaClasico.mostrarResultado(); */
/* Prueba Tragamoneda 3x3 */
// tragamonedaMatriz.iniciarTirada(user, 100);
// tragamonedaMatriz.mostrarResultado();
// Dinero después de la prueba
// user.verDinero()
var menu = new Menu_1.Menu;
menu.mostrarMenu();
