class Player {
    constructor(run) {
        this._x = 100;
        this._y = screen.height - 325;
        this._height = 150;
        this._width = 100 ;
        this._hp = 10;
        this.speed = 20;
        this._run = run;
        this.can_loos = true;
        this.speed_squatting = 50;
        this.time_to_action = 700;
        this.bar_hp = new Bar("#0F0",this._hp,50);
        this.create_player();
        this.keyboard_event();
        this.can_jump = true;
        this.can_squatting = true;
        this.speed_jump = 300;
        this.bonus = new Bonus(run);
        this.sound_jump = new Audio('assets/jump.mp3');
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

    win_hp() {
        this._hp++;
        this.bar_hp.loos(this._hp);
    }

    loose_hp() {
        this._hp--;
        this.bar_hp.loos(this._hp);
    }

    set_run(run) {
        this._run = run;
        this.bonus.set_run(run);
    }

    reset_position() {
        this._x = 100;
        this.player_rect.style.left = this._x.toString() + 'px';
    }

    restart_game() {
        this._x = 100;
        this.player_rect.style.left = this._x.toString() + 'px';
        this._hp = 10;
        this.bar_hp.loos(this._hp);
        this.bonus.restart();
    }


    create_player() {
        this.player_rect = document.createElement('div');
        this.player_rect.className = "player";
        this.player_rect.style.background = "url('assets/player.png')";
        this.player_rect.style.backgroundSize = 'cover';
        this.player_rect.style.transition = '.1s';
        this.player_rect.style.width = this._width.toString() + 'px';
        this.player_rect.style.height = this._height.toString() + 'px';
        this.player_rect.style.position = 'fixed';
        this.player_rect.style.top = this._y.toString() + 'px';
        this.player_rect.style.left = this._x.toString() +'px';
        this.player_rect.style.borderRadius = "20px 20px 0 0";
        document.body.appendChild(this.player_rect);
    }

    keyboard_event() {
        document.addEventListener('keydown', (event)  => {
            if (this._run === true) {
                switch (event.key) {
                    case "d":
                        if (this._x < screen.width) {
                            this._x += this.speed;
                            document.querySelector(".player").style.left = this._x.toString() + 'px';
                        }
                        break;
                    case "q":
                        if (this._x > 0) {
                            this._x -= this.speed;
                            document.querySelector(".player").style.left = this._x.toString() + 'px';
                        }
                        break;
                    case "s":
                        if (this.can_squatting === true) {
                            this._height -= this.speed_squatting;
                            this._y += this.speed_squatting;
                            this.player_rect.style.height = this._height.toString() + 'px';
                            this.player_rect.style.top = this._y.toString() + 'px';
                            this.can_squatting = false;
                            setTimeout(() => {
                                this._height += this.speed_squatting;
                                this._y -= this.speed_squatting;
                                this.player_rect.style.height = this._height.toString() + 'px';
                                this.player_rect.style.top = this._y.toString() + 'px';
                                this.can_squatting = true;
                            }, this.time_to_action);
                        }
                        break;
                    case " ":
                        if (this.can_jump === true) {
                            this.sound_jump.play();
                            this._y -= this.speed_jump;
                            document.querySelector(".player").style.top = this._y.toString() + 'px';
                            this.can_jump = false;
                            setTimeout(() => {
                                this._y += this.speed_jump;
                                document.querySelector(".player").style.top = this._y.toString() + 'px';
                                this.can_jump = true;
                            }, this.time_to_action);
                        }
                        break;
                }
            }
        });
    }
}
