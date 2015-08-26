You can play Larn here: http://prim.io/larn/

todo:
* warn player that back button, window close will kill the game
* disable debugging shortcuts
  - check for localhost, 127.0.0.1?
* warn that save game is deleted after it's loaded
* firefox / ie / safari support http://stackoverflow.com/questions/14633947/alternative-css-font-settings-for-different-browsers
- nap & show monster movement during when falling asleep
- use mousetrap to parse special keys, parse() for the rest
- update build number in version commmand
- allow spaces in lognname
- look for TODO/HACK
- save checkpoint in a thread?

extras:
- global scoreboard, use hmac to secure?
- put platinum dragon beside eye of larn
- secure save game (save hash key in a cookie)
- use different wizard passwords to
  - restore backup save file
  - restore save file created when window closed
  - enable debugging keys
- highlight changed attributes
- color (mcolor/ocolor)
- improve smart monster movement beyond existing algorithm which gets stuck sometimes
- add larn 12.4 to repo
  - https://sites.google.com/site/edenicholas/roguelikes/win32-larn
  - patch pit bug // BUGFIX
  - patch smart monster movement // UPGRADE
- ipad support
- more authentic font
- shift-arrow to open door?

bugs:
- hitting ESC on game start/deposit/withdrawal prints 27, backspace deletes one too many chars
- strextra can get out of balance? caused by heroism/giant strength
- casting sph twice in the same direction will always kill the player
- parsing < and > in lprcat() isn't perfect, especially with newlines, and tags at EOL
? altars are broken?
? should lit 'discover' beyond where player has seen?
? rapidly withdrawing 1 gold from bank adds a 1 to the end of player.GOLD
    - need to do one more action before leaving bank?
- rothe/poltergeist/vampire should be born awake -> should they move during stealth?
- test aggravate monster (should disable stealth too?)
- test haste monsters

rename/refactor:
- player.level.items[][] -> item
- player.level.monsters[][] -> monster
- player.level.know -> know
- item() -> return item at player.x/y
- arg() -> return item.arg at player.x/y
- monst() -> monster at player.x/y
- know(var) -> set know[][] at player.x/y
- getItem(x,y) -> itemAt(x,y)
- non_blocking isn't used any more
- callback nomenclature & functions could be improved
- napping
- IN_STORE
- updateLog
- oldx, oldy
