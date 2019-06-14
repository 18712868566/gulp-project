/*
 * @Author: Lip
 * @Date: 2019-05-07 14:47:40
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-05-10 16:23:15
 * 非人学园
 */

var Gallery = function() {
    function e() {
        var e = $.browser;
        return 1 == e.msie ? e.version : 11
    }

    function l(e) {
        var l = e.options,
            t = l.galleryContainer.find(".gallery_item"),
            i = t.length,
            n = t.width(),
            a = t.height();
        if (i == l.slidesPerView) {
            var o = l.galleryContainer.html();
            l.galleryContainer.append(o), t = l.galleryContainer.find(".gallery_item")
        }
        t.each(function() {
            $(this).css("margin-left", -n / 2), $(this)[0].style[g + "ransitionDuration"] = l.speed + "ms"
        }), e.options.galleryContainer.css({
            width: n * l.slidesPerView,
            height: a
        }), r(e, l.initialSlide)
    }

    function t(e) {
        {
            var l = e.options.galleryContainer;
            e.options.galleryContainer.find(".gallery_item").length
        }
        e.fs = l.find(".gallery_active"), e.rm = l.find(".gallery_right_middle"), e.rb = l.find(".gallery_right_back"), e.lm = l.find(".gallery_left_middle"), e.lb = l.find(".gallery_left_back")
    }

    function i(e) {
        var l = e.options,
            t = l.galleryContainer.find(".gallery_item"),
            i = (t.length, $(l.gallery_prev)),
            r = $(l.gallery_next);
        i.length > 0 && i.click(function() {
            e.lm.click()
        }), r.length > 0 && r.click(function() {
            e.rm.click()
        }), l.galleryContainer.on("click", ".gallery_item", function() {
            var l = $(this),
                t = l.index();
            e.toSlide(t), n(e)
        }), n(e)
    }

    function n(e) {
        var l = e.options,
            t = l.galleryContainer.find(".gallery_item"),
            i = t.length;
        l.autoPlay && (null != f && clearInterval(f), f = setInterval(function() {
            var l = $(".gallery_active").index();
            l = (l + 1) % i, e.toSlide(l)
        }, l.autoPlay))
    }

    function r(l, i, n) {
        var r = l.options,
            o = r.galleryContainer.find(".gallery_item"),
            d = o.length;
        o.eq(i).addClass("gallery_active");
        var g = (i + 1) % d;
        o.eq(g).addClass("gallery_right_middle");
        var f = (i - 1 + d) % d;
        if (o.eq(f).addClass("gallery_left_middle"), 5 == r.slidesPerView) {
            var y = (i + 2) % d;
            o.eq(y).addClass("gallery_right_back");
            var c = (i - 2 + d) % d;
            o.eq(c).addClass("gallery_left_back")
        }
        t(l), e() < 10 && "number" == typeof n && ((i > n && 0 != i || 0 == i && n == d - 1) && (o.removeClass("z-index3 z-index2"), l.rm.addClass("z-index2"), l.lm.addClass("z-index3")), (n > i && i != d - 1 || i == d - 1 && 0 == n) && (o.removeClass("z-index3 z-index2"), l.lm.addClass("z-index2"), l.rm.addClass("z-index3"))), s(l), 5 == r.slidesPerView ? a([i, g, y, f, c], l) : a([i, g, f], l)
    }

    function a(e, l) {
        for (var t = l.options, i = t.galleryContainer.find(".gallery_item"), n = i.length, r = 0; n > r; r++) $.inArray(r, e) > -1 || o(l, i.eq(r), 0, 0, 8 * t.depth)
    }

    function o(e, l, t, i, n) {
        if (l[0].style[g + "ransform"] = "translate3d(" + -i + "px,0," + -n + "px) rotateX(0deg) rotateY(" + t + "deg)", !g) {
            var r = -e.options.galleryContainer.find(".gallery_item").width();
            l.animate({
                "margin-left": r / 2 - i
            }, e.options.speed, "linear")
        }
    }

    function s(e) {
        {
            var l = e.options,
                t = l.galleryContainer,
                i = t.find(".gallery_item"),
                n = i.width();
            i.height()
        }
        o(e, t.find(".gallery_left_middle"), l.rotate, n + l.stretch, l.depth), o(e, t.find(".gallery_active"), 0, 0, 0), o(e, t.find(".gallery_right_middle"), -l.rotate, -n - l.stretch, l.depth), 5 == l.slidesPerView && (o(e, t.find(".gallery_left_back"), 1.4 * l.rotate, 2 * (n + l.stretch), 2 * l.depth), o(e, t.find(".gallery_right_back"), 1.4 * -l.rotate, 2 * (-n - l.stretch), 2 * l.depth))
    }

    function d(e, l) {
        var t = {
            index: l
        };
        if ("function" == typeof e.options.onGalleryStart && e.options.onGalleryStart(t), "function" == typeof e.options.onGalleryEnd) {
            var i = e.options;
            setTimeout(function() {
                i.onGalleryEnd(t)
            }, i.speed)
        }
        var n = e.fs.index();
        n != l && (e.fs.removeClass("gallery_active"), e.rm.removeClass("gallery_right_middle"), e.lm.removeClass("gallery_left_middle"), e.rb.removeClass("gallery_right_back"), e.lb.removeClass("gallery_left_back"), r(e, l, n))
    }
    var g = function() {
            if (e() < 10) return !1;
            for (var l, t = document.createElement("div").style, i = "t,WebkitT,MozT,msT,OT".split(","), n = 0; n < i.length; n++)
                if (l = i[n] + "ransform", l in t) return i[n]
        }(),
        f = null,
        y = function(e) {
            this.options = $.extend({
                rotate: 50,
                stretch: 0,
                depth: 150,
                slidesPerView: 5,
                speed: 500,
                initialSlide: 0
            }, e), this.options.galleryContainer = $(e.galleryContainer), this.fs = null, this.rm = null, this.rb = null, this.lm = null, this.lb = null, l(this), i(this)
        };
    return y.prototype = {
        toSlide: function(e) {
            d(this, e)
        }
    }, {
        create: function(e) {
            return new y(e)
        }
    }
}();


