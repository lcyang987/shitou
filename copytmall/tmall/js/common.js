myAddEvent(window, 'load', function () {
    //------------------------------------classify------------------------------------------------
    function Classify() {
        this.container = getByClass(document, 'classify')[0];
        this.tabs = getByClass(this.container, 'c_main')[0].children;
        this.panel = getByClass(this.container, 'c_hover')[0];
        this.item = this.panel.children;
        var _this = this;
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].index = i;
            this.tabs[i].onmouseover = function () {
                _this.mouseover(this.index);
                _this.oldIndex = this.index;
            }
        }
        this.panel.onmouseover = function () {
            _this.oldFn('block');
            _this.show();
        }
        this.container.onmouseout = function () {
            _this.oldFn('none');
            _this.hide();
        }
    }
    Classify.prototype.mouseover = function (index) {
        this.oldFn('none');
        this.show();
        this.item[index].style.display = 'block';
    }
    Classify.prototype.oldFn = function (isBlock) {
        if (this.oldIndex || this.oldIndex == 0) {
            this.item[this.oldIndex].style.display = isBlock;
        }
    }
    Classify.prototype.show = function () {
        this.panel.style.display = 'block';
        startMove(this.panel, { "left": 190, "opacity": 99 });
    }
    Classify.prototype.hide = function () {
        var _this = this;
        startMove(this.panel, { "left": 170, "opacity": 0 }, function () {
            _this.panel.style.display = 'none';
        });
    }
    new Classify();
    //---------------------------------toolbar--------------------------------------------
    function Toolbar() {
        this.container = getByClass(document, 'expand')[0];
        this.plugin = getByClass(this.container, 'plugin')[0];
        this.toolbar = getByClass(this.container, 'toolbar')[0];
        this.tab = this.toolbar.getElementsByTagName('a');
        this.unlock = true;
        var _this = this;
        for (var i = 0; i < this.tab.length; i++) {
            if (getByClass(this.tab[i], 'tool_txt')[0]) {
                this.tab[i].txt = getByClass(this.tab[i], 'tool_txt')[0];
                this.tab[i].onmouseover = function () {
                    _this.mouseover(this.txt);
                }
                this.tab[i].onmouseout = function () {
                    _this.mouseout(this.txt);
                }
            }
            if (this.tab[i].getAttribute('data-title')) {
                this.tab[i].open=false;
                this.tab[i].onclick = function (ev) {
                    var oEvent = ev || window.event;
                    oEvent.preventDefault ? oEvent.preventDefault() : oEvent.returnValue = false;
                    _this.click(this,this.getAttribute('data-title'));
                }
            }
        }
    }
    Toolbar.prototype.mouseover = function (obj) {
        obj.style.display = 'block';
        startMove(obj, { "opacity": 100, "right": 35 });
    }
    Toolbar.prototype.mouseout = function (obj) {
        startMove(obj, { "opacity": 0, "right": 70 }, function () {
            obj.style.display = 'none';
        });
    }
    Toolbar.prototype.click = function (obj, title) {
        var _this = this;
        if (obj.open) {
            startMove(this.container, { "right": 0 }, function () {
                obj.open = false
                _this.initOldObj();
                _this.oldObj = null;
            });
            return false;
        }
        if (!this.unlock) {
            return false;
        }
        this.unlock = false;
        for (var i = 0; i < this.tab.length; i++) {
            if (this.tab[i].getAttribute('data-title')) {
                this.tab[i].open = false;
            }
        }
        obj.open = true;
        for (var i = 0; i < this.plugin.children.length; i++) {
            if (new RegExp(title + '\\b').test(this.plugin.children[i].className)) {
                var width = parseInt(getStyle(this.plugin.children[i], 'width'))-20;
                this.plugin.children[i].style.display = 'block';
                this.plugin.children[i].style.zIndex = 1;
                startMove(this.plugin.children[i], { "top": 0 });
                if (this.oldObj) {
                    this.nowObj = this.plugin.children[i];
                    this.oldObj.style.zIndex = 0;
                    this.oldObj.style.overflowY = 'hidden';
                    this.oldObj.scale = 100;
                    startMove(this.oldObj, { "scale": 80, "opacity": 0, "top": 20 }, function () {
                        _this.initOldObj();
                        _this.unlock = true;
                    });
                } else {
                    this.oldObj = this.plugin.children[i];
                    this.unlock = true;
                }
                if (this.container.style.right && this.container.style.right!='0px') {
                    this.container.style.right = width + 'px';
                } else {
                    startMove(this.container, { "right": width });
                }
            }
        }
    }
    Toolbar.prototype.initOldObj = function () {
        this.oldObj.style.display = 'none';
        this.oldObj.style.opacity = 1;
        this.oldObj.style.filter = "alpha(opacity=100)";
        this.oldObj.style.top = "100%";
        this.oldObj.style.left = 0;
        this.oldObj.style.webkitTransform = this.oldObj.style.transform = 'scale(1)';
        this.oldObj.style.overflowY = 'scroll';
        this.oldObj = this.nowObj;
    }
    new Toolbar();
    //---------------------------------map--------------------------------------------
    function Map() {
        this.container = document.createElement('ul');
        document.body.appendChild(this.container);
        var arr = [
            { name: '首页', url: 'index.html' },
            { name: '列表页', url: 'list.html' },
            { name: '详情页', url: 'detail.html' },
            { name: '购物车页', url: 'cart.html' },
            { name: '订单页', url: 'order.html' },
            { name: '登录页', url: 'login.html' },
            { name: '注册页', url: 'apply.html' },
        ];
        for (var i = 0; i < arr.length; i++) {
            this['btn' + i] = document.createElement('a');
            this['btn' + i].innerHTML = arr[i].name;
            this['btn' + i].href = arr[i].url;
            with (this['btn' + i].style) {
                display = 'block';
                height = lineHeight = 30 + 'px';
                textAlign = 'center';
            }
            this.container.appendChild(this['btn' + i]);
        }
        var _this = this;
        this.initStyle=function(){
            with (this.container.style) {
                width=100+'px'
                position = 'fixed';
                top = document.documentElement.clientHeight / 2 - this.container.offsetHeight / 2 + 'px';
                left = 10+'px';
            }
        }
        _this.initStyle()
        this.container.innerHTML += 'common.js最下面'
    }
    new Map();
});

