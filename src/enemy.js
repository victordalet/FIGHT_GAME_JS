class Enemy {
    constructor(player,run,nb_proj) {
        this.player = player;
        this._run = run;
        this._x = screen.width -200;
        this._y = screen.height - 350;
        this._width = 100;
        this._height = 150;
        this._hp = 3;
        this.nb_projectile = nb_proj;
        this.create_enemy();
        this.bar_hp = new Bar("#F00",this._hp,(screen.width -400));
        this.step_animation = false;
        this.speed_animation = 30;
        this.animation();
        this.array_of_projectile = [];
        for (let i = 0 ; i < this.nb_projectile ; i++) {
            this.array_of_projectile.push(new Projectile(this._run,i))
        }
        this.collision_player_projectile();
    }

    /*-------------------------GETTER---------------------------*/

    get x() {
        return this._x;
    }

    get y() {
        return this._y
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get hp() {
        return this._hp;
    }

    /*-------------------------FUNCTION---------------------------*/

    set_run(run) {
        this._run = run;
        for (let i = 0 ; i < this.nb_projectile ; i++) {
            this.array_of_projectile[i].set_run(run);
        }
    }

    restart_game() {
        this._hp = 3;
        this.bar_hp.loos(this._hp);
    }

    create_enemy() {
        this.enemy_rect = document.createElement('div');
        this.enemy_rect.className = "enemy";
        this.enemy_rect.style.background = "url('assets/enemy.png')";
        this.enemy_rect.style.backgroundSize = 'cover';
        this.enemy_rect.style.width = this._width.toString() + 'px';
        this.enemy_rect.style.height = this._height.toString() + 'px';
        this.enemy_rect.style.position = 'fixed';
        this.enemy_rect.style.transition = '.5s'
        this.enemy_rect.style.top = this._y.toString() + 'px';
        this.enemy_rect.style.left = this._x.toString() +'px';
        this.enemy_rect.style.borderRadius = "20px 20px 0 0";
        this.enemy_rect.style.zIndex = "2";
        document.body.appendChild(this.enemy_rect);
    }

    animation() {
        setInterval( () => {
            if (this._run === true) {
                if (this.step_animation === true) {
                    this._y += this.speed_animation;
                    this.step_animation = false;
                } else {
                    this._y -= this.speed_animation;
                    this.step_animation = true;
                }
                this.enemy_rect.style.top = this._y;
                document.querySelector('.enemy').style.top = this._y.toString() + 'px';
            }
        },500)
    }

    loos() {
        this._hp--;
        this.bar_hp.loos(this._hp);
        this.player.reset_position();
    }

    /*-------------------------COLLISION---------------------------*/

    isCollide(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    collision_player_projectile() {
        setInterval(() => {
            for (let i = 0 ; i < this.nb_projectile ; i++) {
                if (this.isCollide(this.player, this.array_of_projectile[i])) {
                    if (this.player.can_loos === true) {
                        this.player.loose_hp();
                        this.player.can_loos = false;
                        setTimeout(() => {
                            this.player.can_loos = true;
                        }, this.player.time_to_action)
                    }
                }
            }
        },1)
    }


}
