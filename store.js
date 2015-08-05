"use strict";



/* number of items in the dnd inventory table   */
const MAXITM = 83;

var DND_Item = function DND_Item(price, item, qty) {
  this.price = price;
  this.item = item;
  this.qty = qty;
}

var _itm = [
  /* cost      iven name    iven arg   how
      gp        iven[]      ivenarg[]  many */
  [20, OLEATHER, 0, 3],
  [100, OSTUDLEATHER, 0, 2],
  [400, ORING, 0, 2],
  [850, OCHAIN, 0, 2],
  [2200, OSPLINT, 0, 1],
  [4000, OPLATE, 0, 1],
  [9000, OPLATEARMOR, 0, 1],
  [26000, OSSPLATE, 0, 1],
  [1500, OSHIELD, 0, 1],
  [20, ODAGGER, 0, 3],
  [200, OSPEAR, 0, 3],
  [800, OFLAIL, 0, 2],
  [1500, OBATTLEAXE, 0, 2],
  [4500, OLONGSWORD, 0, 2],
  [10000, O2SWORD, 0, 2],
  [50000, OSWORD, 0, 1],
  [165000, OLANCE, 0, 1],
  [60000, OSWORDofSLASHING, 0, 0],
  [100000, OHAMMER, 0, 0],
  [1500, OPROTRING, 1, 1],
  [850, OSTRRING, 1, 1],
  [1200, ODEXRING, 1, 1],
  [1200, OCLEVERRING, 1, 1],
  [1800, OENERGYRING, 0, 1],
  [1250, ODAMRING, 0, 1],
  [2200, OREGENRING, 0, 1],
  [10000, ORINGOFEXTRA, 0, 1],
  [2800, OBELT, 0, 1],
  [4000, OAMULET, 0, 1],
  [65000, OORBOFDRAGON, 0, 0],
  [55000, OSPIRITSCARAB, 0, 0],
  [50000, OCUBEofUNDEAD, 0, 0],
  [60000, ONOTHEFT, 0, 0],
  [5900, OCHEST, 6, 1],
  [2000, OBOOK, 8, 1],
  [100, OCOOKIE, 0, 3],
  [200, OPOTION, 0, 6],
  [900, OPOTION, 1, 5],
  [5200, OPOTION, 2, 1],
  [1000, OPOTION, 3, 2],
  [500, OPOTION, 4, 2],
  [1500, OPOTION, 5, 2],
  [700, OPOTION, 6, 1],
  [300, OPOTION, 7, 7],
  [2000, OPOTION, 8, 1],
  [500, OPOTION, 9, 1],
  [800, OPOTION, 10, 1],
  [300, OPOTION, 11, 3],
  [200, OPOTION, 12, 5],
  [400, OPOTION, 13, 3],
  [350, OPOTION, 14, 2],
  [5200, OPOTION, 15, 1],
  [900, OPOTION, 16, 2],
  [2000, OPOTION, 17, 2],
  [2200, OPOTION, 18, 4],
  [800, OPOTION, 19, 6],
  [3700, OPOTION, 20, 3],
  [500, OPOTION, 22, 1],
  [1500, OPOTION, 23, 3],
  [1000, OSCROLL, 0, 2],
  [1250, OSCROLL, 1, 2],
  [600, OSCROLL, 2, 4],
  [100, OSCROLL, 3, 4],
  [1000, OSCROLL, 4, 3],
  [2000, OSCROLL, 5, 2],
  [1100, OSCROLL, 6, 1],
  [5000, OSCROLL, 7, 2],
  [2000, OSCROLL, 8, 2],
  [2500, OSCROLL, 9, 4],
  [200, OSCROLL, 10, 5],
  [300, OSCROLL, 11, 3],
  [3400, OSCROLL, 12, 1],
  [3400, OSCROLL, 13, 1],
  [3000, OSCROLL, 14, 2],
  [4000, OSCROLL, 15, 2],
  [5000, OSCROLL, 16, 2],
  [10000, OSCROLL, 17, 1],
  [5000, OSCROLL, 18, 1],
  [3400, OSCROLL, 19, 2],
  [2200, OSCROLL, 20, 3],
  [39000, OSCROLL, 21, 0],
  [6100, OSCROLL, 22, 1],
  [30000, OSCROLL, 23, 0]
];



