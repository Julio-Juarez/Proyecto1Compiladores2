
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
    
export class TerminalesExp extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Valor del numero
 * @param {number} options.valor Valor del numero
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {string}
        */
        this.tipo = tipo;


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
        return visitor.visitTerminalesExp(this);
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
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion principal a imprimir
 * @param {Expresion[]} options.expansion Arreglo de expresiones a imprimir
    */
    constructor({ exp, expansion }) {
        super();
        
        /**
         * Expresion principal a imprimir
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Arreglo de expresiones a imprimir
         * @type {Expresion[]}
        */
        this.expansion = expansion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class ExpresionSentencia extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionSentencia(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.dcls Expresion a evaluar
    */
    constructor({ dcls }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion[]}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class OperacionLogica extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionLogica(this);
    }
}
    
export class SumaYResta extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSumaYResta(this);
    }
}
    
export class MultiplicacionYDivision extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion multiplicacion o division
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion multiplicacion o division
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitMultiplicacionYDivision(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion
 * @param {string} options.op Operador de la operacion Unaria
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de la operacion Unaria
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada dentro parentisis
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada dentro parentisis
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class TerminalesExpCadena extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo tipo de cadena
 * @param {char[]} options.valor Arreglo de cadena
    */
    constructor({ tipo, valor }) {
        super();
        
        /**
         * tipo de cadena
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Arreglo de cadena
         * @type {char[]}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTerminalesExpCadena(this);
    }
}
    
export class ModIgualacion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id nombre de la variable
 * @param {string} options.op Operador de la operacion Modificacion Incre y Decre
 * @param {Expresion} options.sum Expresion de nuevo valor
    */
    constructor({ id, op, sum }) {
        super();
        
        /**
         * nombre de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Operador de la operacion Modificacion Incre y Decre
         * @type {string}
        */
        this.op = op;


        /**
         * Expresion de nuevo valor
         * @type {Expresion}
        */
        this.sum = sum;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitModIgualacion(this);
    }
}
    
export class Negacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion Logica
 * @param {string} options.op Operador de Negacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion Logica
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de Negacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNegacion(this);
    }
}
    
export default { Expresion, TerminalesExp, DeclaracionVariable, DeclaracionVariableSinValor, AsignacionValor, Print, ExpresionSentencia, Bloque, OperacionLogica, SumaYResta, MultiplicacionYDivision, OperacionUnaria, Agrupacion, ReferenciaVariable, TerminalesExpCadena, ModIgualacion, Negacion }
