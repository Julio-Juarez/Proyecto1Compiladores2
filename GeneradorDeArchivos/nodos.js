
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class Numero extends Expresion {

    /**
    * @param {Object} options
    * @param {number} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de variable
 * @param {String} options.id Nombre de identificador 
 * @param {Expresion} options.exp Valor de la variable
    */
    constructor({ tipo, id, exp }) {
        super();
        
        /**
         * Tipo de variable
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Nombre de identificador 
         * @type {String}
        */
        this.id = id;


        /**
         * Valor de la variable
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class DeclaracionVariableSinValor extends Expresion {

    /**
    * @param {Object} options
    * @param {String} options.tipo tipo de la variable
 * @param {string} options.id identificador de variable
    */
    constructor({ tipo, id }) {
        super();
        
        /**
         * tipo de la variable
         * @type {String}
        */
        this.tipo = tipo;


        /**
         * identificador de variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariableSinValor(this);
    }
}
    
export class AsignacionValor extends Expresion {

    /**
    * @param {Object} options
    * @param {String} options.id Nombre de identificador
 * @param {Expresion} options.asig Valor nuevo a la variable
    */
    constructor({ id, asig }) {
        super();
        
        /**
         * Nombre de identificador
         * @type {String}
        */
        this.id = id;


        /**
         * Valor nuevo a la variable
         * @type {Expresion}
        */
        this.asig = asig;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionValor(this);
    }
}
    
export default { Expresion, Numero, DeclaracionVariable, DeclaracionVariableSinValor, AsignacionValor }
