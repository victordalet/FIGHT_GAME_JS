class Bar {
    constructor(color,hp,left) {
        this.bar = document.createElement('div');
        this.bar.style.height = '50px';
        this.bar.style.width = (100 * hp ).toString() +'px';
        this.bar.style.background = color;
        this.bar.style.overflow = 'hidden';
        this.bar.style.position = 'relative';
        this.bar.style.left = '-50px';
        this.bar.style.top = "5px";
        this.bar.style.transition = '.5s';
        this.bar.style.borderRadius = '20px';
        this.bar.style.zIndex = "2";
        /*--------------------------*/
        this.container_bar = document.createElement('div');
        this.container_bar.style.height = '60px';
        this.container_bar.style.width = '320px';
        this.container_bar.style.overflow = 'hidden';
        this.container_bar.style.position = 'fixed';
        this.container_bar.style.background = "#222";
        this.container_bar.style.top = '50px';
        this.container_bar.style.left = left.toString() + 'px';
        /*--------------------------*/
        this.container_bar.appendChild(this.bar);
        document.body.appendChild(this.container_bar);
    }

    loos(hp) {
        this.bar.style.width = (100 * hp + 50).toString() +'px';
    }

}
