myAddEvent(window, 'load', function () {
    //---------------------------------banner--------------------------------------------
    function Banner() {
        this.container = getByClass(document, 'bn_floor')[0];								//获取容器
        this.banner = getByClass(this.container, 'banner')[0].children;						//从容器里获取每一个banner
        this.page = getByClass(this.container, 'slider')[0].getElementsByTagName('li');		//从容器里获取每一个按钮
        this.interval = 5000;																//设置轮播时间间隔
        this.nowNum = 0;																	//设置目前轮播的张数(第0张);
        var _this = this;																	
        this.container.onmouseout = function () {
            _this.startMove();
        }
        this.container.onmouseover = function () {
            clearInterval(_this.timer);
        }
        for (var i = 0; i < this.page.length; i++) {
            this.page[i].index = this.banner[i].index = i;
            this.page[i].onmouseover = function () {
                deleteClass(_this.page[_this.oldObj.index], 'active');
                addClass(this,'active');
                _this.nowNum = this.index;
                _this.opacity();
            }
        }
        this.opacity();
        this.startMove();
    }
    Banner.prototype.show = function (obj) {
        if(this.oldObj)deleteClass(this.page[this.oldObj.index], 'active');
        addClass(this.page[obj.index], 'active');
        obj.style.zIndex = 1;
        startMove(obj, { "opacity": 100 });
        this.oldObj = obj;
    }
    Banner.prototype.hide = function (obj) {
        obj.style.zIndex = 0;
        startMove(obj, { "opacity": 0 });
    }
    Banner.prototype.opacity = function () {
        if (this.oldObj) this.hide(this.oldObj);
        this.show(this.banner[this.nowNum]);
        this.nowNum < this.banner.length - 1 ? this.nowNum++ : this.nowNum = 0;
    }
    Banner.prototype.startMove = function () {
        var _this = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            _this.opacity()
        }, this.interval);
    }
    new Banner();
    //---------------------------------brand--------------------------------------------
    function Brand() {
        this.container = getByClass(document, 'brand')[0];
        this.tab = getByClass(this.container, 'tab')[0].children;
        this.panel = getByClass(this.container, 'bs')[0].children;;
        var _this = this;
        for (var i = 0; i < this.tab.length; i++) {
            this.tab[i].index = this.panel[i].index = i;
            this.tab[i].onclick = function () {
                _this.click(this);
            }
        }
    }
    Brand.prototype.click = function (obj) {
        this.deleteClass();
        addClass(obj, 'active');
        addClass(this.panel[obj.index], 'active');
    }
    Brand.prototype.deleteClass = function () {
        for (var i = 0; i < this.tab.length; i++) {
            deleteClass(this.tab[i],'active');
            deleteClass(this.panel[i], 'active');
        }
    }
    new Brand();
});