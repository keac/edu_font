(function($){
    $.getUrlParam = function(name)
    {
        var reg
            = new RegExp("(^|&)"+
            name +"=([^&]*)(&|$)");
        var r
            = window.location.search.substr(1).match(reg);
        if (r!==null) return decodeURI(r[2]); return null;
    }
})(jQuery);

var key=$.getUrlParam("search");
$("#searchInput").val(key);
$(function(){
        if(key.length > 0) {
            var body = $('body');
            body.unhighlight();
            body.highlight(key);
        }
});