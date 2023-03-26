class Game {
    constructor() {
        this.audio = new Audio('assets/muse.mp3');
        this.audio_win = new Audio('assets/win.mp3');
        document.documentElement.requestFullscreen();
        document.body.style.background = "url('assets/bg.png')";
        document.body.style.backgroundSize = 'cover';
        this.run = false;
        this.player = new Player(this.run);
        this.enemy = new Enemy(this.player,this.run,2);
        this.step_story = 1;
        setInterval(() => {
            this.set_run();
        },1);
        this.data_history = ["Wiliam : Un jour, je te remplacerai.",
            "Mr Sananes : Serais-tu capable de me vaincre ?",
            "Wiliam : Oui.",
            "Mr Sananes : Miam.",
            "GG"];
        this.collision_player_enemy();
        this.collision_player_bonus();
        this.create_container_text();
        this.create_text_history();
        this.create_launch_button();
        this.create_light_for_history();
    }

    set_run() {
        if (this.player.hp === 0 || this.enemy.hp === 0) {
            this.run = false;
            this.player.set_run(this.run);
            this.enemy.set_run(this.run);
            this.text_in_start_button.innerHTML = "RESTART";
            if (this.enemy.hp <= 0) {
                this.text_history.innerHTML = this.data_history[4];
                this.audio.pause();
                this.audio_win.play();
                this.container_light.style.top = this.player.y.toString()-75 + 'px';
                this.container_light.style.left = this.player.x.toString()-100    + 'px';
            }
        }
    }

    collision_player_enemy() {
        setInterval(()=> {
            if (this.enemy.isCollide(this.player,this.enemy)) {
                this.enemy.loos();
                this.player.win_hp();
            }
        },this.player.time_to_action)
    }


    collision_player_bonus() {
        setInterval( () => {
            if (this.enemy.isCollide(this.player,this.player.bonus)) {
                this.player.win_hp();
                this.player.bonus.restart();
            }
        },1)
    }

    create_container_text() {
        this.container_text = document.createElement('div');
        this.container_text.style.width = '400px';
        this.container_text.style.height = '200px'
        this.container_text.style.position = 'fixed';
        this.container_text.style.top = '20px';
        this.container_text.style.left = (screen.width/2 - 200).toString() + 'px';
        this.container_text.style.boxShadow = '2px 2px 10px #DDD , -2px -2px 10px #DDD';
        this.container_text.style.display = 'flex';
        this.container_text.style.alignItems = 'center';
        this.container_text.style.justifyContent = 'center';
        this.container_text.style.flexDirection = 'column';
        document.body.appendChild(this.container_text);
    }

    create_text_history() {
        this.text_history = document.createElement('h3');
        this.text_history.innerHTML = this.data_history[0];
        this.text_history.style.color = "#222";
        this.container_text.appendChild(this.text_history);
    }


    create_launch_button() {
        this.text_in_start_button = document.createElement('h4');
        this.text_in_start_button.innerHTML = "NEXT";
        this.text_in_start_button.style.color = "#fff";
        /*------------------------------------*/
        this.start_button = document.createElement('div');
        this.start_button.style.width = '100px';
        this.start_button.style.height = '40px';
        this.start_button.style.background = "#222";
        this.start_button.style.display = 'flex';
        this.start_button.style.justifyContent = 'center';
        this.start_button.style.alignItems = 'center';
        this.start_button.style.cursor = 'pointer';
        this.start_button.style.borderRadius = '20px';
        this.start_button.onclick = () => {
            switch (this.step_story) {
                case 1:
                    this.audio.play()
                    this.text_history.innerHTML = this.data_history[1];
                    this.step_story = 2;
                    this.container_light.style.left = this.enemy.x.toString()-100 + 'px';
                    break;
                case 2:
                    this.text_history.innerHTML = this.data_history[2];
                    this.text_in_start_button.innerHTML = "RESTART";
                    this.step_story = 3;
                    this.container_light.style.left = this.player.x.toString()-100 + 'px';
                    break;
                case 3:
                    this.container_light.style.top = "-1000px";
                    this.text_history.innerHTML = this.data_history[3];
                    this.run = true;
                    this.player.set_run(this.run);
                    this.enemy.set_run(this.run)
                    this.player.restart_game();
                    this.enemy.restart_game();
                    break;
            }
        };
        this.start_button.appendChild(this.text_in_start_button);
        this.container_text.appendChild(this.start_button);
    }


    create_light_for_history() {
        this.container_light = document.createElement('div');
        this.container_light.style.width = "300px";
        this.container_light.style.height = "300px";
        this.container_light.style.borderRadius = "50%";
        this.container_light.style.boxShadow = '2px 2px 20px #F4EFCA, -2px -2px 20px #F4EFCA';
        this.container_light.style.position = 'fixed';
        this.container_light.style.background = "#ffe403";
        this.container_light.style.opacity = ".4";
        this.container_light.style.top = this.player.y.toString()-75 + 'px';
        this.container_light.style.left = this.player.x.toString()-100    + 'px';
        this.container_light.style.transition = '.5s';
        document.body.appendChild(this.container_light);
    }


}


new Game();