/*
 *
 *
 * DND STORE
 *
 *
 */

var dndindex = 0;

function dndstore() {

  initpricelist();

  clear();

  lprcat("Welcome to the Larn Thrift Shoppe.  We stock many items explorers find useful\n");
  lprcat("in their adventures.  Feel free to browse to your hearts content.\n");
  lprcat("Also be advised, if you break 'em, you pay for 'em.");

  // TODO
  // if (outstanding_taxes > 0) {
  //   lprcat("\n\nThe Larn Revenue Service has ordered us to not do business with tax evaders.\n");
  //   beep();
  //   lprintf("They have also told us that you owe %d gp in back taxes, and as we must\n", (long) outstanding_taxes);
  //   lprcat("comply with the law, we cannot serve you at this time.  Soo Sorry.\n");
  //   cursors();
  //   lprcat("\nPress ");
  //   standout("escape");
  //   lprcat(" to leave: ");
  //   lflush();
  //   i = 0;
  //   while (i != '\33') i = ttgetch();
  //   drawscreen();
  //   nosignal = 0; /* enable signals */
  //   return;
  // }

  for (var i = dndindex; i < 26 + dndindex; i++) {
    dnditem(i);
  }

  updategold();

  setCharCallback(dnd_parse, true);
}



function updategold() {
  cursor(50, 19);
  lprcat(`You have ${player.GOLD} gold pieces`);
  cltoeoln();
  cl_dn(1, 20); /* erase to eod */
  lprcat("\nEnter your transaction [");
  standout("space");
  lprcat(" for more, ");
  standout("escape");
  lprcat(" to leave]? ");
}



function dnd_parse(key) {
  if (key == ESC) {
    dndindex = 0;
    return exitbuilding();
  }

  if (key == ' ') {
    if ((dndindex += 26) >= MAXITM) {
      dndindex = 0;
    }
    dndstore();
    return 0;
  }

  var i = getIndexFromChar(key);

  if (i >= 0 && i <= 26) {
    i += dndindex;
    if (i >= MAXITM) {
      storemessage("Sorry, but we are out of that item.");
    } else if (dnd_item[i].qty <= 0) {
      storemessage("Sorry, but we are out of that item.");
    } else if (pocketfull()) {
      storemessage("You can't carry anything more!");
    } else if (player.GOLD < dnd_item[i].price) {
      storemessage("You don't have enough gold to pay for that!");
    } else {
      player.GOLD -= dnd_item[i].price;
      dnd_item[i].qty--;
      var boughtItem = createObject(dnd_item[i].item);
      take(boughtItem);
      if (boughtItem.matches(OSCROLL)) learnScroll(boughtItem);
      if (boughtItem.matches(OPOTION)) learnPotion(boughtItem);
      if (dnd_item[i].qty == 0) dnditem(i);
      updategold();
      lprc(key); /* echo the byte */
      nap(1001);
      return 0;
    }
  } else {
    return 0;
  }
}



/*
    dnditem(index)

    to print the item list;  used in dndstore() enter with the index into itm
 */
function dnditem(i) {
  var j, k, price;
  if (i < 0 || i >= MAXITM) return;

  cursor((j = (i & 1) * 40 + 1), (k = ((i % 26) >> 1) + 5));

  if (dnd_item[i].qty == 0) {
    lprintf("", 39);
    return;
  }

  var item = dnd_item[i].item;
  lprintf(`${getCharFromIndex(i%26)}) `);

  if (item.matches(OPOTION)) lprintf(`${item.toString(true).substring(8)}`);
  else if (item.matches(OSCROLL)) lprintf(`${item.toString(true).substring(8)}`);
  else lprintf(`${dnd_item[i].item.toString(true)}`);

  cursor(j + 31, k);

  price = dnd_item[i].price;

  lprintf(price.toString(), 6);
}



/*
 *
 *
 * BANK
 *
 *
 */



/*
 *  for the first national bank of Larn
 */
var lasttime = 0; /* last time he was in bank */

function obank() {
  banktitle("Welcome to the First National Bank of Larn.");
}


