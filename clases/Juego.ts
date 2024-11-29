import { Usuario } from "./Usuario";

export abstract class Juego {
    protected nombre: string;
    protected apuestaMinima: number;
    protected apuestaMaxima: number;

    constructor(nombre: string, apuestaMinima: number, apuestaMaxima: number) {
        this.nombre = nombre;
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
    }

    abstract iniciarTirada(usuario: Usuario, apuesta: number): void;
    abstract mostrarResultado(): void;

    // Getters
    getNombre(): string {
        return this.nombre;
    }

    getApuestaMinima(): number {
        return this.apuestaMinima;
    }

    getApuestaMaxima(): number {
        return this.apuestaMaxima;
    }

    // Setters
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    setApuestaMinima(apuestaMinima: number): void {
        this.apuestaMinima = apuestaMinima;
    }

    setApuestaMaxima(apuestaMaxima: number): void {
        this.apuestaMaxima = apuestaMaxima;
    }
}