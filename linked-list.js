/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieve node at idx. */
  _get(idx) {
    let cur = this.head;
    let count = 0;

    while(cur != null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if(!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    // if no nodes, make head newNode else assign first value to newNode.next and make head the newNode
    if(this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    // if the only value in the ll make the val the tail as well.
    if(this.length === 0) this.tail = this.head;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    // remove the node at the end of the length
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // if idx greater than length or less than 0 return error
    if(idx >= this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }

    // return this _get method at idx val
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx >= this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }

    // assign the current index to cur and assign val to cur.val
    let cur = this._get(idx);
    cur.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx > this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }

    // if index is at beginning use unshift if at end use push 
    if(idx === 0) return this.unshift(val);
    if(idx === this.length) return this.push(val);

    // first get previous element
    let prev = this._get(idx - 1);

    // create new node and assign newNode.next to prev.next and prev.next to newNode.
    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(idx > this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }

    // if removing the first node
    if(idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      if(this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // if removing the last node
    if(idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle
    let val = prev.next.val;
    prev.next = prev.next.next;

    this.length -= 1;

    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if(this.length === 0) return 0;

    let current = this.head;
    let total = 0;
    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
