'use strict';

module.exports = class Category {
  constructor(name) {
    if (!name) throw new Error('Please enter a name for the category!');
    this.name = name;
  }
};