// import fs from 'fs';
const fs = require('fs')

const types = [
    `
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
    `
]

const configuracionNodos = [
    // Configuracion del nodo inicial
    {
        name: 'Expresion',
        base: true,
        props: [
            {
                name: 'location',
                type: 'Location|null',
                description: 'Ubicacion del nodo en el codigo fuente',
                default: 'null'
            }
        ]
    },
    {
        name: 'Numero',
        extends: 'Expresion',
        props: [
            {
                name: 'valor',
                type: 'number',
                description: 'Valor del numero'
            }
        ]
    },
      //DeclaracionVariable, tipo,id,exp
    {
        name: 'DeclaracionVariable',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'string',
                description: 'Tipo de variable'
            },
            {
                name: 'id',
                type: 'String',
                description: 'Nombre de identificador '
            },
            {
                name: 'exp',
                type: 'Expresion',
                description: 'Valor de la variable'
            }
        ]
    },
      //DeclaracionVariableSinValor, tipo,id
    {
        name: 'DeclaracionVariableSinValor',
        extends: 'Expresion',
        props: [
            {
                name: 'tipo',
                type: 'String',
                description: 'tipo de la variable'
            },
            {
                name: 'id',
                type: 'string',
                description: 'identificador de variable'
            }
        ]
    },
      //AsignacionValor  {id,asig}
    {
        name: 'AsignacionValor',
        extends: 'Expresion',
        props: [
            {
                name: 'id',
                type: 'String',
                description: 'Nombre de identificador'
            },
            {
                name: 'asig',
                type: 'Expresion',
                description: 'Valor nuevo a la variable'
            }
        ]
    }
]

let code = ''

// Tipos base
types.forEach(type => {
    code += type + '\n'
})


// // Tipos de nodos
// configuracionNodos.forEach(nodo => {
//     code += `
// /**
//  * @typedef {Object} ${nodo.name}
//  * ${nodo.props.map(prop => `@property {${prop.type}} ${prop.name} ${prop.description}`).join('\n * ')}
// */
//     `
// })

// Tipos del visitor
code += `
/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */
`

const baseClass = configuracionNodos.find(nodo => nodo.base)

configuracionNodos.forEach(nodo => {


    code += `
export class ${nodo.name} ${baseClass && nodo.extends ? `extends ${nodo.extends}` : ''} {

    /**
    * @param {Object} options
    * ${nodo.props.map(prop => `@param {${prop.type}} options.${prop.name} ${prop.description}`).join('\n * ')}
    */
    constructor(${!nodo.base && `{ ${nodo.props.map(prop => `${prop.name}`).join(', ')} }` || ''}) {
        ${baseClass && nodo.extends ? `super();` : ''}
        ${nodo.props.map(prop => `
        /**
         * ${prop.description}
         * @type {${prop.type}}
        */
        this.${prop.name} = ${prop.default || `${prop.name}`};
`).join('\n')}
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visit${nodo.name}(this);
    }
}
    `
})

code += `
export default { ${configuracionNodos.map(nodo => nodo.name).join(', ')} }
`


fs.writeFileSync('./GeneradorDeArchivos/nodos.js', code)
console.log('Archivo de clases de nodo generado correctamente')


// Visitor
// @typedef {import('./nodos').Expresion} Expresion
code = `
/**
${configuracionNodos.map(nodo => `
 * @typedef {import('./nodos').${nodo.name}} ${nodo.name}
`).join('\n')}
 */
`

code += `

/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    ${configuracionNodos.map(nodo => `
    /**
     * @param {${nodo.name}} node
     * @returns {any}
     */
    visit${nodo.name}(node) {
        throw new Error('Metodo visit${nodo.name} no implementado');
    }
    `).join('\n')
    }
}
`

fs.writeFileSync('./GeneradorDeArchivos/visitor.js', code)
console.log('Archivo de visitor generado correctamente')