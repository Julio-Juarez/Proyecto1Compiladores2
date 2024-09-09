{
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      'TerminalesExp': nodos.TerminalesExp,
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
      'ReferenciaVariable':nodos.ReferenciaVariable,
      'TerminalesExpCadena':nodos.TerminalesExpCadena,
      'ModIgualacion':nodos.ModIgualacion,
      'Negacion':nodos.Negacion,
      'If':nodos.If,
      'ElseIfExp': nodos.ElseIfExp,
      'While':nodos.While,
      'For':nodos.For
      





      


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
/ "{" _ dcls:Declaracion* _ "}" { return crearNodo('Bloque', {dcls})}//--
/ "if" _ "(" _ cond:Expresion _ ")" _ stmtIf:Sentencia _ stmtIfElse:ElseIf*  _ stmtElse:( _ "else" _ stmtElse:Sentencia _ {return stmtElse})? {return crearNodo('If',{cond,stmtIf,stmtIfElse,stmtElse})} 
/ "while" _ "(" _ cond:Expresion _ ")" _ stmt:Sentencia {return crearNodo('While',{cond,stmt})}
/ "for" _ "(" _ init:ForInit _ cond:Expresion _ ";" _ inc:Expresion _ ")" _ stmt:Sentencia {
      return crearNodo('For', { init, cond, inc, stmt })
    }

ForInit = dcl:DeclaracionVariable { return dcl }
        / exp:Expresion _ ";" { return exp }
        / ";" { return null }

ElseIf= _ "else"_"if" _"(" cond:Expresion ")" _ stmtElseIf:Sentencia { return crearNodo('ElseIfExp',{cond,stmtElseIf})}

Expresion = Asignacion

Asignacion = id:Identificador _ "=" _ asig:Asignacion { return crearNodo('AsignacionValor',{id,asig})}//--
        / id:Identificador _ op:("+="/"-=") _ sum:Suma { return crearNodo('ModIgualacion',{id,op,sum})}//
        / OperadoresLogicos

OperadoresLogicos=  izq:Comparacion expansion:(
    _ op:("&&"/"||") _ der:Comparacion { return { tipo: op, der}}
)* {
    return expansion.reduce(
        (operacionAnterior,operacionActual)=>{
            const {tipo, der} = operacionActual
            return crearNodo('OperacionLogica', {op: tipo, izq:operacionAnterior,der})//--
        },
        izq
    )
}
Comparacion = izq:Relacionales expansion:(
    _ op:("=="/"!=") _ der:Relacionales { return { tipo: op, der}}
)* {
    return expansion.reduce(
        (operacionAnterior,operacionActual)=>{
            const {tipo, der} = operacionActual
            return crearNodo('OperacionLogica', {op: tipo, izq:operacionAnterior,der})//--
        },
        izq
    )
}

Relacionales = izq:Suma expansion:(
    _ op:("<="/">"/"<"/">="/"<=") _ der:Suma { return { tipo: op, der}}
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
/"!" _ num:Numero { return crearNodo('Negacion', { op: '-', exp: num }) }//--
/ Numero

Numero = 
   "(" _ exp:Expresion _ ")" { return crearNodo('Agrupacion', { exp }) }//--
  / !(Boolean) id:Identificador { return crearNodo('ReferenciaVariable', { id }) }//--
  / [0-9]+"." [0-9]* {return crearNodo('TerminalesExp', { tipo:"Float",valor: parseFloat(text(), 10) })}//
  / [0-9]+ {return crearNodo('TerminalesExp', {tipo:"Entero" ,valor: parseFloat(text(), 10) })}//
  / String
  / Char
  / Boolean

Boolean = "true" {return crearNodo('TerminalesExp',{tipo:"Boolean",valor:"true"})}//
        / "false" {return crearNodo('TerminalesExp',{tipo:"Boolean",valor:"false"})}//  

String = "\"" chars:Caracteres* "\"" { return crearNodo('TerminalesExpCadena', {tipo:"String", valor:chars}) }//

Caracteres
  = "\\" es:Escape { return es}
  / !("\"") . {return text()}//Que venga de todo menos comias   

Escape
  = "n" { return "\n"; }
  / "t" { return "\t"; }
  / "r" { return "\r"; }
  / "\"" { return "\""; }
  / "\\" { return "\\"; }
Char
  = "'" char:Caracter "'" { return crearNodo('TerminalesExp',{tipo:"Char",valor:char}) }//

Caracter
  = "\\" es:Escape  { return es}
  / !("'" / "\\") . {return text()}



Identificador = [a-zA-Z][a-zA-Z0-9]* { return text() }

Tipo=
    "int" { return "int"; }
  / "float" { return "float"; }
  / "string" { return "string"; }
  / "boolean" { return "boolean"; }
  / "char" { return "char"; }
  / "var" { return "var"}

_ = ([ \t\n\r] / Comentarios)*
Comentarios = "//" (![\n].)*  { return ""}
             / "/*" (!("*/").)* "*/" { return ""}

Reservadas=
    "int" 
  / "float" 
  / "string" 
  / "boolean" 
  / "char" 
  / "var"
  / "for"
  / "else"
  / "if"
  / "while" 


