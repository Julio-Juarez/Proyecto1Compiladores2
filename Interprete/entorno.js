

export class Entorno {

    /**
     * @param {Entorno} padre
     */
    constructor(padre=undefined) {
        this.valores = {};
        this.padre=padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(nombre, valor) {
        //si algo ya esta declarado lanzar error
        this.valores[nombre] = valor;
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const valorActual=this.valores[nombre];
        if (valorActual != undefined) {
            return valorActual
            
        }
        if (!valorActual && this.padre) {
            return this.padre.getVariable(nombre);
        }
        return this.valores[nombre];
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    asignacionVariable(nombre, valor) {
        /*if (!this.valores[nombre]) {
            throw new Error(`Variable ${nombre} no definida`);
        }*/

        const valorActual=this.valores[nombre];

        if(valorActual != undefined){
            this.valores[nombre]=valor;
        }
        if (!valorActual && this.padre) {
            this.padre.asignacionVariable(nombre,valor);
            return;
        }
        
        throw new Error(`Variable ${nombre} no definida`);
    }
}