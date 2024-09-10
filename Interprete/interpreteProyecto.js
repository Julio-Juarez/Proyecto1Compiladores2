import { Entorno } from "./entorno.js";
import { BaseVisitor } from "../GeneradorDeArchivos/visitor.js";

export class InterpreterVisitorProyecto extends BaseVisitor {
  constructor() {
    super();
    this.EntornoActual = new Entorno();
    this.SalidaInterprete = "";
  }

  Interpretar(nodo) {
    return nodo.accept(this);
  }

  // int float boolean char
  /**
   * @type {BaseVisitor['visitTerminalesExp']}
   */
  visitTerminalesExp(node) {
    const terminal = {
      tipo: node.tipo,
      valor: node.valor,
    };
    //this.SalidaInterprete+=terminal
    return terminal;
    //throw new Error('Metodo visitTerminalesExp no implementado');
  }
  //Cadena o String
  /**
   * @type {BaseVisitor['visitTerminalesExpCadena']}
   */
  visitTerminalesExpCadena(node) {
    let cadena = "";
    const caracteres = node.valor;
    for (let char of caracteres) {
      console.log(char);
      cadena = cadena + char;
    }
    const terminal = {
      tipo: node.tipo,
      valor: cadena,
    };
    return terminal;
    //throw new Error('Metodo visitTerminalesExpCadena no implementado');
  }

  /**
   * @type {BaseVisitor['visitDeclaracionVariable']}
   */
  visitDeclaracionVariable(node) {
    console.log(
        "esta entrando a declarar"
    );
    const tipovariable = node.tipo;
    const nombreVariable = node.id;
    const valorVariable = node.exp.accept(this);
    console.log(valorVariable);
    const fila = node.location.start.line;
    const columna = node.location.start.column;

    
      this.EntornoActual.setVariable(
        tipovariable,
        nombreVariable,
        valorVariable.valor,
        fila,
        columna
      );
    

    //throw new Error('Metodo visitDeclaracionVariable no implementado');
  }

  /**
   * @type {BaseVisitor['visitDeclaracionVariableSinValor']}
   */
  visitDeclaracionVariableSinValor(node) {
    const tipovariable = node.tipo;
    const nombreVariable = node.id;
    const fila = node.location.start.line;
    const columna = node.location.start.column;
    this.EntornoActual.setVariable(
      tipovariable,
      nombreVariable,
      null,
      fila,
      columna
    );

    //throw new Error('Metodo visitDeclaracionVariableSinValor no implementado');
  }

  /**
   * @type {BaseVisitor['visitAsignacionValor']}
   */
  visitAsignacionValor(node) {
    const nombreVariable = node.id;
    const valorVariable = node.asig.accept(this);

    this.EntornoActual.asignacionVariable(nombreVariable, valorVariable);

    return valorVariable;

    //throw new Error('Metodo visitAsignacionValor no implementado');
  }

  /**
   * @type {BaseVisitor['visitPrint']}
   */
  visitPrint(node) {
    const Objeto = node.exp.accept(this);
    
    this.SalidaInterprete += Objeto.valor + "\n";

    //throw new Error('Metodo visitPrint no implementado');
  }

  /**
   * @type {BaseVisitor['visitExpresionSentencia']}
   */
  visitExpresionSentencia(node) {
    node.exp.accept(this);
    //throw new Error('Metodo visitExpresionSentencia no implementado');
  }

  /**
   * @type {BaseVisitor['visitBloque']}
   */
  visitBloque(node) {
    //throw new Error('Metodo visitBloque no implementado');
  }

  /**
   * @type {BaseVisitor['visitNumero']}
   */
  visitOperacionLogica(node) {
    const izq = node.izq.accept(this);
    const termIzq = {
      tipo: izq.tipo,
      valor: izq.valor,
    };
    const der = node.der.accept(this);
    const termDer = {
      tipo: der.tipo,
      valor: der.valor,
    };

    switch (node.op) {
      case "==":
        let terminal = {
          tipo: termIzq.valor,
          valor: termIzq.valor == termDer.valor,
        };
        return terminal;
      case "!=":
        let terminal2 = {
          tipo: termIzq.valor,
          valor: termIzq.valor != termDer.valor,
        };
        return terminal2;
      case "<":
        let termina3 = {
          tipo: termIzq.valor,
          valor: termIzq.valor < termDer.valor,
        };
        return termina3;
      case "<=":
        let terminal4 = {
          tipo: termIzq.valor,
          valor: termIzq.valor <= termDer.valor,
        };
        return terminal4;
      case ">":
        let termina5 = {
          tipo: termIzq.valor,
          valor: termIzq.valor > termDer.valor,
        };
        return termina5;
      case ">=":
        let terminal6 = {
          tipo: termIzq.valor,
          valor: termIzq.valor >= termDer.valor,
        };
        return terminal6;
      case "&&":
        let termina7 = {
          tipo: termIzq.valor,
          valor: termIzq.valor && termDer.valor,
        };
        return termina7;
      case "||":
        let terminal8 = {
          tipo: termIzq.valor,
          valor: termIzq.valor || termDer.valor,
        };
        return terminal8;
      default:
        throw new Error(`Operador no soportado: ${node.op}`);
    }
    //throw new Error('Metodo visitOperacionLogica no implementado');
  }

