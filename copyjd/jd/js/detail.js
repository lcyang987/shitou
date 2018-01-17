// JavaScript Document

myAddEvent(window, 'load', function () {
    /*---------------------------------detail---------------------------------------------*/
    var detail = getByClass(document, 'detail_main')[0];
    var dTab = getByClass(detail, 'mt')[0].getElementsByTagName('li');
    var dCl = getByClass(getByClass(detail, 'mc')[0], 'cl');
    for (var i = 0; i < dTab.length; i++) {
        dTab[i].index = i;
        dTab[i].onclick = function () {
            for (var i = 0; i < dCl.length; i++) {
                deleteClass(dTab[i], 'active');
                deleteClass(dCl[i], 'active');
            }
            addClass(this, 'active');
            addClass(dCl[this.index], 'active');
        }
    }
    /*-------------------------------------------------------------------------------*/
    var select = getByClass(getByClass(document, 'select')[0], 'ct');
    for (var i = 0; i < select.length; i++) {
        for (var j = 0; j < select[i].children.length; j++) {
            select[i].children[j].onclick = function () {
                for (var i = 0; i < this.parentNode.children.length; i++) {
                    deleteClass(this.parentNode.children[i], 'active');
                }
                addClass(this, 'active');
            }
        }
    }
})