function obank2() {
  banktitle("Welcome to the 5th level branch office of the First National Bank of Larn.");
  /* because we state the level in the title, clear the '?' in the
     level display at the bottom, if the user teleported.
  */
  player.TELEFLAG = 0;
}


function banktitle(str) {
  clear();
  lprcat(str);
  // TODO
  // if (outstanding_taxes > 0) {
  //   register int i;
  //   lprcat("\n\nThe Larn Revenue Service has ordered that your account be frozen until all\n");
  //   beep();
  //   lprintf("levied taxes have been paid.  They have also told us that you owe %d gp in\n", (long) outstanding_taxes);
  //   lprcat("taxes, and we must comply with them. We cannot serve you at this time.  Sorry.\n");
  //   lprcat("We suggest you go to the LRS office and pay your taxes.\n");
  //   cursors();
  //   lprcat("\nPress ");
  //   standout("escape");
  //   lprcat(" to leave: ");
  //   lflush();
  //   i = 0;
  //   while (i != '\33') i = ttgetch();
  //   drawscreen();
  //   nosignal = 0; /* enable signals */
  //   return;
  // }
  lprcat("\n\n   Gemstone                 Appraisal      Gemstone                 Appraisal");
  obanksub();
  //drawscreen();
  paint();
}


var gemorder = []; /* the reference to screen location for each gem */
var gemvalue = []; /* the appraisal of the gems */

function obanksub() {
  gemorder = [];
  gemvalue = [];

  ointerest(); /* credit any needed interest */

  var i, k;
  for (i = 0, k = 0; i < 26; i++) {
    var item = player.inventory[i];
    if (item != null && (item.isGem() || item.matches(OLARNEYE))) {
      if (item.matches(OLARNEYE)) {
        gemvalue[i] = Math.max(50000, 250000 - ((gtime * 7) / 100) * 100);
      } else {
        gemvalue[i] = (255 & item.arg) * 100;
      }
      gemorder[i] = k;
      cursor((k % 2) * 40 + 1, (k >> 1) + 4);
      lprintf(`${getCharFromIndex(i)}) ${item}`);
      cursor((k % 2) * 40 + 32, (k >> 1) + 4);
      lprintf(`${gemvalue[i]}`, 6);
      k++;
    } else {
      /* make sure player can't sell non-existant gems */
      gemvalue[i] = 0;
      gemorder[i] = 0;
    }
  }

  bank_print_gold();

  cl_dn(1, 21);
  lprcat("\nYour wish? [(");
  standout("d");
  lprcat(") deposit, (");
  standout("w");
  lprcat(") withdraw, (");
  standout("s");
  lprcat(") sell a stone, or ");
  standout("escape");
  lprcat("]  ");

  blocking_callback = bank_parse;

  yrepcount = 0;

}



function bank_print_gold() {
  cursor(31, 17);
  cltoeoln();
  lprintf(`You have ${player.BANKACCOUNT} gold pieces in the bank`);
  cursor(31, 18);
  cltoeoln();
  lprintf(`You have ${player.GOLD} gold pieces`);
  if (player.BANKACCOUNT + player.GOLD >= 500000)
    lprcat("\n\nNote: Larndom law states that only deposits under 500,000gp can earn interest");
}



function bank_parse(key) {
  if (key == ESC) {
    return exitbuilding();
  }

  if (key == 'd') {
    lprcat("deposit\n");
    cltoeoln();
    lprcat("How much? [* for all] ");
    blocking_callback = getnumberinput;
    keyboard_input_callback = bank_deposit;
  }

  if (key == 'w') {
    lprcat("withdraw\nHow much? [* for all] ");
    blocking_callback = getnumberinput;
    keyboard_input_callback = bank_withdraw;
  }

  if (key == 's') {
    lprcat("sell\n");
    cltoeoln();
    lprcat("Which stone would you like to sell? [* for all] ");
    blocking_callback = bank_sell;
  }
}



function bankmessage(str) { //TODO convert to storemessage?
  lprcat(str);
  nap(2000);
  cl_dn(1, 23);
  bank_print_gold();
  cursor(70, 22);
  cltoeoln();
  blocking_callback = bank_parse;
}



