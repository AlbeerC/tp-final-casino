export class Usuario {
    private nombre: string;
    private dineroInicial: number;
    public dineroActual: number;

    constructor(nombre: string, dineroInicial: number) {
        this.nombre = nombre;
        this.dineroInicial = dineroInicial;
        this.dineroActual = dineroInicial;
    }

    depositarDinero(cantidad: number) {
        this.dineroActual += cantidad;
        console.log(`Depositado ${cantidad} a tu cuenta.`);
    }

    retirarDinero(cantidad: number) {
        if (cantidad < this.dineroActual) {
            console.log(`Retirado ${cantidad} de tu cuenta.`);
        } else {
            console.log("No cuentas con suficiente dinero");
        }
    }

    ajustarDinero(cantidad: number) {
        this.dineroActual += cantidad;
    }

    verDinero(): void {
        console.log(this.dineroActual)
    }

    // Getters
    getNombre(): string {
        return this.nombre;
    }

    getDineroActual(): number {
        return this.dineroActual;
    }
}