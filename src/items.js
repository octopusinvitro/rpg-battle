'use strict';

function Item(name, effect) {
  this.name = name;
  this.effect = effect;
}

function Weapon(name, damage, extraEffect) {
  extraEffect = extraEffect || new Effect({});
  extraEffect.hp = -damage;
  Item.apply(this, [name, extraEffect]);
}
Weapon.prototype = Object.create(Item.prototype)
Weapon.prototype.constructor = Weapon

function Scroll(name, cost, effect) {
  Item.call(this, name, effect);
  this.cost = cost;
}
Scroll.prototype = Object.create(Item.prototype);
Scroll.prototype.constructor = Scroll;

Scroll.prototype.canBeUsed = function (mp) {
  return mp >= this.cost;
};

function Effect(variations) {
  var self = this;

  Object.keys(variations).forEach(function (feature) {
    self[feature] = variations[feature];
  });
}

module.exports = {
  Item: Item,
  Weapon: Weapon,
  Scroll: Scroll,
  Effect: Effect
};
