(function ($) {


    var NUMBER = 2;
    var NUMBERID = 0;
    var cols = NUMBER;
    var rows = NUMBER;
    var rand = 2 * 2;

/*     var srcs = [
        "images/pt_01.jpg",
        "images/pt_02.jpg",
        "images/pt_03.jpg",
        "images/pt_04.jpg",
        "images/pt_05.jpg",
        "images/pt_06.jpg",
        "images/pt_07.jpg",
        "images/pt_08.jpg",
        "images/pt_09.jpg",
        "images/pt_10.jpg"
    ];
    var src = srcs[Math.floor(Math.random() * srcs.length)]; */
    var srcs = ["01.png"]
    var src = srcs[0]
    var box = $("#pt-box");
    var tmr;
    var sec;

    function launch() {
        box.data("hsPintuStatus", 0);
        if (tmr) clearInterval(tmr);
        $(".dt").show();
        $(".qt").hide();
        $(".bt-start").addClass("bt-timer");
        $(".bt-timer").css("background-image", "url(images/timer.gif?_=" + Math.random() + ")");
    }

    function finish(s) {
        box.data("hsPintuStatus", s);
        if (tmr) clearInterval(tmr);
        $(".dt").hide();
        $(".qt").show();
        $(".bt-start").removeClass("bt-timer");
        $(".bt-start").css("background-image", "none");
    }

    function dialog(o) {
        if (!o) {
            $("#overlay").hide();
            $("#cabinet").hide();
            return;
        }
        $("#overlay").show();
        $("#cabinet").show();
        $("#dialog").show();
        $("#guider").hide();
        $("#dialog .dl-txt").html(o.msg);
        if (o.fn0) {
            $("#dialog .bt-fn0").text(o.fn0.txt);
            $("#dialog .bt-fn0").data("cal", o.fn0.cal);
        }
        if (o.fn1) {
            $("#dialog .bt-fn1").text(o.fn1.txt);
            $("#dialog .bt-fn1").data("cal", o.fn1.cal);
        }
    }

    $(".qt").show();
    $("#dialog .bt-fn1").text("炫耀一下");
    $("#dialog .bt-fn1").data("cal", function () {
        $("#dialog").show();
        $("#guider").show();
    });
    $(".bt-fn0,.bt-fn1").click(function (evt) {
        $(this).data("cal").call(this, evt);
    });
    dialog(null);

    // 开始事件
    box.on("hsPintuLaunch", function () {
        launch();
        sec = 0;
        $("#dt-sec").text(sec);
        tmr = setInterval(function () {
            sec++;
            $("#dt-sec").text(sec);
            //                        if (sec > 59) {
            //                            finish(2); // 到期终止
            //                            alert ("时间到");
            //                        }
        }, 1000);
    });

    // 结束事件
    box.on("hsPintuFinish", function () {
        var sez = sec;
        console.log('用了多少'+ sez + '秒');
        console.log('这是第'+(NUMBERID+1)+ '关');
        console.log('一共用了'+Nstep+'步');
        finish(1);
        if (sez <= 60 && NUMBERID < 2) {
            ++NUMBER;
            ++NUMBERID;
            box.hsPintu(src, NUMBER, NUMBER);
        } else if (sez <= 60 && NUMBERID === 2) {
            // var num = Math.floor(Math.random() * 10) % 2 == 0 ? 20 : 30;
            var num = 10;
            dialog({
                msg: '挑战成功, 用时<span class="dl-red">' + sez + '</span>秒<br />' +
                '恭喜您获取一张<span class="dl-red">' + num + '</span>元',
                fn0: {
                    txt: "领取奖励",
                    cal: function () {
                        location.href = "award.html#" + num;
                    }
                }
            });
        } else {
            dialog({
                msg: '挑战失败, 用时<span class="dl-red">' + sez + '</span>秒',
                fn0: {
                    txt: "再来一次",
                    cal: function () {
                        dialog(null);
                        $(".bt-again").click();
                    }
                }
            });
        }
    });
// 直接开始游戏
// box.hsPintu(src, NUMBER, NUMBER, rand);

    // 点击开始游戏
    $(".bt-start").click(function () {
        if ($(this).is(".bt-timer")) {
            return;
        }
        finish(2); // 清除计时
        rand = 27; // 加大难度
        Nstep = 0
        box.hsPintu(src, NUMBER, NUMBER, rand);
    });

    // 重来
    $(".bt-again").click(function () {
        finish(2); // 重新开始
        box.hsPintu(src, NUMBER, NUMBER);
    });

    // 初始化
    box.hsPintu(src, cols, rows);

})(jQuery);