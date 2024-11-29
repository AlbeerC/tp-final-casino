import { Juego } from "./Juego";
import { Usuario } from "./Usuario";

export abstract class Ruleta extends Juego {
    protected numeros: number[];

    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        super(nombre, apuestaMinima, apuestaMaxima);
        this.numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    }

    abstract mostrarResultado(): void;
    abstract iniciarTirada(usuario: Usuario, apuesta: number): void;
}