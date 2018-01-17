myAddEvent(window, 'load', function () {
    //---------------------------------sort--------------------------------------------
    function Sort() {
        this.container = getByClass(document, "list_sort")[0];
        this.tab = this.container.getElementsByTagName('li');
        var _this = this;
        for (var i = 0; i < this.tab.length; i++) {
            this.tab[i].onclick = function () {
                for (var i = 0; i < _this.tab.length; i++) {
                    deleteClass(_this.tab[i], 'active');
                }
                addClass(this, 'active');
                if (this.getElementsByTagName('b').length) {
                    if (/price_t/.test(this.className)) {
                        deleteClass(this, 'price_t');
                        addClass(this, 'price_b');
                    } else if (/price_b/.test(this.className)) {
                        deleteClass(this, 'price_b');
                        addClass(this, 'price_t');
                    } else {
                        addClass(this, 'price_b');
                    }
                } else {
                    for (var i = 0; i < _this.tab.length; i++) {
                        deleteClass(_this.tab[i], 'price_t');
                        deleteClass(_this.tab[i], 'price_b');
                    }
                }
            }
        }
    }
    new Sort;
});