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
    //console.log("-------------------------------");
    //console.log(valorVariable);
    //console.log("-------------------------------");
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

    //console.log(valorVariable);
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
      const entornoAnterior = this.EntornoActual;
      this.EntornoActual = new Entorno(entornoAnterior);

      console.log("-------Entro al bloque --------------------");
      node.dcls.forEach((dcl) => dcl.accept(this));
      console.log("-------Salgo al bloque --------------------");
      this.EntornoActual = entornoAnterior;
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
          tipo: "boolean",
          valor: termIzq.valor == termDer.valor,
        };
        return terminal;
      case "!=":
        let terminal2 = {
          tipo: "boolean",
          valor: termIzq.valor != termDer.valor,
        };
        return terminal2;
      case "<":
        let termina3 = {
          tipo: "boolean",
          valor: termIzq.valor < termDer.valor,
        };
        return termina3;
      case "<=":
        let terminal4 = {
          tipo: "boolean",
          valor: termIzq.valor <= termDer.valor,
        };
        return terminal4;
      case ">":
        let termina5 = {
          tipo: "boolean",
          valor: termIzq.valor > termDer.valor,
        };
        return termina5;
      case ">=":
        let terminal6 = {
          tipo: "boolean",
          valor: termIzq.valor >= termDer.valor,
        };
        return terminal6;
      case "&&":
        let termina7 = {
          tipo: "boolean",
          valor: termIzq.valor && termDer.valor,
        };
        return termina7;
      case "||":
        let terminal8 = {
          tipo: "boolean",
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
          tipo: termIzq.tipo,
          valor: termIzq.valor + termDer.valor,
        };
        return terminal;
      case "-":
        let terminal2 = {
          tipo: termIzq.tipo,
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
          tipo: termIzq.tipo,
          valor: termIzq.valor * termDer.valor,
        };
        return terminal;
      case "/":
        let terminal2 = {
          tipo: termIzq.tipo,
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
    console.log(node.id+ "referencia");
    //console.log(this.EntornoActual.valores);
    const objeto22= this.EntornoActual.getVariable(nombreVariable);
    //console.log(objeto22);
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
        const cond = node.cond.accept(this);

        if (cond.valor) {
          console.log("if-----------------------------------------%$");
            node.stmtIf.accept(this);
            return;
        }
        /*for(let a=0;a<node.stmtIfElse.length();a++){
          console.log("----- conjunto de else if-------");
          node.stmtIfElse.accept(this)

        }*/
       node.stmtIfElse.forEach(dcl => dcl.accept(this));

        if (node.stmtFalse) {
          console.log("-----------else -------------------");
            node.stmtFalse.accept(this);
        }
    //throw new Error('Metodo visitIf no implementado');
  }

  /**
   * @type {BaseVisitor['visitElseIfExp']}
   */
  visitElseIfExp(node) {
    console.log("else if");
    const cond = node.cond.accept(this);

    if (cond.valor) {
      node.stmtElseIf.accept(this);
      return;
      }
    //throw new Error('Metodo visitElseIfExp no implementado');
  }

   /**
   * @type {BaseVisitor['visitWhile']}
   */
   visitWhile(node) {
    const entornoConElQueEmpezo = this.EntornoActual;
    /*console.log("------------------aqui empieza el while-----------");
   
    console.log(node.cond.accept(this).valor +"-------------------condicion");

    console.log(node.stmt.accept(this));
    console.log(node.stmt.accept(this));
    console.log(node.stmt.accept(this));
    console.log(node.stmt.accept(this));

    console.log(node.cond.accept(this).valor+"-------------------condicion");
    console.log("------------------aqui termina el while-----------");

*/
        try {
            while (node.cond.accept(this).valor) {
                node.stmt.accept(this);
            }
            this.EntornoActual=entornoConElQueEmpezo;
        } catch (error) {
            this.EntornoActual = entornoConElQueEmpezo;

            if (error instanceof BreakException) {
                console.log('break');
                return
            }

            if (error instanceof ContinueException) {
                return this.visitWhile(node);
            }

            throw error;

        }
    //throw new Error('Metodo visitWhile no implementado');
  }

  /**
   * @type {BaseVisitor['visitFor']}
   */
  visitFor(node) {

    

    //throw new Error('Metodo visitFor no implementado');
  }

  /**
   * @type {BaseVisitor['visitBreak']}
   */
  visitBreak(node) {
    throw new BreakException();
    //throw new Error('Metodo visitBreak no implementado');
}


/**
   * @type {BaseVisitor['visitContinue']}
   */
visitContinue(node) {
    if (this.prevContinue) {
        this.prevContinue.accept(this);
    }

    throw new ContinueException();
    //throw new Error('Metodo visitContinue no implementado');
}


/**
   * @type {BaseVisitor['visitReturn']}
   */
visitReturn(node) {
    let valor = null
        if (node.exp) {
            valor = node.exp.accept(this);
        }
        throw new ReturnException(valor);

    //throw new Error('Metodo visitReturn no implementado');
}
}
