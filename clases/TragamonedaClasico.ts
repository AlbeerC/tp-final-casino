import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";
import { Reglas } from "../interfaces/Reglas";

export class TragamonedaClasico extends Tragamoneda implements Reglas {
    private resultadoSimbolos: string[] = [];

    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
        this.simbolos = ["🍒", "🍋", "🍊", "🍇", "⭐", "🔔"];
    }

    mostrarReglas(): void {
        console.log(`${this.nombre}
            -La apuesta debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}
            -En cada tirada, salen tres símbolos:
                -Si coinciden los tres, ganas tu apuesta multiplicado por 10
                -Si coinciden dos, recuperas tu apuesta
                -Si no coincide ninguno, pierdes tu apuesta
            `);
    }

    iniciarTirada(usuario: Usuario, apuesta: number): void {
        this.resultadoSimbolos = [];
        this.validarApuesta(usuario, apuesta);
        usuario.ajustarDinero(-apuesta);
        this.calcularGanancia(usuario, apuesta);
        this.mostrarResultado()
    }


    calcularGanancia(usuario: Usuario, apuesta: number): void {
        for (let i = 0; i < 3; i++) {
            const indice = Math.floor(Math.random() * this.simbolos.length);
            this.resultadoSimbolos.push(this.simbolos[indice]);
        }

        console.log(`${this.resultadoSimbolos.join(" | ")}`);

        // Si coinciden los tres símbolos
        if (this.resultadoSimbolos[0] === this.resultadoSimbolos[1] && this.resultadoSimbolos[1] === this.resultadoSimbolos[2]) {
            const ganancia = apuesta * 10;
            usuario.ajustarDinero(ganancia);
            this.mensajeResultado = `Felicidades! Los tres símbolos fueron iguales. Ganaste $${ganancia} pesos`;
            // Si coinciden dos símbolos
        } else if (this.resultadoSimbolos[0] === this.resultadoSimbolos[1] || this.resultadoSimbolos[1] === this.resultadoSimbolos[2] || this.resultadoSimbolos[0] === this.resultadoSimbolos[2]) {
            usuario.ajustarDinero(apuesta);
            this.mensajeResultado = `Coincideron dos símbolos. Recuperas la apuesta`;
            // Si no coincide ninguno
        } else {
            this.mensajeResultado = `Los tres símbolos fueron distintos. Pierdes $${apuesta} pesos`;
        }
    }

    mostrarResultado(): void {
        if (this.mensajeResultado) {
            console.log(this.mensajeResultado);
        } else {
            console.log("No hay resultado para mostrar aún");
        }
    }
}