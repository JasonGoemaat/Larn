window.cheats = {
  decurse: () => {
    player.AGGRAVATE = 0;
    player.HASTEMONST = 0;
    player.HALFDAM = 0;
    player.CONFUSE = 0;
    player.BLINDCOUNT = 0;
    player.ITCHING = 0;
    player.CLUMSINESS = 0;
    player.LAUGHING = 0; // UNUSED
    player.DRAINSTRENGTH = 0; // UNUSED
    player.INFEEBLEMENT = 0; // UNUSED
  },

  reveal: () => {
    revealLevel()
  },

  money: (amount) => {
    player.GOLD += amount || 1000000
  },

  stats: (amount) => {
    amount = amount || 100
    player.SPELLS = Math.max(player.SPELLS, 50);
    player.SPELLMAX = Math.max(player.SPELLMAX, 50);
    player.HP = Math.max(player.HP, 999);
    player.HPMAX = Math.max(player.HPMAX, 999);
    player.STRENGTH = Math.max(player.STRENGTH, amount);
    player.START_STRENGTH = Math.max(player.START_STRENGTH, amount);
    player.INTELLIGENCE = Math.max(player.INTELLIGENCE, amount);
    player.WISDOM = Math.max(player.WISDOM, amount);
    player.CONSTITUTION = Math.max(player.CONSTITUTION, amount);
    player.DEXTERITY = Math.max(player.DEXTERITY, amount);
    player.CHARISMA = Math.max(player.CHARISMA, amount);
  },

  god: () => {
    player.GOD = player.GOD ? false : true
  },

  time: () => {
    gtime = 0
  },

  learn: () => {
    spelcode.forEach(learnSpell)
  },

  buff: () => {
      // bonuses
    player.MOREDEFENSES = 999999;
    player.STREXTRA = 999999;
    player.GIANTSTR = 999999;
    player.HERO = 999999;
    player.COKED = 999999; // ULARN
    player.AWARENESS = 999999;
    player.SEEINVISIBLE = 999999;
    player.SPIRITPRO = 999999;
    player.UNDEADPRO = 999999;
    player.FIRERESISTANCE = 999999;
    player.STEALTH = 999999;
    player.LIFEPROT = 999999;
    player.MOREDAM = 999999; // not sure this does anything
  }
}