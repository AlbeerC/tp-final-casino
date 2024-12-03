import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";

export class TragamonedaClasico extends Tragamoneda {
    private simbolos: string[] = ["🍒", "🍋", "🍊", "🍇", "⭐", "🔔"];
    private resultado: string[] = [];
    private mensajeResultado: string = '';

    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima)
    }

    iniciarTirada(usuario: Usuario, apuesta: number): void {
        if (apuesta < this.apuestaMinima || apuesta > this.apuestaMaxima) {
            this.mensajeResultado = `La apuesta debe estar entre ${this.apuestaMinima} y ${this.apuestaMaxima}.`;
            return;
        }

        if (usuario.getDineroActual() < apuesta) {
            this.mensajeResultado = "No cuentas con suficiente dinero";
            return;
        }

        usuario.ajustarDinero(-apuesta)

        this.calcularGanancia(usuario, apuesta)
    }


    calcularGanancia(usuario: Usuario, apuesta: number): void {

        for (let i = 0; i < 3; i++) {
            const indice = Math.floor(Math.random() * this.simbolos.length);
            this.resultado.push(this.simbolos[indice]);
        }

        console.log(`${this.resultado.join(" | ")}`);

        // Si coinciden los tres símbolos
        if (this.resultado[0] === this.resultado[1] && this.resultado[1] === this.resultado[2]) {
            const ganancia = apuesta * 10;
            usuario.ajustarDinero(ganancia);
            this.mensajeResultado = `Felicidades! Los tres símbolos fueron iguales. Ganaste $${ganancia} pesos`;
            // Si coinciden dos símbolos
        } else if (this.resultado[0] === this.resultado[1] || this.resultado[1] === this.resultado[2] || this.resultado[0] === this.resultado[2]) {
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