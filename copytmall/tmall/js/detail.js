myAddEvent(window, 'load', function () {
    //---------------------------------DetailTab--------------------------------------------
    function DetailTab() {
        this.container = getByClass(document, 'detail_main')[0];
        this.tab = getByClass(this.container, 'tab')[0].getElementsByTagName('li');
        this.content = getByClass(this.container, 'mc')[0].children;
        var _this = this;
        for (var i = 0; i < this.tab.length; i++) {
            this.tab[i].index = i;
            this.tab[i].onclick = function () {
                _this.click(this);
            }
        }
    }
    DetailTab.prototype.click = function (obj) {
        for(var i=0;i<this.tab.length;i++){
            deleteClass(this.tab[i],'active');
            deleteClass(this.content[i],'active');
        }
        addClass(obj, 'active');
        addClass(this.content[obj.index], 'active');
    }
    new DetailTab;
});