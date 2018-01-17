// JavaScript Document

window.onload = function () {
    /*---------------------------------product---------------------------------------------*/
	var pro=getByClass(document,'pro');
	for(var o=0;o<pro.length;o++){
		var pro_tab=getByClass(pro[o],'pro_tab')[0];
		if(pro_tab){			
			for(var i=0;i<pro_tab.children.length;i++){
				if(/active/.test(pro_tab.children[i].children[0].className)){	
					if(getStyle(pro_tab.children[i].children[0],'borderLeftWidth').split('px')[0]<1){
						pro_tab.children[i].children[0].style.borderBottom='1px solid transparent';
					}
				}
			}
			for(var i=0;i<pro_tab.children.length;i++){
				pro_tab.children[i].index=i;
				pro_tab.children[i].onmouseover=function (){
					for(var i=0;i<this.parentNode.children.length;i++){
						deleteClass(this.parentNode.children[i].children[0],'active');
					}
					var thisParent=getByClass(getOffsetParent(this,'pro'),'pro_opt');
					for(var i=0;i<thisParent.length;i++){
						thisParent[i].style.display='none';
					}
					thisParent[this.index].style.display='block';
					addClass(this.children[0],'active');
					if(getStyle(this.children[0],'borderLeftWidth').split('px')[0]<1){
						this.children[0].style.borderBottom='1px solid transparent';
					}
				}
			}
		}
	}
    /*---------------------------------classify---------------------------------------------*/
	var navBox = getByClass(document, 'header_nav_box')[0];
	var classify = getByClass(document, 'all_classify')[0];
	var obj = getByClass(classify, 'acb')[0];
	var hover = getByClass(classify, 'nav_hover')[0];
	var oldTop = parseInt(getStyle(hover, 'top'));
	for(var i=0;i<obj.children.length;i++){
		obj.children[i].index=i;
		obj.children[i].onmouseover=function (){
			for(var i=0;i<hover.children.length;i++){
				hover.children[i].style.display='none';
			}
			hover.style.display='block';
			addClass(this,'active');
			hover.nowActive=this.index;
			hover.children[this.index].style.display = 'block';
			if (document.body.scrollTop > navBox.offsetTop + navBox.offsetHeight) {
			    hover.style.top = oldTop + document.body.scrollTop - (navBox.offsetTop + navBox.offsetHeight) + 'px';
			} else if (document.documentElement.scrollTop > navBox.offsetTop + navBox.offsetHeight) {
			    hover.style.top = oldTop + document.documentElement.scrollTop - (navBox.offsetTop + navBox.offsetHeight) + 'px';
			} else {
			    hover.style.top = oldTop + 'px';
			}
		}
		obj.children[i].onmouseout=function (){
			deleteClass(this,'active');
			hover.style.display='none';
		}
	}

	hover.onmouseover=function (){
		addClass(obj.children[this.nowActive],'active');
		hover.style.display='block';
	}
	hover.onmouseout=function (){
		deleteClass(obj.children[this.nowActive],'active');
		hover.style.display='none';
	}

    /*---------------------------------toolbar---------------------------------------------*/
	var fixedR = getByClass(document, 'fixed_r')[0];
	var toolbar = getByClass(fixedR, 'toolbar')[0];
	var toolbarAnother = getByClass(fixedR, 'toolbar_another')[0];
	for(var i=0;i<toolbar.children.length;i++){
		toolbar.children[i].onmouseover=function (){
			addClass(this,'active');
		}
		toolbar.children[i].onmouseout=function (){
			deleteClass(this,'active');
		}
	}
	for(var i=0;i<toolbarAnother.children.length;i++){
		toolbarAnother.children[i].onmouseover=function (){
			addClass(this,'active');
		}
		toolbarAnother.children[i].onmouseout=function (){
			deleteClass(this,'active');
		}
	}
    /*---------------------------------banner---------------------------------------------*/
	var bannerBox = getByClass(document, 'banner')[0];
	var banner = getByClass(bannerBox, 'content')[0];
	var slider = getByClass(bannerBox, 'slider')[0];

	var sliderPrev = getByClass(slider, 'prev')[0];
	var sliderNext = getByClass(slider, 'next')[0];

	var sliderPage = getByClass(slider, 'page')[0];
    
	var i = 0;
	banner.children[0].style.zIndex = 1;
	startMove(banner.children[0], { opacity: 100 });
	function fnOpacity(minus) {
	    for (var j = 0; j < banner.children.length; j++) {
	        banner.children[j].style.zIndex = 0;
	        deleteClass(sliderPage.children[j],'active');
	    }
	    startMove(banner.children[i], { opacity: 0 });
	    if (minus) {
	        if (i - 1 < 0) i = banner.children.length;
	        startMove(banner.children[i - 1], { opacity: 100 });
	        banner.children[i - 1].style.zIndex = 1;
	        addClass(sliderPage.children[i-1], 'active');
	        i--;
	    } else {
	        if (i + 1 == banner.children.length) i = -1;
	        startMove(banner.children[i + 1], { opacity: 100 });
	        banner.children[i + 1].style.zIndex = 1;
	        addClass(sliderPage.children[i +1], 'active');
	        i++;
	    }
	}
	var interval = 2000;
	var bannerTimer = setInterval(fnOpacity, interval);
	bannerBox.onmouseover = function () {
	    sliderPrev.style.display = sliderNext.style.display = 'block';
	    clearInterval(bannerTimer);
	}
	bannerBox.onmouseout = function () {
	    sliderPrev.style.display = sliderNext.style.display = 'none';
	    clearInterval(bannerTimer);
	    bannerTimer = setInterval(fnOpacity, interval);
	}

	sliderPrev.onclick = function () {
	    clearInterval(bannerTimer);
	    fnOpacity(true)
	}
	sliderNext.onclick = function () {
	    clearInterval(bannerTimer);
	    fnOpacity()
	}

	for (var k = 0; k < sliderPage.children.length; k++) {
	    sliderPage.children[k].index = k;
	    sliderPage.children[k].onmouseover = function () {
	        clearInterval(bannerTimer)
	        if (i != this.index) {
	            deleteClass(sliderPage.children[i],'active');
	            banner.children[i].style.zIndex = 0;
	            startMove(banner.children[i], { opacity: 0 });
	        }
	        addClass(sliderPage.children[this.index],'active');
	        startMove(banner.children[this.index], { opacity: 100 });
	        i = this.index;
	    }
	}
    /*---------------------------------sale---------------------------------------------*/
	var sale = getByClass(document, 'sale')[0];
	var saleContent = getByClass(sale, 'content')[0];
	var saleSlider = getByClass(sale, 'slider')[0];
	var saleSliderPrev = getByClass(saleSlider, 'prev')[0];
	var saleSliderNext = getByClass(saleSlider, 'next')[0];
	var saleUnlock = true;

	var saleContentFirst = document.createElement('li');
	saleContentFirst.innerHTML = saleContent.children[0].innerHTML;
	var saleContentLast = document.createElement('li');
	saleContentLast.innerHTML = saleContent.children[saleContent.children.length - 1].innerHTML;
	saleContent.insertBefore(saleContentLast, saleContent.children[0]);
	saleContent.appendChild(saleContentFirst);

	function fnSale() {
	    if (!saleUnlock) return false;
	    saleUnlock = false;
	    var l = saleContent.offsetLeft - saleContent.children[0].offsetWidth;
	    
	    startMove(saleContent, { left: l }, function () {
	        if (Math.abs(saleContent.offsetLeft) >= saleContent.children[0].offsetWidth * (saleContent.children.length - 1)) {
	            saleContent.style.left = -saleContent.children[0].offsetWidth+'px';
	        }
	        saleUnlock = true;
	    });
	}
	var saleInterval = 3000;
	var saleTimer = setInterval(fnSale, saleInterval);
	saleContent.style.left = -saleContent.children[0].offsetWidth + 'px';

	sale.onmouseover = function () {
	    clearInterval(saleTimer);
	    saleSliderPrev.style.display = saleSliderNext.style.display = 'block';
	}
	sale.onmouseout = function () {
	    saleTimer = setInterval(fnSale, saleInterval);
	    saleSliderPrev.style.display = saleSliderNext.style.display = 'none';
	}
	saleSliderPrev.onclick = function () {
	    if (!saleUnlock) return false;
	    saleUnlock = false;
	    var l = saleContent.offsetLeft + saleContent.children[0].offsetWidth;
	    
	    startMove(saleContent, { left: l }, function () {
	        if (saleContent.offsetLeft == 0) {
	            saleContent.style.left = -saleContent.children[0].offsetWidth * (saleContent.children.length - 2)+'px';
	        }
	        saleUnlock = true;
	    });
	}
	saleSliderNext.onclick = function () {
	    fnSale();
	}

    /*---------------------------------product_banner---------------------------------------------*/
	function ProSlider(obj) {
	    this.banner = obj;
	    this.bannerBox = this.banner.parentNode;
	    this.proSlider = getByClass(this.bannerBox, 'slider')[0];
	    this.prev = getByClass(this.proSlider, 'prev')[0];
	    this.next = getByClass(this.proSlider, 'next')[0];
	    this.page = getByClass(this.proSlider, 'page')[0];
	    this.contentFirst = document.createElement('li');
	    this.contentFirst.innerHTML = this.banner.children[0].innerHTML;
	    this.contentLast = document.createElement('li');
	    this.contentLast.innerHTML = this.banner.children[this.banner.children.length - 1].innerHTML;
	    this.banner.insertBefore(this.contentLast, this.banner.children[0]);
	    this.banner.appendChild(this.contentFirst);
	    this.banner.style.width = this.banner.children[0].offsetWidth * this.banner.children.length + 'px';
	    this.banner.style.left = -this.banner.children[0].offsetWidth + 'px';
	    this.index = Math.abs(this.banner.offsetLeft) / this.banner.children[0].offsetWidth - 1;
	    this.interval = 2000;
	    this.timer = setInterval(function(){
            _this.nextClick()
	    }, this.interval);
	    var _this = this;
	    this.bannerBox.onmouseover = function () {
	        _this.mouseover();
	        clearInterval(_this.timer);
	    }
	    this.bannerBox.onmouseout = function () {
	        _this.mouseout();
	        _this.timer = setInterval(function () {
	            _this.nextClick()
	        }, _this.interval);
	    }
	    this.prev.onclick = function () {
	        _this.prevClick();
	    }
	    this.next.onclick = function () {
	        _this.nextClick();
	    }
	    for (var i = 0; i < this.page.children.length; i++) {
	        this.page.children[i].index = i;
	        this.page.children[i].onmouseover = function () {
	            _this.lock = true;
	            deleteClass(_this.page.children[_this.index], 'active');
	            _this.index = this.index;
	            addClass(_this.page.children[this.index], 'active');
	            startMove(_this.banner, { left: -_this.banner.children[0].offsetWidth * (this.index + 1) }, function () {
	                _this.lock = false;
	            });
	            
	        }
	    }
	}
	ProSlider.prototype.mouseover = function () {
	    this.prev.style.display = this.next.style.display = 'block';
	}
	ProSlider.prototype.mouseout = function () {
	    this.prev.style.display = this.next.style.display = 'none';
	}
	ProSlider.prototype.prevClick = function () {
	    if (this.lock) return false;
	    this.lock = true;
	    this.l = this.banner.offsetLeft + this.banner.children[0].offsetWidth;
	    var _this = this;
	    startMove(this.banner, { left: this.l }, function () {
	        if (!_this.banner.children[0].offsetWidth) {
	            _this.lock = false;
	            return false;
	        }
	        if (_this.banner.offsetLeft == 0) {
	            _this.banner.style.left = -_this.banner.children[0].offsetWidth * (_this.banner.children.length - 2) + 'px';
	        }
	        _this.unlock()
	    });
	}
	ProSlider.prototype.nextClick = function () {
	    if (!this.banner.children[0].offsetWidth) return false;
	    if (this.lock) return false;
	    this.lock = true;
        this.l = this.banner.offsetLeft - this.banner.children[0].offsetWidth;
	    var _this = this;
	    startMove(this.banner, { left: this.l }, function () {
	        if (!_this.banner.children[0].offsetWidth) {
	            _this.lock = false;
	            return false;
	        }
	        if (Math.abs(_this.banner.offsetLeft) >= _this.banner.children[0].offsetWidth * (_this.banner.children.length - 1)) {
	            _this.banner.style.left = -_this.banner.children[0].offsetWidth + 'px';
	        }
	        _this.unlock()
	    });
	}
	ProSlider.prototype.unlock = function () {
	    deleteClass(this.page.children[this.index], 'active');
	    this.index = Math.abs(this.banner.offsetLeft) / this.banner.children[0].offsetWidth - 1;
	    addClass(this.page.children[this.index], 'active');
	    this.lock = false;
	}
	for (var proNum = 0; proNum < getByClass(document, 'pro_focus').length; proNum++) {
	    new ProSlider(getByClass(document, 'pro_focus')[proNum]);
	}
    /*---------------------------------product_floor---------------------------------------------*/
	function ProFloor() {
	    this.container = document.createElement('div');
	    this.container.className = 'pro_floor';
	    document.body.appendChild(this.container);
	    this.itemName = ['num','name'];
	    this.proFloor = getByClass(document, 'pro');
	    var _this = this;
	    myAddEvent(window, 'scroll', function () {
	        _this.scroll()
	    });
	    myAddEvent(window, 'resize', function () {
	        _this.init();
	        _this.scroll()
	    });
	    for (var i = 0; i < this.proFloor.length; i++) {
	        this['panel' + i] = document.createElement('div');
	        this['panel' + i].className = 'pro_fl_info';
	        if (i == this.proFloor.length - 1) {
	            addClass(this['panel' + i],'last');
	        }
	        this.container.appendChild(this['panel' + i]);
	        for (var j = 0; j < 2; j++) {
	            this['panel' + i + 'item' + j] = document.createElement('div');
	            this['panel' + i + 'item' + j].innerHTML = this.proFloor[i].getAttribute('data-title').split(',')[j];
	            this['panel' + i + 'item' + j].className = 'pro_fl_'+this.itemName[j];
	            this['panel' + i].appendChild(this['panel' + i + 'item' + j]);
	        }
	        this['panel' + i].index = i;
	        this['panel' + i].onmouseover = function () {
	            addClass(this, 'active');
	        }
	        this['panel' + i].onmouseout = function () {
	            deleteClass(this, 'active');
	        }
 
	        this['panel' + i].onclick = function () {
	            clearInterval(_this.timer);
	            var target = document.body.offsetTop + _this.proFloor[this.index].offsetTop + _this.proFloor[this.index].offsetParent.offsetTop;
	            _this.timer = setInterval(function () {
	                _this.click(target);
	            }, 16)
	        }
	    }
	    this.init();
	    this.scroll()
	}
	ProFloor.prototype.init = function () {
	    this.container.style.left = this.proFloor[0].parentNode.offsetLeft - parseInt(getStyle(this.container,'width')) + 'px';
	    this.container.style.marginTop = -this.container.offsetHeight / 2 + 'px';
	    this.container.style.display = 'none';
	}
	ProFloor.prototype.click = function (target) {
	    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	    var speed = (target - scrollTop) / 8;
	    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
	    if (scrollTop == target) {
	        clearInterval(this.timer);
	    } else {
	        document.body.scrollTop = parseInt(document.body.scrollTop) + speed;
	        document.documentElement.scrollTop = parseInt(document.documentElement.scrollTop) + speed;
	    }
	};
	ProFloor.prototype.scroll = function () {
	    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	    if (this.proFloor[0].offsetTop + this.proFloor[0].offsetParent.offsetTop - document.documentElement.clientHeight > scrollTop || this.proFloor[this.proFloor.length - 1].offsetTop + this.proFloor[this.proFloor.length - 1].offsetParent.offsetTop + this.proFloor[this.proFloor.length - 1].offsetHeight < scrollTop) {
	        this.container.style.display = 'none';
	        if (this.nowProFloor || this.nowProFloor === 0) {
	            deleteClass(this['panel' + this.nowProFloor], 'current');
	            deleteClass(this.proFloor[this.nowProFloor].getElementsByTagName('h2')[0].getElementsByTagName('i')[0], 'active');
	        }
	        this.nowProFloor = null;
	        this.repeat = true;
	    } else {

	        this.repeat = false;
	        this.container.style.display = 'block';
	        var originArr = [];
	        for (var i = 0; i < this.proFloor.length; i++) {	            
	            originArr.push(Math.abs(scrollTop - this.proFloor[i].offsetTop));
	        }
	        var arr = [];
	        for (var i in originArr) {
	            arr[i] = originArr[i]
	        }
	        for (var i = 0; i < arr.length-1; i++) {
	            for (var j = 0; j < arr.length; j++) {
	                if (arr[j] > arr[j+1]) {
	                    var temp = arr[j]
	                    arr[j] = arr[j+1];
	                    arr[j+1] = temp;
	                }
	            }
	        }
	        for (var i = 0; i < originArr.length; i++) {
	            if (originArr[i] == arr[0]) {
	                
	                if (this.nowProFloor || this.nowProFloor === 0) {
	                    if (this.nowProFloor == i) {
	                        this.repeat = true;
	                    } else {
	                        deleteClass(this['panel' + this.nowProFloor], 'current');
	                        deleteClass(this.proFloor[this.nowProFloor].getElementsByTagName('h2')[0].getElementsByTagName('i')[0], 'active');
	                        this.repeat = false;
	                    }
	                }
	                this.nowProFloor = i;
	                break;
	            }
	        }
	        if (!this.repeat) {
	            addClass(this['panel' + this.nowProFloor], 'current');
	            addClass(this.proFloor[this.nowProFloor].getElementsByTagName('h2')[0].getElementsByTagName('i')[0], 'active');
	            this.proFloor[this.nowProFloor].getElementsByTagName('h2')[0].getElementsByTagName('i')[0].style.height = 0;
	            startMove(this.proFloor[this.nowProFloor].getElementsByTagName('h2')[0].getElementsByTagName('i')[0], { height: 25 ,number:25,interval:30})
	        }
	    }
	}
	new ProFloor();
    


}


