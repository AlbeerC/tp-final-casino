import { Juego } from "./Juego";
import { Usuario } from "./Usuario";
import { Tragamoneda } from "./Tragamoneda";

export class TragamonedaMatriz extends Tragamoneda {
    private filas: number = 3;
    private columnas: number = 3;
    private mensajeResultado: string = '';
    private matriz: number[][] = [];
    private simbolos: string[] = ["🍀", "💎", "🚀", "🔥", "🎲", "👑"];

    constructor (nombre:string, apuestaMinima: number, apuestaMaxima:number){
        super(nombre, apuestaMinima, apuestaMaxima);
    }

    // Crear la matriz y llenarla con números aleatorios
    llenarMatriz(): void {
        this.matriz = Array.from({ length: this.filas }, () =>
            Array.from({ length: this.columnas }, () => Math.floor(Math.random() * this.simbolos.length))
        );
    }

    // Mostrar los símbolos del resultado
    mostrarMatriz(): void {
        this.matriz.forEach(fila => {
            console.log(fila.map(index => this.simbolos[index]).join(" | "));
        })
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

        usuario.ajustarDinero(-apuesta);

        this.llenarMatriz();
        this.mostrarMatriz();
        usuario.ajustarDinero(this.calcularGanancia(usuario, apuesta));
        this.mensajeResultado = `Ganancia total: $${this.calcularGanancia(usuario, apuesta)} pesos`;
    }

    calcularGanancia(usuario: Usuario, apuesta: number): number {
        let gananciaTotal = 0;

        // Premios para cada símbolo
        const premios: { [simbolo: string]: number } = {
            "🍀": (2 * apuesta),
            "💎": (4 * apuesta),
            "🚀": (6 * apuesta),
            "🔥": (8 * apuesta),
            "🎲": (10 * apuesta), 
            "👑": (20 * apuesta)
        };
    
        // Evaluar filas horizontales
        for (let i = 0; i < 3; i++) {
            const simbolo1 = this.simbolos[this.matriz[i][0]];
            const simbolo2 = this.simbolos[this.matriz[i][1]];
            const simbolo3 = this.simbolos[this.matriz[i][2]];

            if (simbolo1 === simbolo2 && simbolo2 === simbolo3) {
                gananciaTotal += premios[simbolo1];
            }
        }

        // Diagonal principal (arriba izquierda -> abajo derecha)
        const simbolo1 = this.simbolos[this.matriz[0][0]];
        const simbolo2 = this.simbolos[this.matriz[1][1]];
        const simbolo3 = this.simbolos[this.matriz[2][2]];

        if (simbolo1 === simbolo2 && simbolo2 === simbolo3) {
            gananciaTotal += premios[simbolo1];
        }

        // Diagonal secundaria (arriba derecha -> abajo izquierda)
        const simbolo4 = this.simbolos[this.matriz[0][2]];
        const simbolo5 = this.simbolos[this.matriz[1][1]];
        const simbolo6 = this.simbolos[this.matriz[2][0]];

        if (simbolo4 === simbolo5 && simbolo5 === simbolo6) {
            gananciaTotal += premios[simbolo4];
        }
    
        return gananciaTotal;
    }

    mostrarResultado(): void {
        if (this.mensajeResultado) {
            console.log(this.mensajeResultado);
        } else {
            console.log("No hay resultado para mostrar aún");
        }
    }
}