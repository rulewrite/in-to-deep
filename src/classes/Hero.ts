import Drawable from '@interfaces/Drawable';
import Mover from './Mover';

export default class Hero extends Mover implements Drawable {
  private static readonly INITIAL_ACCELERATION = 1;
  private static readonly INITIAL_MAXIMUM_X_VELOCITY = 5;
  private static readonly INITIAL_JUMP_POWER = 4;
  private static readonly INITIAL_COLOR = '#d40000';
  private static readonly HEAD_WIDTH = 10;

  private direction: Direction = 'RIGHT';
  private get vector() {
    if (this.direction === 'RIGHT') {
      return 1;
    }

    return -1;
  }

  isJumping = false;
  isGrounded = false;
  private acceleration = Hero.INITIAL_ACCELERATION;
  private maximumXVelocity = Hero.INITIAL_MAXIMUM_X_VELOCITY;
  private jumpPower = Hero.INITIAL_JUMP_POWER;

  private get headX() {
    return this.direction === 'LEFT' ? this.x : this.right;
  }
  private get headY() {
    return this.y + this.halfHeight;
  }

  private get bodyX() {
    return this.direction === 'LEFT'
      ? this.x + Hero.HEAD_WIDTH
      : this.right - Hero.HEAD_WIDTH;
  }

  private get tailX() {
    return this.direction === 'LEFT' ? this.right : this.x;
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    public color = Hero.INITIAL_COLOR
  ) {
    super(x, y, width, height);
  }

  go(direction: Direction) {
    this.direction = direction;
    this.xVelocity += this.vector * this.acceleration;

    if (Math.abs(this.xVelocity) > this.maximumXVelocity) {
      this.xVelocity = this.vector * this.maximumXVelocity;
    }
  }

  jump() {
    if (!this.isGrounded || this.isJumping) {
      return;
    }

    this.isJumping = true;
    this.isGrounded = false;
    this.yVelocity = -this.jumpPower;
  }

  collide(collisionDirection: CollisionDirection) {
    switch (collisionDirection) {
      case 'TOP':
        this.yVelocity *= -1; // 탄성 1
        break;
      case 'BOTTOM':
        this.yVelocity = 0;
        this.isGrounded = true;
        this.isJumping = false;
        break;
      case 'LEFT':
        this.xVelocity = 0;
        this.isJumping = false;
        break;
      case 'RIGHT':
        this.xVelocity = 0;
        this.isJumping = false;
        break;
    }
  }

  update() {
    this.xVelocity *= 0.8; // 마찰력

    this.updateCoordinates();
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(this.headX, this.headY);
    context.lineTo(this.bodyX, this.top);
    context.lineTo(this.tailX, this.top);
    context.lineTo(this.tailX, this.bottom);
    context.lineTo(this.bodyX, this.bottom);
    context.fill();
  }
}
