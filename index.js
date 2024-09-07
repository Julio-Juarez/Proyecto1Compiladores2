
import { parse } from './GeneradorDeArchivos/analizadorProyecto.js'

import { InterpreterVisitor } from './Interprete/interprete.js'

const editor = document.getElementById('editor')
const btn = document.getElementById('aje')
const ast = document.getElementById('ast')
const salida = document.getElementById('salida')

btn.addEventListener('click', () => {

    
        const codigoFuente = editor.value
    const sentencias = parse(codigoFuente)
    ast.innerHTML = JSON.stringify(sentencias, null, 2)

    //const interprete = new InterpreterVisitor()

    // for (const sentencia of sentencias) {
    //     sentencia.accept(interprete)
    // }
    //console.log({ sentencias })
    //sentencias.forEach(sentencia => sentencia.accept(interprete))

    //salida.innerHTML = interprete.salida
      
    //ast.innerHTML = JSON.stringify(sentencias, null, 2)
    
    //} catch (error) {

        console.log(error);
        //const linea=error.location.start.line
        /*const column=error.location.start.column
      
        const tablaErroresHTML = `
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Error</th>
                    <th>Fila</th>
                    <th>Columna</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>01</td>
                    <td>${error.message}</td>
                    <td>${linea}</td>
                    <td>${column}</td>
                </tr>
               
            </tbody>
        </table>
    `;
    document.getElementById("tabla-errores").innerHTML = tablaErroresHTML;

        */
   // }
    
    
})
