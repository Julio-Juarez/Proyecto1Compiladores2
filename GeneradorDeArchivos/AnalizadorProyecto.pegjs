{
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      'numero': nodos.Numero,
      'DeclaracionVariable':nodos.DeclaracionVariable,
      'DeclaracionVariableSinValor': nodos.DeclaracionVariableSinValor,
      'AsignacionValor': nodos.AsignacionValor,
      'Print':nodos.Print,
      'ExpresionSentencia':nodos.ExpresionSentencia,
      'Bloque':nodos.Bloque,
      'OperacionLogica':nodos.OperacionLogica,
      'SumaYResta': nodos.SumaYResta,
      'MultiplicacionYDivision':nodos.MultiplicacionYDivision,
      'Unaria':nodos.Unaria,
      'Agrupacion':nodos.Agrupacion,
      'ReferenciaVariable':nodos.ReferenciaVariable
      


    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}
Programa = _ dcl:Declaracion* _ { return dcl}

Declaracion = dcl:DeclaracionVariable _ {return dcl}
            / stmt:Sentencia _ { return stmt}

DeclaracionVariable = tipo:Tipo _ id:Identificador _ "=" _ exp:Expresion _ ";" {return crearNodo('DeclaracionVariable',{tipo,id,exp})}//--
/ tipo:Tipo _ id:Identificador _ ";" {return crearNodo('DeclaracionVariableSinValor',{tipo,id})}//--

Sentencia = "System.out.println" _ "(" _ exp:Expresion _ expansion:(_"," extra:Expresion _ {return {Expresion:extra}} )* ")" _ ";" { return crearNodo('Print',{exp,expansion})}//--
/ exp:Expresion _ ";" { return crearNodo('ExpresionSentencia',{exp})}//--
/"{" _ dcls:Declaracion* _ "}" { return crearNodo('Bloque', {dcls})}//--
//"if" _ "(" _ cond:Expresion _ ")" _ stmtIf:Sentencia stmtIfElse:( _ "else"_"if" _ stmtIfElse:Sentencia _ {return stmtElse})?  stmtElse:( _ "else" _ stmtElse:Sentencia _ {return stmtElse})? {return crearNodo('If',{cond,stmtIf,stmtIfElse,stmtElse})} 

Expresion = Asignacion

Asignacion = id:Identificador _ "=" _ asig:Asignacion { return crearNodo('AsignacionValor',{id,asig})}//--
        /Comparacion

Comparacion = izq:Suma expansion:(
    _ op:("<=") _ der:Suma { return { tipo: op, der}}
)* {
    return expansion.reduce(
        (operacionAnterior,operacionActual)=>{
            const {tipo, der} = operacionActual
            return crearNodo('OperacionLogica', {op: tipo, izq:operacionAnterior,der})//--
        },
        izq
    )
}

Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('SumaYResta', { op:tipo, izq: operacionAnterior, der })//--
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('MultiplicacionYDivision', { op:tipo, izq: operacionAnterior, der })//--
      },
      izq
    )
}

Unaria = "-" _ num:Numero { return crearNodo('Unaria', { op: '-', exp: num }) }//--
/ Numero

Numero = [0-9]+( "." [0-9]+ )? {return crearNodo('numero', { valor: parseFloat(text(), 10) })}//--
  / "(" _ exp:Expresion _ ")" { return crearNodo('Agrupacion', { exp }) }//
  / id:Identificador { return crearNodo('ReferenciaVariable', { id }) }//
  




Identificador = [a-zA-Z][a-zA-Z0-9]* { return text() }

Tipo=
    "int" { return "int"; }
  / "float" { return "float"; }
  / "string" { return "string"; }
  / "boolean" { return "boolean"; }
  / "char" { return "char"; }

_ = ([ \t\n\r] / Comentarios)*
Comentarios = "//" (![\n].)*  { return ""}
             / "/*" (!("*/").)* "*/" { return ""}