  /**
   * @type {BaseVisitor['visitSumaYResta']}
   */
  visitSumaYResta(node) {
    const izq = node.izq.accept(this);
    const termIzq = {
      tipo: izq.tipo,
      valor: izq.valor,
    };
    const der = node.der.accept(this);
    const termDer = {
      tipo: der.tipo,
      valor: der.valor,
    };

    switch (node.op) {
      case "+":
        let terminal = {
          tipo: termIzq.valor,
          valor: termIzq.valor + termDer.valor,
        };
        return terminal;
      case "-":
        let terminal2 = {
          tipo: termIzq.valor,
          valor: termIzq.valor - termDer.valor,
        };
        return terminal2;
      default:
        throw new Error(`Operador no soportado: ${node.op}`);
    }
    //throw new Error('Metodo visitSumaYResta no implementado');
  }

  /**
   * @type {BaseVisitor['visitMultiplicacionYDivision']}
   */
  visitMultiplicacionYDivision(node) {
    const izq = node.izq.accept(this);
    const termIzq = {
      tipo: izq.tipo,
      valor: izq.valor,
    };
    const der = node.der.accept(this);
    const termDer = {
      tipo: der.tipo,
      valor: der.valor,
    };

    switch (node.op) {
      case "*":
        let terminal = {
          tipo: termIzq.valor,
          valor: termIzq.valor * termDer.valor,
        };
        return terminal;
      case "/":
        let terminal2 = {
          tipo: termIzq.valor,
          valor: termIzq.valor / termDer.valor,
        };
        return terminal2;
      default:
        throw new Error(`Operador no soportado: ${node.op}`);
    }
    //throw new Error('Metodo visitMultiplicacionYDivision no implementado');
  }

  /**
   * @type {BaseVisitor['visitOperacionUnaria']}
   */
  visitOperacionUnaria(node) {
    const exp = node.exp.accept(this);
    const tipo = exp.tipo;
    const valor = exp.valor;

    switch (node.op) {
      case "-":
        let terminal = {
          tipo: tipo,
          valor: -valor,
        };
        return terminal;
      default:
        throw new Error(`Operador no soportado: ${node.op}`);
    }
    //throw new Error('Metodo visitOperacionUnaria no implementado');
  }

  /**
   * @type {BaseVisitor['visitAgrupacion']}
   */
  visitAgrupacion(node) {
    return node.exp.accept(this);
    //throw new Error('Metodo visitAgrupacion no implementado');
  }

  /**
   * @type {BaseVisitor['visitReferenciaVariable']}
   */
  visitReferenciaVariable(node) {
    //retorna el valor de una variable por su id
    const nombreVariable = node.id;
    console.log(node.id);
    console.log(this.EntornoActual.valores);
    const objeto22= this.EntornoActual.getVariable(nombreVariable);
    console.log(objeto22);
    return {tipo:objeto22.tipo,valor:objeto22.valor}

    //throw new Error('Metodo visitReferenciaVariable no implementado');
  }

  /**
   * @type {BaseVisitor['visitModIgualacion']}
   */
  visitModIgualacion(node) {
    //throw new Error('Metodo visitModIgualacion no implementado');
  }

  /**
   * @type {BaseVisitor['visitNegacion']}
   */
  visitNegacion(node) {
    //throw new Error('Metodo visitNegacion no implementado');
  }

  /**
   * @type {BaseVisitor['visitIf']}
   */
  visitIf(node) {
    //throw new Error('Metodo visitIf no implementado');
  }

  /**
   * @type {BaseVisitor['visitElseIfExp']}
   */
  visitElseIfExp(node) {
    //throw new Error('Metodo visitElseIfExp no implementado');
  }

  visitWhile(node) {
    //throw new Error('Metodo visitWhile no implementado');
  }

  visitFor(node) {
    //throw new Error('Metodo visitFor no implementado');
  }
}
