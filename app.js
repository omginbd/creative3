//These are just sample attacks. If you think of better ones feel free to change them
var ATTACK_TYPES = {
  PUNCH: 'PUNCH',
  RAGE: 'RAGE',
  TRUCK: 'TRUCK',
  HAUNT: 'HAUNT',
  CONSUME: 'CONSUME'
}

angular.module('StrangerThings', [])
  .controller('MyController', ['$scope', GameController])
  .directive('statbar', statbarDirective)

function GameController($scope) {
  $scope.textLog = []
  $scope.eleven = {
    stats: {
      hp: {
        name: 'Health',
        max: 100,
        cur: 100
      },
      mp: {
        name: 'Mana',
        max: 100,
        cur: 100
      },
      stamina: {
        name: 'Stamina',
        max: 100,
        cur: 100
      }
    },
    attackDamage: 10,
    spells: [
      {
        name: 'Rage',
        damage: 100
      },
      {
        name: 'Throw Truck',
        damage: 50
      }
    ]
  }
  $scope.demogorgan = {
    stats: {
      hp: {
        name: 'Health',
        max: 1000,
        cur: 1000
      },
      mp: {
        name: 'Mana',
        max: 500,
        cur: 500
      },
      stamina: {
        name: 'Stamina',
        max: 1000,
        cur: 1000
      }
    },
    attackDamage: 60,
    spells: [
      {
        name: 'Haunt',
        damage: 30
      },
      {
        name: 'Consume',
        damage: 60
      }
    ]
  }
}

function statbarDirective() {
  return {
    scope: {
      stat: '=',
    },
    restrict: 'E',
    replace: 'true',
    template: (
      `<div class="stat-bar">
        {{stat.name}}:
        <p>
          {{stat.cur}} / {{stat.max}}
        </p>
      </div>`
    )
  }
}

/***
  * doAttack will get called when the user selects an option from the menu
  * attackType will be one of the members of the ATTACK_TYPE enum at the top of the file
  * eleven and demogorgan are the whole objects as defined in the $scope initialization
  *
***/

function doAttack(attackType, eleven, demogorgan) {
  // Do magic math things here
  // I suppose this could update the attack log as well, but that's your call
  // Just return the updated stats, they'll be merged into the whole object
  return {
    demogorgan: {
      hp: 0,
      mp: 0,
      stamina: 0
    },
    eleven: {
      hp: 0,
      mp: 0,
      stamina: 0
    }
  }
}
