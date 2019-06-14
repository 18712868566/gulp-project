/*
 * @Author: lixuefeng
 * @Date:   2019-05-07 14:47:18
 * @Last Modified by: Lip
 * @Last Modified time: 2019-06-12 14:51:55
 * @File_path:  C:\Users\Administrator\Desktop\feiren\js\style.js
 */
var reserveNum = $('.reserveNum').text();

function time() { //每隔1秒让++i
    $('.reserveNum').text(++reserveNum)
    setTimeout(time, 1000);
}
time(); //执行time函数

// 预约成功
// dialog.alertyuyue();

// 获得5枚扭蛋
// dialog.alertPopnd();

// 奖励列表
// dialog.alertPoprd('4');

// 弹出奖励
// dialog.alertPLott();

// 弹出兑换码
// dialog.alertCode();

$(function() {
    //关闭
    $(document).on("click", "#alertInfo .close,.close,.btn-ok,.try", dialog.closeDiv);

    //弹出视频
    $('.vBtn').on('click', function() {
        var url = $(this).attr('data-url');
        console.log(url)
        dialog.alertVideo(url);
    })

    // 选中协议
    $('.ag-tips').on('click', function() {
        $(this).toggleClass('yes');
    })

    $('._cos .sBtnImg').on('click', function() {
        var url = $(this).attr('data-url');
        dialog.alertImg(url, '1');
    })

    $('._painting .sBtnImg').on('click', function() {
        var url = $(this).attr('data-url');
        dialog.alertImg(url, '0');
    })

    // menu
    var bOff = true;
    $('.change-btn').on('click', function() {
        $(this).toggleClass('cur');
        if (bOff) {
            $('.menu').show();
            $('.menu').removeClass('nav-hide').addClass('nav-show');

            bOff = !bOff;
            console.log('show nav')
        } else {
            $('.menu').removeClass('nav-show').addClass('nav-hide');
            bOff = !bOff;
            console.log('hide nav')
        }
    });


    /* 英雄展示 */
    argumentsTab('.page6 .tablist .list', '.page6 .tabbox .xxk')

    argumentsTab('.page8 .tablist .list', '.page8 .tabbox .xxk')

    argumentsTab('.hero_skill_sels .hero_skill_sel', '.hero_skill_text p')
})


// 复制粘贴功能
function copyFn1() {
    var val = document.getElementById('numxmb1');
    window.getSelection().selectAllChildren(val);
    document.execCommand("Copy");
    alert("Copy success !");
}

function copyFn2() {
    var val = document.getElementById('numxmb2');
    window.getSelection().selectAllChildren(val);
    document.execCommand("Copy");
    alert("Copy success !");
}

function copyFn3() {
    var val = document.getElementById('numxmb3');
    window.getSelection().selectAllChildren(val);
    document.execCommand("Copy");
    alert("Copy success !");
}

function copyFn4() {
    var val = document.getElementById('numxmb4');
    window.getSelection().selectAllChildren(val);
    document.execCommand("Copy");
    alert("Copy success !");
}



// 选项卡函数
function argumentsTab(tabList, tabbox) {
    var $div_li = $(tabList);
    $div_li.click(function() {
        $(this).addClass('curr').siblings().removeClass('curr');
        var index = $div_li.index(this);
        $(tabbox).eq(index).addClass("curr").show().siblings().removeClass("curr").hide();
    }).eq(0).click();
}


$('.page3 .tit3').on('click', function() {
    const txt = `
    Make the lucky draw in Extraordinary Gacha now! Here are rules:
    <br/>1. Every 5 gachas you can get after loggin. Share to FB can get 5 additional gachas, totally 10 can be used.
    <br/>2. Everyone can only get ONE reward finally. If you choose a reward as the final one, it will take place of the previous one, please choose carefully!
    <br/>3. You can check final reward in "My Reward".
    <br/>4. All in-game rewards will be sent by gift code when click the button of My Gift Code on this page within 7 days after game release.
    <br/>5. Please redeem the gift code in game and check it at in-game mail box.
    `

    layer.alert(txt, {
        title: 'Message',
        closeBtn: false,
        btn: ['OK']
    });
});


$('.page4 .tit4').on('click', function() {
    const txt = `
    <br/>1. Login by Facebook and invite your friends to this page to finish pre-registration, their profile picture will be shown here.
    <br/>2. Invite 1, 3 and 5 friends successfully can get corresponding rewards, your friends can get a speical reward too.
    <br/>3. The event is only available to people who haven't logged in this page.
    <br/>4.All in-game rewards will be sent by gift code when click the button of My Gift Code on this page within 7 days after game release. You can redeem the gift code in game and check it at in-game mail box.
     `
    layer.alert(txt, {
        title: 'Message',
        closeBtn: false,
        btn: ['OK']
    });
});


$('.page5 .tit5').on('click', function() {
    const txt = `When the number of pre-registered people reach the goal, all server rewards will be sent after official release.`

    layer.alert(txt, {
        title: 'Message',
        closeBtn: false,
        btn: ['OK']
    });
});

$(".swiper-container .swiper-slide").height(document.documentElement.clientHeight);
var mySwiper = new Swiper('#pages', {
    direction: 'vertical', // 垂直切换选项
    initialSlide: 0,
    observer: !0,
    observeParents: !0,
    slidesPerView: "auto",
    on: {
        transitionStart: function() {
            layer.closeAll();
        }
    },
});

$('.menu li').on('click', function() {
    var thisListIndex = $(this).index();
    console.log(thisListIndex)
    if (thisListIndex == '8') {

        return false;
    }
    mySwiper.slideTo(thisListIndex, 1000, false); //切换到第一个slide，速度为1秒
})

$('.btn_toTop').on('click', function() {
    mySwiper.slideTo(0, 0, false); //切换到第一个slide，速度为1秒
})

var all = new Swiper('._all .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '._all .pagination_all',
        clickable: true,
    },
});

var ad_content = new Swiper('.ad_content .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '.ad_content .pagination_all',
        clickable: true,
    },
});

var tk_content = new Swiper('.tk_content .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '.tk_content .pagination_all',
        clickable: true,
    },
});

var ap_content = new Swiper('.ap_content .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '.ap_content .pagination_all',
        clickable: true,
    },
});

var asn_content = new Swiper('.asn_content .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '.asn_content .pagination_all',
        clickable: true,
    },
});

var adc_content = new Swiper('.adc_content .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '.adc_content .pagination_all',
        clickable: true,
    },
});

var sup_content = new Swiper('.sup_content .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '.sup_content .pagination_all',
        clickable: true,
    },
});


var video_content = new Swiper('._video .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '._video .pagination_video',
        clickable: true,
    },
});

var cos_content = new Swiper('._cos .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '._cos .pagination_cos',
        clickable: true,
    },
});

var painting_content = new Swiper('._painting .hide-swiper', {
    autoplay: false, //可选选项，自动滑动
    observer: true,
    observeParents: true,
    pagination: {
        el: '._painting .pagination_painting',
        clickable: true,
    },
});