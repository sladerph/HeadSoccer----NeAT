/*
 *  `config` module
 *  ===============
 *
 *  The game instance settings.
 */

//  Import created game scenes.
import * as scenes from '@/scenes';

//  HINT: Import plugins, custom or trusted third-party ones, here.
// import ExamplePlugin from 'example-plugin';
// import ExampleScenePlugin from '@/plugins/example-scene-plugin';

export const screen_w = 1700;
export const screen_h = 800;
export const brain_h  = 0;

/**
 *  Game canvas width.
 */
export const width = screen_w;

/**
 *  Game canvas height.
 */
export const height = screen_h + brain_h;

/**
 *  Choose a rendering method.
 *
 *  Available options are:
 *
 *    - `WEBGL`: Use WebGL rendering;
 *    - `CANVAS`: Use 'context2D' API rendering method;
 *    - `AUTO`: Phaser will choose, based on device capabilities, the best
 *      rendering method to be used.
 */
export const type = Phaser.AUTO;

/**
 *  Configure physics engines global parameters.
 *
 *  Available systems are:
 *
 *    - `arcade`: Phaser Arcade Physics 2;
 *    - `matter`: Liam Brummitt's (@liabru) Matter.js;
 *    - `impact`: ImpactJS Physics Engine.
 */
export const physics = {
  matter: {
    debug: true,
  },
  default: 'matter'
};

/**
 *  Global parameters of the asset manager.
 */
export const loader = {
  //  HINT: Put all your game assets in the `app/static/assets/` directory.
  path: 'assets/'
};

/**
 *  Declare custom Phaser plugins.
 *
 *  There are two kinds of plugins: Global Plugins and Scene Plugins.
 *
 *  Global plugins are instantiated once per game and persist throughout the
 *  whole session.
 *
 *  Scene plugins are instantiated with each scene and are stored in the
 *  `Systems` class, rather than the global plugin manager. Scene plugins are
 *  tied to the scene life cycle.
 */
export const plugins = {
  global: [
    // {
    //   //  An identifier to associate this plugin instance within Phaser's
    //   //  plugin manager cache. It must be unique to avoid naming clashes
    //   //  with other plugins.
    //   key: 'ExamplePlugin',
    //
    //   //  The imported plugin class.
    //   plugin: ExamplePlugin,
    //
    //   //  The property name your plugin will be aliased to. This plugin
    //   //  will be exposed as a property of your scene context, for example,
    //   //  `this.myPlugin`.
    //   mapping: 'myPlugin',
    //
    //   //  Whether to start up or not this plugin on game's initialization.
    //   //  If omitted or set to `false`, you must request the plugin manager
    //   //  to start up the plugin on a game scene using the method
    //   //  `this.plugins.start('<key>')`.
    //   start: true
    // },
  ],

  scene: [
    // {
    //   //  An identifier for reference in the scene `Systems` class. It must
    //   //  be unique to avoid naming clashes with other plugins.
    //   key: 'ExampleScenePlugin',
    //
    //   //  The imported plugin class.
    //   plugin: ExampleScenePlugin,
    //
    //   //  The property name your plugin will be aliased to. This plugin
    //   //  will be exposed as a property of your scene context, for example,
    //   //  `this.myPlugin`.
    //   mapping: 'myPlugin'
    // }
  ]
};

/**
 *  Export the game title, version and Web address, as defined in the
 *  project package metadata file (`package.json`).
 *
 *  These properties can be accessed in the game configuration object
 *  (`scene.sys.game.config`), under the keys `gameTitle`, `gameVersion` and
 *  `gameURL`, respectively.
 */
export {title, version, url} from '@/../../package.json';

/**
 *  Export created game scenes.
 */
export const scene = Object.values(scenes);
