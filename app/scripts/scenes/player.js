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

  this.leg_len = 150;

  this.foot = parent.matter.add.sprite(x, y, 'foot');
  this.foot.setCircle();

  parent.matter.add.constraint(this.body, this.foot, this.leg_len, 1);

  const cata = parent.matter.world.nextCategory();
  const catb = parent.matter.world.nextCategory();

  this.body.setCollisionCategory(cata);
  this.foot.setCollisionCategory(catb);

  this.body.setCollidesWith([1, 2, cata]);

  this.foot_collider = [2];

  this.foot.setCollidesWith(this.foot_collider);
  // this.foot.setCollidesWith(0);

  this.foot.setVisible(false);
  // this.foot.setMass(10);
  this.foot.setBounce(2);

  this.update = function() {
    this.body.setAngle(0);
    this.body.body.angularVelocity = 0;
    this.body.body.angularSpeed    = 0;

    if (!this.shooting) {
      this.foot.setAngle(90);
      this.foot.body.angularVelocity = 0;
      this.foot.body.angularSpeed = 0;
      this.foot.body.position.x = this.body.body.position.x;
    } else {
      if (this.foot.body.position.y <= this.body.body.position.y) {
        this.foot.body.position.y = this.body.body.position.y;
      }

      this.foot.setAngle(90);
    }

    // window['console'].log(this.foot.body.collisionFilter.category);
  };

  this.shoot = function(ball) {
    // window['console'].log(this.foot.body.collisionFilter);
    this.foot.setVisible(true);
    this.foot.setCollidesWith(this.foot_collider);
    this.foot.body.position.y = this.body.body.position.y + this.leg_len;
    this.foot.body.position.x = this.body.body.position.x;
    this.foot.setVelocity(50, 0);
    // window['console'].log(this.foot.body.collisionFilter);
    // window['console'].log(ball.body.collisionFilter);
    window['console'].log(this.foot);
    return ball;
  };

  this.resetShoot = function() {
    this.foot.setVisible(false);
    this.foot.setCollidesWith([0]);
    // this.foot.setCollisionCategory(4);
  };
}

// export function resetBall(ball) {
//   ball.setCircle();
//   ball.setPosition(screen_w / 2, 100);
//   ball.setVelocity(0, 0);
// }
