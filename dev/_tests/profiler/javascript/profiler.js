$(function(){
    var url = "";
    var profile = function(){
        url = $("#url").val();
        $("#pframe").attr("src", url);
        $("#results").html("");
        return false;
    };

    $(document).ready(function() {
        var qs = new Querystring();
        url = qs.get("url", "");
        $("#url").val(url);
        $("#pframe").attr("src", url);
        $("#pbutton").click(function() { profile(); });
        $("#results").html("");
    });

    $(document).bind("sakai-profiler-done", function(e, data) {
        $.each(data, function(index, timing) {
            var elapsed = timing["end"] - timing["start"];
            $("#results").append(index + ": " + elapsed + "ms<br />");
        });
    });
});
