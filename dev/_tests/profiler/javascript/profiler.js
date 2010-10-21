$(function(){
    var url = "";
    var times = 10;
    var count = 1;
    var start;
    var end;
    var results = {};

    var profile = function(){
        results = {};
        count = 1;
        url = $("#url").val();
        times = $("#times").val();
        $("#results").html('<img alt="loading" src="/dev/_images/ajax-loader-gray.gif" />');
        $("#csv").val("");
        start = new Date().getTime();
        $("#pframe").attr("src", url);
        return false;
    };

    $(document).ready(function() {
        var qs = new Querystring();
        url = qs.get("url", "");
        times = qs.get("times", 10);
        $("#url").val(url);
        $("#times").val(times);
        $("#pbutton").click(function() { profile(); });
        profile();
    });

    var showResults = function() {
        $("#results").html("");
        $("#csv").val("");
        var csv = "";
        $.each(results, function(index, timings) {
            var total = 0;
            csv += index;
            $.each(timings, function(n, time){
                total = total + time;
                csv += ", " + time;
            });
            csv += "\n";
            $("#results").append(index + ": " + (total/timings.length).toFixed() + "ms<br />");
        });
        showCsvWithDebugText(csv);
    };

    var showCsvWithDebugText = function(csv) {
        csv += "\n" + new Date() + ", " + navigator.userAgent;
        $.ajax({
            url: "/var/scm-version.json",
            type: "GET",
            cache: false,
            dataType: "json",
            success: function(data){
                csv += ", Nakamura Version: " + data["sakai:nakamura-version"];
                csv += ", UX Code Timestamp: " + data["jcr:created"];
            },
            complete: function(){ $("#csv").val(csv); }
        });
    };

    var setResult = function(name, timeStarted, timeEnded){
        var elapsed = timeEnded - timeStarted;
        if (results[name] === undefined) {
            results[name] = [];
        }
        results[name].push(elapsed);
    };

    $(document).bind("sakai-profiler-done", function(e, data) {
        end = new Date().getTime();
        setResult("total", start, end);
        $.each(data, function(index, timing) {
            setResult(index, timing.start, timing.end);
        });
        $(window).trigger("profilerPassComplete");
    });

    $(window).bind("profilerPassComplete", function() {
        if (count < times) {
            count += 1;
            $("#pframe").attr("src", "");
            start = new Date().getTime();
            $("#pframe").attr("src", url);
        } else {
            showResults();
        }
    });
});
