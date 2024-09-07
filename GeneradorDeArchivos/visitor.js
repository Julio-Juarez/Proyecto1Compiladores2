
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').Numero} Numero


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').DeclaracionVariableSinValor} DeclaracionVariableSinValor


 * @typedef {import('./nodos').AsignacionValor} AsignacionValor

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {DeclaracionVariableSinValor} node
     * @returns {any}
     */
    visitDeclaracionVariableSinValor(node) {
        throw new Error('Metodo visitDeclaracionVariableSinValor no implementado');
    }
    

    /**
     * @param {AsignacionValor} node
     * @returns {any}
     */
    visitAsignacionValor(node) {
        throw new Error('Metodo visitAsignacionValor no implementado');
    }
    
}
