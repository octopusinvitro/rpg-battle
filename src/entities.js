'use strict';
var
  items = require('./items'),
  Character = require('./Character'),
  Effect = items.Effect;

var lib = module.exports = {
  Item: items.Item,
  Weapon: items.Weapon,
  Scroll: items.Scroll,
  Effect: Effect,
  Character: Character,

  weapons: {
    get sword() {
      return new items.Weapon('sword', 25);
    },
    get wand() {
      return new items.Weapon('wand', 5);
    },
    get fangs() {
      return new items.Weapon('fangs', 10);
    },
    get pseudopode() {
      return new items.Weapon('pseudopod', 5, new Effect({ mp: -5 }));
    },
  },

  characters: {
    get heroTank() {
      return new Character('Tank', {
        weapon: lib.weapons.sword,
        initiative: 10,
        defense: 70,
        hp: 80,
        mp: 30
      });
    },

    get heroWizard() {
      return new Character('Wizard', {
        weapon: lib.weapons.wand,
        initiative: 4,
        defense: 50,
        hp: 40,
        mp: 100
      });
    },

    get monsterSkeleton() {
      return new Character('Skeleton', {
        weapon: lib.weapons.sword,
        initiative: 9,
        defense: 50,
        hp: 100,
        mp: 0
      });
    },

    get monsterSlime() {
      return new Character('Slime', {
        weapon: lib.weapons.pseudopode,
        initiative: 2,
        defense: 40,
        hp: 40,
        mp: 50
      });
    },

    get monsterBat() {
      return new Character('Bat', {
        weapon: lib.weapons.fangs,
        initiative: 30,
        defense: 80,
        hp: 5,
        mp: 0
      });
    },
  },

  scrolls: {

    get health() {
      return new items.Scroll('health', 10, new Effect({ hp: 25 }));
    },

    get fireball() {
      return new items.Scroll('fireball', 30, new Effect({ hp: -25 }));
    },

  }
};