function bank_deposit(amt) {
  if (amt == '*') {
    amt = player.GOLD;
  }
  if (amt < 0) {
    bankmessage("\nSorry, but we can't take negative gold!");
  } else if (amt > player.GOLD) {
    bankmessage("  You don't have that much.");
  } else {
    player.GOLD -= amt;
    player.BANKACCOUNT += amt;
    bankmessage("");
  }
  return 0;
}



function bank_withdraw(amt) {
  if (amt == '*') {
    amt = player.BANKACCOUNT;
  }
  if (amt < 0) {
    bankmessage("\nSorry, but we don't have any negative gold!");
  } else if (amt > player.BANKACCOUNT) {
    bankmessage("\nYou don't have that much in the bank!");
  } else {
    player.GOLD += amt;
    player.BANKACCOUNT -= amt;
    bankmessage("");
  }
  return 0;
}



function bank_sell(key) {
  if (key == ESC) {
    bankmessage("");
  } else if (key == '*') {
    var gems_sold = false;
    for (i = 0; i < 26; i++) {
      if (gemvalue[i]) {
        gems_sold = true;
        player.GOLD += gemvalue[i];
        player.inventory[i] = null;
        gemvalue[i] = 0;
        var k = gemorder[i];
        cursor((k % 2) * 40 + 1, (k >> 1) + 4);
        lprintf("", 39);
        bankmessage("");
      }
    }
    if (!gems_sold) {
      bankmessage("\nYou have no gems to sell!");
    }
  } else {
    var i = getIndexFromChar(key);
    if (i >= 0 && i <= 26) {
      if (gemvalue[i] == 0) {
        //lprintf("\nItem %c is not a gemstone!", i + 'a');
        bankmessage(`\nItem ${getCharFromIndex(i)} is not a gemstone!`);
      } else {
        player.GOLD += gemvalue[i];
        player.inventory[i] = null;
        gemvalue[i] = 0;
        var k = gemorder[i];
        cursor((k % 2) * 40 + 1, (k >> 1) + 4);
        lprintf("", 39);
        bankmessage("");
      }
    }
  }
  return 0;
}



/* function to put interest on your bank account */
function ointerest() { // TODO IS THIS WORKING?
  if (player.BANKACCOUNT < 0) player.BANKACCOUNT = 0;
  if ((player.BANKACCOUNT > 0) && (player.BANKACCOUNT < 500000)) {
    var i = (gtime - lasttime) / 100; /* # mobuls elapsed */
    while ((i-- > 0) && (player.BANKACCOUNT < 500000)) player.BANKACCOUNT += player.BANKACCOUNT / 250;
    if (player.BANKACCOUNT > 500000) player.BANKACCOUNT = 500000; /* interest limit */
  }
  lasttime = (gtime / 100) * 100;
  player.BANKACCOUNT = Math.floor(player.BANKACCOUNT);
}




/*
 *
 *
 * TRADING POST
 *
 *
 */

var tradorder = [];

function otradiven() {
  var iven = player.inventory;
  var i = 0;
  var j = 0;
  /* Print user's iventory like bank */
  for (; i < 26; i++) {
    var item = iven[i];
    if (item) {
      cursor((j % 2) * 40 + 1, (j >> 1) + 8);
      tradorder[i] = 0; /* init position on screen to zero */

      if (item.matches(OPOTION) && !isKnownPotion(item) ||
        item.matches(OSCROLL) && !isKnownScroll(item)) {
        // can't sell unknown stuff
        continue;
      }
      tradorder[i] = j++; /* will display only if identified */
      var fancy = !item.isRing();
      lprcat(`${getCharFromIndex(i)}) ${item.toString(fancy)}`);

    } else {
      tradorder[i] = 0; /* make sure order array is clear */
    }
  } // for
}


function otradepost() {
  setCharCallback(parse_tradepost, true);
  initpricelist();

  clear();

  lprcat("Welcome to the Larn Trading Post. We buy items that explorers no longer find\n");
  lprcat("useful. Since the condition of the items you bring in is not certain,\n");
  lprcat("and we incur great expense in reconditioning the items, we usually pay\n");
  lprcat("only 20% of their value were they to be new. If the items are badly\n");
  lprcat("damaged, we will pay only 10% of their new value.\n\n");

  lprcat("Here are the items we would be willing to buy from you:\n");

  otradiven();

  cl_dn(1, 21);

  lprcat("\nWhat item do you want to sell to us? [Press ");
  lstandout("Esc");
  lprcat(" to leave] ");

}



