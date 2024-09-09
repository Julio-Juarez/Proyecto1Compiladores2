
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').TerminalesExp} TerminalesExp


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').DeclaracionVariableSinValor} DeclaracionVariableSinValor


 * @typedef {import('./nodos').AsignacionValor} AsignacionValor


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').ExpresionSentencia} ExpresionSentencia


 * @typedef {import('./nodos').Bloque} Bloque


 * @typedef {import('./nodos').OperacionLogica} OperacionLogica


 * @typedef {import('./nodos').SumaYResta} SumaYResta


 * @typedef {import('./nodos').MultiplicacionYDivision} MultiplicacionYDivision


 * @typedef {import('./nodos').OperacionUnaria} OperacionUnaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos').TerminalesExpCadena} TerminalesExpCadena


 * @typedef {import('./nodos').ModIgualacion} ModIgualacion


 * @typedef {import('./nodos').Negacion} Negacion

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
     * @param {TerminalesExp} node
     * @returns {any}
     */
    visitTerminalesExp(node) {
        throw new Error('Metodo visitTerminalesExp no implementado');
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
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionSentencia} node
     * @returns {any}
     */
    visitExpresionSentencia(node) {
        throw new Error('Metodo visitExpresionSentencia no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {OperacionLogica} node
     * @returns {any}
     */
    visitOperacionLogica(node) {
        throw new Error('Metodo visitOperacionLogica no implementado');
    }
    

    /**
     * @param {SumaYResta} node
     * @returns {any}
     */
    visitSumaYResta(node) {
        throw new Error('Metodo visitSumaYResta no implementado');
    }
    

    /**
     * @param {MultiplicacionYDivision} node
     * @returns {any}
     */
    visitMultiplicacionYDivision(node) {
        throw new Error('Metodo visitMultiplicacionYDivision no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {TerminalesExpCadena} node
     * @returns {any}
     */
    visitTerminalesExpCadena(node) {
        throw new Error('Metodo visitTerminalesExpCadena no implementado');
    }
    

    /**
     * @param {ModIgualacion} node
     * @returns {any}
     */
    visitModIgualacion(node) {
        throw new Error('Metodo visitModIgualacion no implementado');
    }
    

    /**
     * @param {Negacion} node
     * @returns {any}
     */
    visitNegacion(node) {
        throw new Error('Metodo visitNegacion no implementado');
    }
    
}
