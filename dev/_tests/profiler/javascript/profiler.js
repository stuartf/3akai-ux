var url = "";
var profile = function(){
    url = $("#url").val();
    $("#pframe").attr("src", url);
    return false;
};

$(document).ready(function() {
    var qs = new Querystring();
    url = qs.get("url", "");
    $("#url").val(url);
    $("#pframe").attr("src", url);
    $("#pbutton").click(function() { profile(); });
});

$(document).bind("sakai-profiler-done", function(e, data) {
    console.log("its done", data);
});