function cleartradiven(i) {
  var j = tradorder[i];
  cursor((j % 2) * 40 + 1, (j >> 1) + 8);
  lprintf(" ", 39);
  tradorder[i] = 0;
}



function parse_tradepost(key) {
  if (key == ESC) {
    return exitbuilding();
  }

  var value = 0;
  var i = getIndexFromChar(key);

  if (i >= 0 && i <= 26) {
    var item = player.inventory[i];
    if (item == null) {
      storemessage(`You don't have item ${key}!`);
      nap(2000);
      return 0;
    }
    if (item.matches(OSCROLL) && !isKnownScroll(item) ||
      item.matches(OPOTION) && !isKnownPotion(item)) {
      storemessage("Sorry, we can't accept unidentified objects");
      nap(2000);
      return 0;
    }
    if (item.isGem()) {
      value = 20 * (item.arg & 255);
    } //
    else if (item.matches(OLARNEYE)) {
      value = Math.max(10000, 50000 - (((gtime * 7) / 100) * 20));
    } //
    else {
      var found = MAXITM;
      for (var j = 0; j < MAXITM; j++) {
        if (dnd_item[j].item.matches(item)) {
          found = j;
          break;
        }
      }
      if (found == MAXITM) {
        storemessage("Sorry, we can't accept unidentified objects");
        nap(2000);
        return 0;
      }
      if (item.matches(OSCROLL) || item.matches(OPOTION)) {
        value = 0.2 * dnd_item[j + item.arg].price;
      } else {
        var izarg = item.arg;
        value = 0.1 * dnd_item[j].price;

        /* appreciate if a +n object */
        if (izarg >= 0) {
          value *= 2;
        }
        while ((izarg-- > 0) && ((value = 14 * (67 + value) / 10) < 500000));
      }
    }
  } else {
    storemessage("Sorry, but we are not authorized to accept that item");
    return 0;
  }

  /* we have now found the value of the item, and dealt with any error
  cases. print the object's value, let the user sell it */
  value = Math.floor(value);
  storemessage(`Item (${key}) is worth ${value} gold pieces to us. Do you want to sell it?`);

  itemToSell = new DND_Item(value, item, 1);
  setCharCallback(parse_sellitem, true);
}



var itemToSell = null; // GLOBAL



function parse_sellitem(key) {
  if (key == ESC || key == 'N' || key == 'n') {
    setCharCallback(parse_tradepost, true);
    cursor(64, 24);
    lprcat("no thanks"); // TODO this doesn't actually show up
    nap(500);
    storemessage(``);
    itemToSell = null;
    return 1;
  }
  if (key == 'Y' || key == 'y') {
    setCharCallback(parse_tradepost, true);
    cursor(64, 24);
    lprcat("yes"); // TODO this doesn't actually show up
    player.GOLD += itemToSell.price;
    if (player.WEAR === itemToSell.item) player.WEAR = null;
    if (player.WIELD === itemToSell.item) player.WIELD = null;
    if (player.SHIELD === itemToSell.item) player.SHIELD = null;
    player.adjustcvalues(itemToSell.item, false);
    var index = player.inventory.indexOf(itemToSell.item);
    player.inventory[index] = null;
    cleartradiven(index);
    storemessage(``);
    itemToSell = null;
    return 1;
  }
  return 0;
}


/*
 *
 *
 * COMMON
 *
 *
 */
function exitbuilding() {
  IN_STORE = false;
  clear();
  //drawscreen();
  paint();
  return 1;
}

function storemessage(str) {
  //lflush();
  //dndstore();
  cursors();
  cltoeoln();
  lprcat(str);
  cursor(59, 21);
  nap(2000);
}

var dnd_item = null;

function initpricelist() {
  if (dnd_item == null) {
    dnd_item = [];
    for (var i = 0; i < _itm.length; i++) {
      dnd_item[i] = new DND_Item(_itm[i][0], createObject(_itm[i][1], _itm[i][2]), _itm[i][3]);
    }
  }
}
