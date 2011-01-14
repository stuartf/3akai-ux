$(function(){
    var count = 1;
    var start;
    var end;
    var results = {};

    var qs = new Querystring();
    var url = qs.get("url", "");
    var times = qs.get("times", 10);

    $("#url").val(url);
    $("#times").val(times);

    var profile = function(){
        results = {};
        count = 1;
        url = $("#url").val();
        times = $("#times").val();
        $("#loading").show();
        $("#csv").val("");
        start = new Date().getTime();
        $("#pframe").attr("src", url);
        return false;
    };

    $("#pbutton").click(function() { profile(); });

    var showResults = function() {
        //$("#results").html("");
        $("#csv").val("");
        var csv = "";
        var json = {"times": []};
        $.each(results, function(index, timings) {
            var totalElapsed = 0;
            var totalAt = 0;
            csv += index;
            $.each(timings, function(n, time){
                totalElapsed += time.elapsed;
                totalAt += time.at;
                csv += ", " + time.elapsed;
            });
            csv += "\n";
            json.times.push({
                "event": index,
                "elapsed": (totalElapsed/timings.length).toFixed(),
                "at": (totalAt/timings.length).toFixed()
            });
        });
        $("#loading").hide();
        var html = $.TemplateRenderer($("#results_template"), json);
        $("#results").html(html);
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
        var at = timeEnded - start;
        if (results[name] === undefined) {
            results[name] = [];
        }
        results[name].push({"elapsed":elapsed, "at":at});
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

    profile();
});
