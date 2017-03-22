'use strict';

function TurnList() {}

TurnList.prototype.reset = function (charactersById) {
  this._charactersById = charactersById;

  this._turnIndex = -1;
  this.turnNumber = 0;
  this.activeCharacterId = null;
  this.list = this.list || this._sortByInitiative();
};

TurnList.prototype.next = function () {
  this.turnNumber += 1;
  var cachedLength = this.list.length;

  do {
    this._turnIndex += 1;
    if (this._turnIndex == cachedLength) this._turnIndex = 0;
    this.activeCharacterId = this.list[this._turnIndex];
  } while(this._charactersById[this.activeCharacterId].isDead());

  return {
    number: this.turnNumber,
    party: this._charactersById[this.activeCharacterId].party,
    activeCharacterId: this.activeCharacterId
  };
};

TurnList.prototype._sortByInitiative = function () {
  var characters = this._charactersById;

  function sortByInitiative(a, b) {
    return characters[a].initiative - characters[b].initiative;
  }

  return Object.keys(characters).sort(sortByInitiative).reverse();
};

module.exports = TurnList;
