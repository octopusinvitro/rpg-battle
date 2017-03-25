'use strict';

var EventEmitter = require('events').EventEmitter;

function Options(group) {
  EventEmitter.call(this);
  this._group = typeof group === 'object' ? group : {};
}
Options.prototype = Object.create(EventEmitter.prototype);
Options.prototype.constructor = Options;

Options.prototype.list = function () {
  return Object.keys(this._group);
};

Options.prototype.get = function (id) {
  var option = this._group[id];
  if (option === undefined) {
    this.emit('choseError', 'option-does-not-exist', id);
  }
  return option;
};

Options.prototype.select = function (id) {
  this.emit('chose', id, this.get(id));
};

module.exports = Options;
