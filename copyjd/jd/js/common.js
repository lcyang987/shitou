// JavaScript Document

myAddEvent(window, 'load', function () {
    /*---------------------------------classify---------------------------------------------*/
    var navBox = getByClass(document, 'header_nav_box')[0];
    var classify = getByClass(document, 'all_classify')[0];
    var obj = getByClass(classify, 'acb')[0];
    var hover = getByClass(classify, 'nav_hover')[0];
    var oldTop = parseInt(getStyle(hover, 'top'));
    for (var i = 0; i < obj.children.length; i++) {
        obj.children[i].index = i;
        obj.children[i].onmouseover = function () {
            for (var i = 0; i < hover.children.length; i++) {
                hover.children[i].style.display = 'none';
            }
            hover.style.display = 'block';
            addClass(this, 'active');
            hover.nowActive = this.index;
            hover.children[this.index].style.display = 'block';
            if (document.body.scrollTop > navBox.offsetTop + navBox.offsetHeight) {
                hover.style.top = oldTop + document.body.scrollTop - (navBox.offsetTop + navBox.offsetHeight) + 'px';
            } else if (document.documentElement.scrollTop > navBox.offsetTop + navBox.offsetHeight) {
                hover.style.top = oldTop + document.documentElement.scrollTop - (navBox.offsetTop + navBox.offsetHeight) + 'px';
            } else {
                hover.style.top = oldTop + 'px';
            }
        }
        obj.children[i].onmouseout = function () {
            deleteClass(this, 'active');
            hover.style.display = 'none';
        }
    }
    hover.onmouseover = function () {
        addClass(obj.children[this.nowActive], 'active');
        hover.style.display = 'block';
    }
    hover.onmouseout = function () {
        deleteClass(obj.children[this.nowActive], 'active');
        hover.style.display = 'none';
    }
    classify.onmouseover = function () {
        clearInterval(this.timer)
        obj.style.display = 'block';
    }
    classify.onmouseout = function () {
        this.timer = setTimeout(function () {
            obj.style.display = 'none';
        }, 200)

    }

    /*---------------------------------toolbar---------------------------------------------*/
    var fixedR = getByClass(document, 'fixed_r')[0];
    var toolbar = getByClass(fixedR, 'toolbar')[0];
    var toolbarAnother = getByClass(fixedR, 'toolbar_another')[0];
    for (var i = 0; i < toolbar.children.length; i++) {
        toolbar.children[i].onmouseover = function () {
            addClass(this, 'active');
        }
        toolbar.children[i].onmouseout = function () {
            deleteClass(this, 'active');
        }
    }
    for (var i = 0; i < toolbarAnother.children.length; i++) {
        toolbarAnother.children[i].onmouseover = function () {
            addClass(this, 'active');
        }
        toolbarAnother.children[i].onmouseout = function () {
            deleteClass(this, 'active');
        }
    }
})