import { Casino } from "./clases/Casino";
import { RuletaClasica } from "./clases/RuletaClasica";
import { RuletaPotenciada } from "./clases/RuletaPotenciada";
import { TragamonedaClasico } from "./clases/TragamonedaClasico";
import { Usuario } from "./clases/Usuario";

const casino = new Casino("Casino", 123, "Olavarria");
const ruletaClasica = new RuletaClasica("Ruleta clasica", 1, 30);
const user = new Usuario("Alberto", 400);
const ruletaPotenciada = new RuletaPotenciada("Ruleta Potenciada", 1, 30);
const tragamonedaClasico = new TragamonedaClasico("Tragamoneda Clasico", 1, 20)

casino.crearJuego(ruletaClasica);

user.verDinero();
/* ruletaClasica.iniciarTirada(user, 10);
ruletaClasica.mostrarResultado(); /

/ ruletaPotenciada.iniciarTirada(user, 5);
ruletaPotenciada.mostrarResultado(); */
tragamonedaClasico.iniciarTirada(user, 5)
tragamonedaClasico.mostrarResultado()
user.verDinero()