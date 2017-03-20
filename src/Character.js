'use strict';
var dice = require('./dice');

function Character(name, features) {
  features = features || {};

  this.name = name || null;
  this.party = null;
  this.weapon = features.weapon || null;

  this.initiative = features.initiative || 0;
  this._defense = features.defense || 0;
  this._hp = features.hp || 0;
  this.maxHp = features.maxHp || this._hp;
  this._mp = features.mp || 0;
  this.maxMp = features.maxMp || this._mp;
}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
  return this._hp <= 0;
};

Character.prototype.applyEffect = function (effect, isAlly) {
  if (isAlly || dice.d100() > this.defense) {
    this.initiative = this.initiative + effect.initiative;
    this.maxHp = this.maxHp + effect.maxHp;
    this.maxMp = this.maxMp + effect.maxMp;

    this.defense = this.defense + effect.defense;
    this.hp = this.hp + effect.hp;
    this.mp = this.mp + effect.mp;

    return true;
  }
  return false;
};

Object.defineProperty(Character.prototype, 'mp', {
  get: function () {
    return this._mp;
  },
  set: function (newValue) {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp));
  }
});

Object.defineProperty(Character.prototype, 'hp', {
  get: function () {
    return this._hp;
  },
  set: function (newValue) {
    this._hp = Math.max(0, Math.min(newValue, this.maxHp));
  }
});

Object.defineProperty(Character.prototype, 'defense', {
  get: function () {
    return this._defense;
  },
  set: function (newValue) {
    this._defense = Math.max(0, Math.min(newValue, 100));
  }
});

module.exports = Character;
