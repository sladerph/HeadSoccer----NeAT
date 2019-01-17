import {screen_w, screen_h} from '@/config';
import Player from '@/scenes/player';
// import screen_h from '@/config';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({key: 'Game'});
  }

  preload() {
    this.load.image('idle', '@/../idle.png');
    this.load.image('move_right', '@/../right.png');
    this.load.image('move_left', '@/../left.png');
    this.load.image('jump_up', '@/../jumping.png');
    this.load.image('jump_down', '@/../falling.png');
    // this.load.image('kick', '@/../shooting.png');
    this.load.image('kick', '@/../shooting-no-foot.png');
    this.load.image('hills', '@/../hills.jpg');
    this.load.image('ball', '@/../ball.png');
    this.load.image('foot', '@/../foot.png');
    this.load.json('shapes', '@/../shapes.json');
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    this.add.image(0, 0, 'hills').setOrigin(0, 0);
    this.ball = this.matter.add.sprite(screen_w / 2, 100, 'ball');

    // player = this.matter.add.sprite(screen_w / 2 - 500, 400, 'idle');
    // player.setCircle();
    // player.setBounce(0);
    // player.setFriction(1);
    // player.setGravityY(300);
    this.player = new Player(screen_w / 2 - 500, 400, 1, this);
    // p = new Player(screen_w / 2 + 500, 400, 2, this);

    this.ball.setCircle();
    this.ball.setFriction(0.05);
    this.ball.setFrictionAir(0.001);
    this.ball.setBounce(0.7);
    this.ball.body.label = 'Ball';
    this.ball.setCollisionCategory(2);
    // ball.setGravityY(500);

    this.anims.create({
      key: 'Right',
      frames: [{key: 'move_right'}, {key: 'idle'}],
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Left',
      frames: [{key: 'move_left'}, {key: 'idle'}],
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'Up',
      frames: [{key: 'jump_up'}],
      frameRate: 20
    });

    this.anims.create({
      key: 'Down',
      frames: [{key: 'jump_down'}],
      frameRate: 20
    });

    this.anims.create({
      key: 'Idle',
      frames: [{key: 'idle'}],
      frameRate: 20
    });

    this.anims.create({
      key: 'Shoot',
      frames: [{key: 'kick'}],
      frameRate: 20
    });

    this.player.body.anims.play('Down', true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.matter.world.setBounds(0, 0, screen_w, screen_h);


  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    this.player.body.setVelocityX(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-5);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(5);
    }

    if (this.cursors.up.isDown && this.player.body.body.position.y >= 701) {
      this.player.body.setVelocityY(-10);
      this.player.body.anims.play('Up', true);
    } else if (this.player.body.body.velocity.y > 0 && this.player.body.body.position.y < 701) {
      this.player.body.anims.play('Down', true);
    } else if (this.player.body.body.position.y >= 701 && Math.abs(this.player.body.body.velocity.x) <= 2) {
      this.player.body.anims.play('Idle', true);
    } else if (this.player.body.body.velocity.x < -2 && this.player.body.body.position.y >= 701) { // Going left.
      this.player.body.anims.play('Left', true);
    } else if (this.player.body.body.position.y >= 602 && this.player.body.body.velocity.x > 2) {
      this.player.body.anims.play('Right', true);
    }
    if (this.cursors.space.isDown && !this.player.shooting) {
      // this.player.body.anims.play('Shoot', true);
      // this.player.shooting = true;
      // this.player.shooting_t = 0;
    }

    if (this.player.shooting) {
      this.player.shooting_t++;
      if (this.player.shooting_t > 25) {
        this.player.shooting = false;
      }
      this.player.body.anims.play('Shoot', true);
    }

    this.player.body.setAngle(0);
    this.player.body.body.angularVelocity = 0;
    this.player.body.body.angularSpeed    = 0;
  }
}
