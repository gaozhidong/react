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
    var sec;

    function launch() {
        box.data("hsPintuStatus", 0);
        $(".bt-start").addClass("bt-timer");
    }

    function finish(s) {
        box.data("hsPintuStatus", s);
        $(".bt-start").removeClass("bt-timer");
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
    }

    $(".qt").show();
    // $("#dialog .bt-fn_count").text(count_text);
   /*  $("#dialog .bt-fn1").data("cal", function () {
        $("#dialog").show();
        $("#guider").show();
    }); */
    /* $(".bt-fn0,.bt-fn1").click(function (evt) {
        $(this).data("cal").call(this, evt);
    }); */
    dialog(null);

    // 开始事件
    box.on("hsPintuLaunch", function () {
        launch();
    });

    // 结束事件
    box.on("hsPintuFinish", function () {
        console.log('这是第'+(NUMBERID+1)+ '关');
        console.log('一共用了'+Nstep+'步');
        $('#count').text(0) 
        finish(1);
        ++ NUMBERID
        if ( NUMBERID === 1) {
            dialog({
                fn0: {
                    cal: function () {
                        // location.href = "award.html#" ;
                    }
                }
            });
        } else if ( NUMBERID === 2) {
            dialog({
                fn0: {
                    cal: function () {
                        // location.href = "award.html#" 
                    }
                }
            });
        } else{
            dialog({
                fn0: {
                    cal: function () {
                        // location.href = "award.html#" 
                    }
                }
            }); 
        }
        /* if ( NUMBERID < 2) {
            ++NUMBER;
            //++NUMBERID;
            box.hsPintu(src, NUMBER, NUMBER);
        } else if ( NUMBERID === 1) {
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
        } */
    });

    // 点击开始游戏
    $(".bt-start").click(function () {
         if ($(this).is(".bt-timer")) {
            return;
        } 
        finish(2);
        rand = 2; // 加大难度
        Nstep = 0
        box.hsPintu(src, NUMBER, NUMBER, rand);
    });

    // 重来
    $(".bt-again").click(function () {
        finish(2); // 重新开始
        box.hsPintu(src, NUMBER, NUMBER);
    });
    // 继续挑战
    $(".bt-fn0").click(function(){
        console.log(NUMBER)//2
        NUMBER = NUMBER+1;
        Nstep = 0
        $("#overlay,#cabinet").css("display","none")
        box.hsPintu(src, NUMBER, NUMBER, rand);
    })
    //查看礼包
    
    // 初始化
    box.hsPintu(src, cols, rows);

})(jQuery);