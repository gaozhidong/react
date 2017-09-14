(function($) {
    /**
     * 拼图游戏
     * @param {String} src 图片路径
     * @param {int} cols 列数
     * @param {int} rows 行数
     * @param {int} rand 打散步数
     * @author HuangHong<ihongs@live.cn>
     */
    $.fn.hsPintu = function(src, cols, rows, rand) {
        var that = $(this);
        var srz = that.data("src");
        var img = that.data("img");

        var aw = that.width();
        var ah = that.height();
        var ew = aw / rows;
        var eh = ah / cols;

        // 状态: 0 进行中, 1 成功, 2 结束
        that.data("hsPintuStatus", 2);
        that.data("cols", cols);
        that.data("rows", rows);

        /**
         * img 存在且 src 没变化
         * 则不需要再次加载图片
         * 直接取出存储好的数据
         */
        if (img && srz === src) {
            var ox = that.data("pos_x");
            var oy = that.data("pos_y");
           // console.log("Note: 图片无变化");

            split(that, cols, rows, ew, eh, ox, oy, img);

            // 未给 rand 则仅拆分而不打散
            if (rand === undefined) return;

            upset(that, cols, rows, rand);
            that.data("hsPintuStatus", 0);
            that.trigger("hsPintuLaunch");
        } else
            loadr(src, aw, ah, function(ox, oy) {
                that.data("src", src);
                that.data("img", this);
                that.data("pos_x", ox);
                that.data("pos_y", oy);
               // console.log("Note: 载入新图片");

                split(that, cols, rows, ew, eh, ox, oy, this);

                // 未给 rand 则仅拆分而不打散
                if (rand === undefined) return;

                upset(that, cols, rows, rand);
                that.data("hsPintuStatus", 0);
                that.trigger("hsPintuLaunch");
            });

        // 已经初始化过就不要再绑定事件了
        if (!that.data("hsPintuInited")) {
            that.data("hsPintuInited", 1);
             Nstep = 0;//记录一共用了多少步
            that.on("click", ".pt-pic:not(.pt-pix)", function() {
               
                if (that.data("hsPintuStatus") === 0) {
                     Nstep++;//每次点击加一
                    var cols = that.data("cols");
                    var rows = that.data("rows");
                    var hole = that.children(".pt-pix");
                    if (mover(that, cols, rows, hole, $(this))) {
                        that.data("hsPintuStatus", 1);
                        that.trigger("hsPintuFinish");
                    }
                }
            });
        }

        return this;
    };

    /**
     * 预载文件
     * @param {Function} cal 回调函数
     * @returns {jQuery} 当前文件节点
     * @author HuangHong<ihongs@live.cn>
     */
    $.fn.hsFileLoad = function(cal) {
        this.each(function() {
            var that = this;
            if (window.FileReader) {
                var fr = new FileReader();
                fr.onloadend = function(e) {
                    cal.call(that, e.target.result);
                };
                cal.call(that);
                $.each(this.files, function(i, fo) {
                    fr.readAsDataURL(fo);
                });
            } else
            if (this.getAsDataURL) {
                cal.call(that, that.getAsDataURL());
            } else {
                cal.call(that, that.value);
            }
        });
        return this;
    };

    /**
     * 加载图片
     * cal 的回调参数为:
     *  ox 横向偏移
     *  oy 纵向偏移
     *  this 指向载入的图片的 jQuery 对象
     * @param {String} src 图片路径
     * @param {int} w 额定宽
     * @param {int} h 额定高
     * @param {Fucntion} cal 加载完成后的回调方法
     * @author HuangHong<ihongs@live.cn>
     */
    function loadr(src, w, h, cal) {
        var img = new Image();
        img.onload = function() {
            var xw = img.width;
            var xh = img.height;
            var zw = xh * w / h;
            if (zw > xw) {
                // 宽度优先
                img.width = w;
                img.height = xh * w / xw;
                xh = (h - img.height) / 2;
                xw = 0;
            } else {
                // 高度优先
                img.height = h;
                img.width = xw * h / xh;
                xw = (w - img.width) / 2;
                xh = 0;
            }

            cal.call(img, xw, xh);
        };
        img.src = src;
    }

    /**
     * 拆分图片
     * @param {jQuery} that 容器对象
     * @param {int} cols 行
     * @param {int} rows 列
     * @param {int} ew 板块宽度
     * @param {int} eh 板块高度
     * @param {int} ox 图片横向偏移
     * @param {int} oy 图片纵向偏移
     * @param {Image} im 图片对象
     * @author HuangHong<ihongs@live.cn>
     */
    function split(that, cols, rows, ew, eh, ox, oy, im) {
        that.empty();

        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < cols; i++) {
                var k = i + j * rows;

                var pic = $('<div class="pt-pic"></div>');
                pic.attr("id", "pt-pic-" + k);
                pic.data("idx", k);
                pic.appendTo(that);
                pic.css({
                    "position": "relative",
                    "overflow": "hidden",
                    "border": "0",
                    "width": ew + "px",
                    "height": eh + "px"
                });

                var img = $(im.cloneNode());
                img.appendTo(pic);
                img.css({
                    "position": "absolute",
                    "z-index": "88",
                    "border": "0",
                    "left": (0 - i * ew + ox) + "px",
                    "top": (0 - j * eh + oy) + "px"
                });

                // 因边框可能影响宽高计算, 故边框单独用一个块来放
                var bor = $('<div class="pt-bor"></div>');
                bor.appendTo(pic);
                bor.css({
                    "position": "absolute",
                    "z-index": "99",
                    "width": "100%",
                    "height": "100%"
                });
                // 由于样式宽高并不含边框, 故再次计算尺寸的偏移量
                bor.css({
                    "width": (2 * bor.width() - bor.outerWidth()) + "px",
                    "height": (2 * bor.height() - bor.outerHeight()) + "px"
                });
            }
        }
    }

    /**
     * 打散图片
     * @param {jQuery} that 容器对象
     * @param {int} cols 列
     * @param {int} rows 行
     * @param {int} rand 打散步数
     * @author HuangHong<ihongs@live.cn>
     */
    function upset(that, cols, rows, rand) {
        var v;
        var r = Math.floor(Math.random() * cols * rows);
        var hole = that.children().eq(r).addClass("pt-pix");
        var part;
        var step = [];
        var dbug = [];
        for (var i = 0, j = rand; i < j; i++) {
            var x = cols - 1;
            var y = rows - 1;
            var z = cols;
            var rx = r % cols;
            var ry = Math.floor(r / cols);
            var rv = [];

            if (rx > 0 && rx < x) {
                rv.push(r - 1, r + 1); // 可左右移动
            } else
            if (rx > 0) {
                rv.push(r - 1); // 可向左移动
            } else {
                rv.push(r + 1); // 可向右移动
            }
            if (ry > 0 && ry < y) {
                rv.push(r - z, r + z); // 可上下移动
            } else
            if (ry > 0) {
                rv.push(r - z); // 可向上移动
            } else {
                rv.push(r + z); // 可向下移动
            }

            // 排除来源位置
            if (step.length > 0) {
                v = step[step.length - 1];
                v = $.inArray(v, rv);
                if (v > -1) {
                    rv.splice(v, 1);
                }
            }
            // 排除回旋位置
            if (step.length > 2 && rv.length > 1) {
                v = step[step.length - 3];
                v = $.inArray(v, rv);
                if (v > -1) {
                    rv.splice(v, 1);
                }
            }

            // 随机方向
            r = rv[Math.floor(Math.random() * rv.length)];
            v = hole.index();
            step.push(v);

            // 交换位置
            part = that.children().eq(r);
            if (r < v) {
                part.insertBefore(hole);
                hole.insertBefore(that.children().eq(r));
            } else {
                hole.insertBefore(part);
                part.insertBefore(that.children().eq(v));
            }

            // 调试步骤
            if (r == v + 1) {
                dbug.push("左");
            } else
            if (r == v - 1) {
                dbug.push("右");
            } else
            if (r > v) {
                dbug.push("上");
            } else
            if (r < v) {
                dbug.push("下");
            }
        }

        // 攻略
        dbug = dbug.reverse().join(" "); //alert(dbug);
        console.log("攻略: " + dbug + "\r\n此非最优解, 仅为随机打散时的逆向步骤, 上下左右为相对缺口的板块, 祝您玩的开心!");
    }

    /**
     * 移动板块
     * @param {jQuery} that 容器对象
     * @param {int} cols 列数
     * @param {int} rows 行数
     * @param {jQuery} hole 缺口对象
     * @param {jQuery} part 板块对象
     * @author HuangHong<ihongs@live.cn>
     */
    function mover(that, cols, rows, hole, part) {
        var move = false;
        var i = part.index();
        var j = hole.index();
        var ix = i % cols;
        var jx = j % cols;
        var iy = Math.floor(i / cols);
        var jy = Math.floor(j / cols);

        if (iy == jy) { // 在同一行
            move = ix == jx + 1 // 可向左边移动
                ||
                ix == jx - 1; // 可向右边移动
        } else
        if (ix == jx) { // 在同一列
            move = iy == jy + 1 // 可向上移动
                ||
                iy == jy - 1; // 可向下移动
        }

        // 互换位置
        if (move) {
            if (i < j) {
                part.insertBefore(hole);
                hole.insertBefore(that.children().eq(i));
            } else {
                hole.insertBefore(part);
                part.insertBefore(that.children().eq(j));
            }
        }

        // 判断是否拼图完成
        move = true;
        for (i = 0, j = cols * rows; i < j; i++) {
            if (that.children().eq(i).data("idx") != i) {
                move = false;
            }
        }

        return move;
    }
})(jQuery);