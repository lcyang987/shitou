// JavaScript Document

myAddEvent(window, 'load', function () {
    var select = getByClass(getByClass(document, 'order_main')[0], 'cc');
    for (var i = 0; i < select.length; i++) {
        for (var j = 0; j < select[i].children.length; j++) {
            select[i].children[j].children[0].onclick = function () {
                for (var i = 0; i < this.parentNode.parentNode.children.length; i++) {
                    deleteClass(this.parentNode.parentNode.children[i].children[0], 'active');
                }
                addClass(this, 'active');
            }
        }
    }
})