var i = !0;

// 最新漫画显示 new标签
$(".news_ul").find(".news_li").eq(0).addClass("on");

var e = $(".news_ul").find(".news_li").length - 1 , a = $(".gallery_container").find(".gallery_item");

$(".gallery_container .gallery_item").eq(a.length - 1).find("img").attr("src", $(".gallery_container .gallery_item").eq(a.length - 1).find("img").attr("data-src")),
$(".gallery_container .gallery_item").eq(a.length - 2).find("img").attr("src", $(".gallery_container .gallery_item").eq(a.length - 2).find("img").attr("data-src")),
$(".gallery_container .gallery_item").eq(0).find("img").attr("src", $(".gallery_container .gallery_item").eq(0).find("img").attr("data-src"));


var t = a.length - 1;

Gallery.create({
    galleryContainer: ".gallery_container",
    slidesPerView: 3,
    gallery_prev: ".gallery_prev",
    gallery_next: ".gallery_next",
    initialSlide: e,
    onGalleryStart: function(e) {
        0 == e.index ? "" != $(".gallery_container .gallery_item").eq(1).find("img").attr("src") && $(".gallery_container .gallery_item").eq(1).find("img").attr("src", $(".gallery_container .gallery_item").eq(1).find("img").attr("data-src")) : e.index < t ? "" != $(".gallery_container .gallery_item").eq(e.index - 1).find("img").attr("src") && $(".gallery_container .gallery_item").eq(e.index - 1).find("img").attr("src", $(".gallery_container .gallery_item").eq(e.index - 1).find("img").attr("data-src")) : e.index > t && "" != $(".gallery_container .gallery_item").eq(e.index + 1).find("img").attr("src") && $(".gallery_container .gallery_item").eq(e.index + 1).find("img").attr("src", $(".gallery_container .gallery_item").eq(e.index + 1).find("img").attr("data-src")),
        t = e.index
    },
    onGalleryEnd: function() {}
})

i = !1




touchEve();

// 根据滑动距离 执行上一张下一张
function touchEve() {
    var e, a, t, i = 0,
        n = function(a) {
            var t = a.touches[0];
            e = t.pageX
        },
        r = function(n) {
            var r = n.touches[0];
            a = r.pageX - e, t = i + a
        },
        o = function() {
            -50 > t ? $(".gallery_prev").click() : t > 50 && $(".gallery_next").click(), t = 0
        },
        l = document.getElementById("gallery3d");
    l.addEventListener("touchstart", n, !1), l.addEventListener("touchmove", r, !1), l.addEventListener("touchend", o, !1)
};

