class Projectile {
    constructor(run,time) {
        this._run = run;
        this._x = screen.width -200;
        this._y = screen.height - (200 + parseInt(Math.random() * 100));
        this._width = 50;
        this._height = 30;
        this.speed = 2;
        this.time_to_action = 200 * time;
        this.create_projectile();
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

    /*-------------------------FUNCTION---------------------------*/

    set_run(run) {
        this._run = run;
    }

    create_projectile() {
        this.projectile_rect = document.createElement('div');
        this.projectile_rect.className = "projectile";
        this.projectile_rect.style.background = "url('assets/ob"+parseInt(Math.random() * 7).toString() +".png')";
        this.projectile_rect.style.backgroundSize = 'cover';
        this.projectile_rect.style.width = this._width + 'px';
        this.projectile_rect.style.height = this._height + 'px';
        this.projectile_rect.style.position = 'fixed';
        this.projectile_rect.style.top = this._y.toString() + 'px';
        this.projectile_rect.style.left = this._x.toString() +'px';
        document.body.appendChild(this.projectile_rect);
    }

    animation() {
        setInterval(() => {
            if (this._run === true) {
                this._x -= this.speed;
                this.projectile_rect.style.left = this._x.toString() + 'px';
                if (this._x < 0) {
                    setTimeout( () => {
                        this.go_to_base();
                    },this.time_to_action)

                }
            }
        }, 1);
    }

    go_to_base() {
        this.projectile_rect.style.background = "url('assets/ob"+parseInt(Math.random() * 7).toString() +".png')";
        this._x = screen.width -200;
        this._y = screen.height - (200 + parseInt(Math.random() * 100));
    }
}
