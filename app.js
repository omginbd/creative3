//These are just sample attacks. If you think of better ones feel free to change them
var ATTACK_TYPES = {
  PUNCH: 'PUNCH',
  RAGE: 'RAGE',
  TRUCK: 'TRUCK',
  EGGO: 'EGGO',
  HAUNT: 'HAUNT',
  CONSUME: 'CONSUME'
}

angular.module('StrangerThings', [])
  .controller('MyController', ['$scope', GameController])
  .directive('statbar', statbarDirective)
  .directive('optionsmenu', optionsMenuDirective)

function GameController($scope) {
  $scope.win = false
  $scope.lose = false
  $scope.textLog = []
  $scope.eleven = {
    stats: {
      hp: {
        name: 'Health',
        max: 500,
        cur: 500
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
      },
      waffles: {
        name: 'Eggos',
        max: 3,
        cur: 3
      }
    },
    attackDamage: 10,
    spells: [
      {
        name: 'Rage',
        damage: 100,
        key: ATTACK_TYPES.RAGE
      },
      {
        name: 'Throw Truck',
        damage: 50,
        key: ATTACK_TYPES.TRUCK
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
  $scope.doAttack = _.partialRight(doAttack, $scope.eleven, $scope.demogorgan, $scope.textLog, $scope)
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
        {{stat.name}}: {{stat.cur}} / {{stat.max}}
      </div>`
    )
  }
}

function optionsMenuDirective() {
  return {
    restrict: 'E',
    replace: 'true',
    template: (
      `<div class="options-menu">
        <div ng-click="doAttack('PUNCH')">Punch</div>
        <div ng-click="magicOpen = !magicOpen">Magic</div>
        <div class="magic-menu" ng-show="magicOpen">
          <div class="spell-wrapper" ng-repeat="spell in eleven.spells">
            <div ng-click="doAttack(spell.key)">{{spell.name}}</div>
          </div>
        </div>
        <div ng-click="doAttack('EGGO')">Eat Eggo</div>
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

function doAttack(attackType, eleven, demogorgan, textLog, $scope) {
  switch (attackType) {
    case ATTACK_TYPES.PUNCH:
      if (eleven.stats.stamina.cur > 10) {
        eleven.stats.stamina.cur = eleven.stats.stamina.cur - 10
        demogorgan.stats.hp.cur = demogorgan.stats.hp.cur - eleven.attackDamage
        textLog.unshift('Eleven used PUNCH for 10 damage!')
    } else {
        textLog.unshift('Not enough stamina! Use something else.')
        return
    }
      break
    case ATTACK_TYPES.RAGE:
      if (eleven.stats.mp.cur > 35) {
        eleven.stats.mp.cur = eleven.stats.mp.cur - 35
        demogorgan.stats.hp.cur = demogorgan.stats.hp.cur - 200
        textLog.unshift('Eleven used RAGE for 200 damage!')
      } else {
        textLog.unshift('Not enough mana! Use something else.')
        return
      }
      break
    case ATTACK_TYPES.TRUCK:
      if (eleven.stats.mp.cur > 20) {
        eleven.stats.mp.cur = eleven.stats.mp.cur - 20
        demogorgan.stats.hp.cur = demogorgan.stats.hp.cur - 100
        textLog.unshift('Eleven used TRUCK for 100 damage!')
      } else {
        textLog.unshift('Not enough mana! Use something else.')
        return
      }
      break
    case ATTACK_TYPES.EGGO:
      if (eleven.stats.waffles.cur > 1) {
        eleven.stats.waffles.cur = eleven.stats.waffles.cur - 1
        eleven.stats.hp.cur = eleven.stats.hp.cur + 100
        textLog.unshift('Eleven ate an Eggo Waffle, healing for 100 health!')
      } else {
        textLog.unshift('No more waffles left!')
        return
      }
      break
  }
  if (demogorgan.stats.hp.cur <= 0) {
    demogorgan.stats.hp.cur = 0
    $scope.win = true
    return;
  }

  eleven.stats.mp.cur = ((eleven.stats.mp.cur + 15) > eleven.stats.mp.max) ? eleven.stats.mp.max : eleven.stats.mp.cur + 15
  eleven.stats.stamina.cur = ((eleven.stats.stamina.cur + 15) > eleven.stats.stamina.max) ? eleven.stats.stamina.max : eleven.stats.stamina.cur + 15
  var attack = Math.floor(Math.random() * 100) % 3
  switch (attack) {
    case 0:
      if (demogorgan.stats.stamina.cur > 200) {
        demogorgan.stats.stamina.cur -= 200
        eleven.stats.hp.cur -= 100
        textLog.unshift('Demogorgan used CHARGE for 100 damage!')
        break;
      }
    case 1:
      if (demogorgan.stats.mp.cur > 200) {
        demogorgan.stats.mp.cur -= 200
        eleven.stats.hp.cur -= 150
        textLog.unshift('Demogorgan cast HAUNT for 30 damage!')
        break;
      }
    case 2:
      if (demogorgan.stats.mp.cur > 300) {
        demogorgan.stats.mp.cur -= 300
        eleven.stats.hp.cur -= 100
        textLog.unshift('Demogorgan cast CONSUME for 100 damage!')
        break;
      }
    default:
      textLog.unshift('Demogorgan is exhausted!')
  }
  demogorgan.stats.mp.cur = ((demogorgan.stats.mp.cur + 50) > demogorgan.stats.mp.max) ? demogorgan.stats.mp.max : demogorgan.stats.mp.cur + 50
  demogorgan.stats.stamina.cur = ((demogorgan.stats.stamina.cur + 100) > demogorgan.stats.stamina.max) ? demogorgan.stats.stamina.max : demogorgan.stats.stamina.cur + 100
  if (eleven.stats.hp.cur <= 0) {
    eleven.stats.hp.cur = 0
    $scope.lose = true
    return;
  }
  return
}
