export class TrieTreeNode {
    constructor(character) {
      // ¿cuáles son las caracteristicas?
      this.character = character;
      this.children = {};
      this.terminal = false;
    }
  
    isTerminal() {
      return this.terminal;
    }
  
    numChildren() {
      //Regresa el numero de nodos hijos del nodo actual.
      return Object.keys(this.children).length;
    }
  
    hasChild(character) {
      //Regresar true si el nodo contiene un nodo hijo que almacena un caracter dado.
      return Object.keys(this.children).includes(character);
    }
  
    getChild(character) {
      //Regresar el nodo hijo que almacena un caracter dado
      if(this.hasChild(character)){
        return this.children[character];
      }else{
        return false;
      }
    }
  
    addChild(character, child_node) {
      //Agregamos el caracter y el nodo hijo de este nodo
      if(!this.hasChild(character)){
        this.children[character] = child_node;
      }else{
        //Retornar un error si ya existe un nodo hijo con ese caracter
        return false;
      }
    }
  }