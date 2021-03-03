[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<br>

![logo](assets/tentacles-skull.png)

_"[Tentacle scull icon](https://game-icons.net/1x1/lorc/tentacles-skull.html)"
by [Lorc](https://lorcblog.blogspot.com/)
is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) 
/ colorized_

# Weirdo

A weird AI to control creeps

## Status 
At the moment... Hello World!

## Structure

### Roles

Roles are responsible for choosing an appropriate task to work towards
a specific goal. For example the starter role will harvest energy and bring
it to the spawn at the beginning of the game, in order to "start up" 
the game.

### Tasks
Tasks handle the logic for a creep to do basic things, like 
getting some energy or upgrade the controller.
In order to do so each task will create an action when it is 
called. A task will also handle the selection of appropriate
targets and the caching of the current target.

### Actions
An action is command which a creep can execute in one tick.
For example `creep.moveTo()` or `creep.harvest()`.

## Codestyle

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)