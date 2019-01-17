export default function Player(x, y, id, parent) {
  this.id     = id;
  this.parent = parent;
  this.shooting = false;
  this.shooting_t = 0;

  // this.body   = parent.matter.add.sprite(x, y, 'idle', null, {shape: shapes.shooting});
  this.body   = parent.matter.add.sprite(x, y, 'idle');
  this.body.setCircle();
  this.body.setBounce(0);
  this.body.setFriction(1);
  this.body.body.label = 'Player' + id.toString();

  this.leg_len = 120;

  this.foot = parent.matter.add.sprite(x, y, 'foot');

  parent.matter.add.constraint(this.body, this.foot, this.leg_len, 0);

  const cata = parent.matter.world.nextCategory();
  const catb = parent.matter.world.nextCategory();

  this.body.setCollisionCategory(cata);
  this.foot.setCollisionCategory(catb);
  this.body.setCollidesWith([1, cata]);

  this.foot_collider = [2, catb];

  this.foot.setCollidesWith(0);

  this.foot.setVisible(false);

  this.update = function() {
    this.body.setAngle(0);
    this.body.body.angularVelocity = 0;
    this.body.body.angularSpeed    = 0;

    if (!this.shooting) {
      this.foot.setAngle(90);
      this.foot.body.angularVelocity = 0;
      this.foot.body.angularSpeed = 0;
      this.foot.body.position.x = this.body.body.position.x;
    }
  };

  this.shoot = function() {
    this.foot.setVisible(true);
    this.foot.setCollidesWith(this.foot_collider);
  };

  this.resetShoot = function() {
    this.foot.setVisible(false);
    this.foot.setCollidesWith(0);
  };
}

// function resetBall(ball) {
//   ball.setCircle();
//   ball.setPosition(screen_w / 2, 100);
//   ball.setVelocity(0, 0);
// }
