class Bonus {
    constructor(run) {
        this.range = (Math.random() * (screen.width - 200))
        this._width = 20;
        this._height = 20;
        this._x = this.range;
        this._y = -100;
        this._speed = 1;
        this._run = run;
        this.create_bonus();
        this.animation();
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

    /*-----------------------------FUNCTION-------------------------*/


    set_run(run) {
        this._run = run;
    }


    create_bonus() {
        this.bonus_rect = document.createElement('div');
        this.bonus_rect.style.width = this._width.toString() + 'px';
        this.bonus_rect.style.height = this._height.toString() + 'px';
        this.bonus_rect.style.position = 'fixed';
        this.bonus_rect.style.top = this._y.toString() + 'px';
        this.bonus_rect.style.left = this._x.toString() + 'px';
        this.bonus_rect.style.background = "url('assets/bonus.png')";
        this.bonus_rect.style.backgroundSize = 'cover';
        document.body.appendChild(this.bonus_rect);
    }

    animation() {
        setInterval(() => {
            if (this._run === true) {
                this._y += this._speed;
                if (this._y > screen.height) {
                    this._y = -100;
                    this._x = (Math.random() * (screen.width - 200));
                }
                this.bonus_rect.style.top = this._y.toString() + 'px';
                this.bonus_rect.style.left = this._x.toString() + 'px';
            }
        },1)
    }

    restart() {
        this._y = -100;
        this._x = (Math.random() * (screen.width - 200));
        this.bonus_rect.style.top = this._y.toString() + 'px';
        this.bonus_rect.style.left = this._x.toString() + 'px';
    }
}
