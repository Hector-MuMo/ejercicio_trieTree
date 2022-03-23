import { TrieTreeNode } from './trietreenode';

export class TrieTree {
    /* */
    /* TrieTree: Es un árbol de prefijos con múltiples vías que almacena strings de forma eficiente
    con métodos para insertar un string en el árbol, un método para comprobar si la estructura 
    contiene una coincidencia para una determinado string y 
    un método para obtener todas las cadenas que comienzan con un string de prefijo. */
    constructor(strings = []) {
        //¿cuáles son las caracteristicas del árbol trie?
        this.root = new TrieTreeNode('');
        this.size = 0;
        this.strings = strings;

        if (Array.isArray(this.strings) && this.strings.length > 0) {
            for (let i = 0; i < this.strings.length; i++) {
                //Insertar
                this.insert(this.strings[i]);
            }
        }

    }

    findNode(str) {
        /*
          Regresa un par que contiene el nodo más profundo en el árbol trie que coincide
          con el prefijo más largo del string dado y la profundidad del nodo.
          La profundidad devuelta es igual al número de caracteres de prefijo coincidentes.
          La búsqueda se realiza de forma iterativa con un bucle que comienza desde el nodo raíz.
        */
        if (str.length === 0) {
            return [this.root, 0];
        }

        let [node, depth] = [this.root, 0];

        for (let i = 0; i < str.length; i++) {
            if (node.hasChild(str[i])) {
                node = node.getChild(str[i]);
                depth++;
            } else {
                return null;
            }
        }

        return [node, depth];
    }

    traverse(node, prefix, visit) {
        /*
          Recorre el trie tree de forma recursiva.
          Empezando con el prefijo dado y visita (agrega a la lista) cada nodo con la función visit
        */

        if (node.isTerminal()) {
            visit(prefix);
        }

        for (const char of Object.keys(node.children)) {
            const nextNode = node.getChild(char);
            this.traverse(nextNode, prefix + char, visit);
        }
    }

    isEmpty() {
        // Regresa true si el trie tree está vacío (no contiene strings)
        if (this.size === 0) {
            return true
        } else {
            return false
        }
    }

    contains(str) {
        // Regresa true si el string se encuentra en el trie tree
        let node = this.findNode(str);
        return node[0].isTerminal();
    }

    insert(str) {
        // Agrega un string en el trie tree
        let currentNode = this.root; //Punto de partida

        for (let i = 0; i < str.length; i++) {
            if (currentNode.hasChild(str[i])) {
                currentNode = currentNode.getChild(str[i]);
            } else {
                //Agregamos el nodo como hijo del nodo actual
                //Primer argumento es el caracter
                //Segundo argumento es el nodo que va almacenar el caracter
                currentNode.addChild(str[i], new TrieTreeNode(str[i]));
                currentNode = currentNode.getChild(str[i]);
            }
        }

        if (!currentNode.isTerminal()) {
            this.size++;
            currentNode.terminal = true; //Marcamos el último nodo (con el último caracter de la palabra) 
        }

    }

    complete(prefix) {
        // Regresa una lista de strings dado el prefijo
        if (prefix === "") {
            return [];
            //Para evitar que nos aparezcan todas las palabras cuando el termino de busqueda sea ''
        }

        let usuariosArr = [];
        let nodeL = this.findNode(prefix);

        if (!nodeL) {
            return usuariosArr
        }

        console.log(nodeL[0]);
        this.traverse(nodeL[0], prefix, usuariosArr.push.bind(usuariosArr));
        return usuariosArr;
    }

    allTreeStrings() {
        // Crea la lista de strings almacenados en este trie tree
        let usuariosArr = [];
        let nodeL = this.root;
        this.traverse(nodeL, "", usuariosArr.push.bind(usuariosArr));
        return usuariosArr;
    }
}