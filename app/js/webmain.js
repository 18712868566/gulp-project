/*
 * @Author: lixuefeng
 * @Date:   2019-05-16 15:17:07
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-05-20 17:46:48
 * @File_path:  C:\Users\Administrator\Desktop\feiren\js\webmain.js
 */

// 服务器域名
var domain = 'https://eo-moba.herogame.com/';
// 获取用户信息接口
var getUserInfoUrl = domain+'/invite/get-user-info.html';

// 分享成功回调接口
var fbShare = domain+'/invite/share.html';

// fblike回调
var fbLike = domain+'/invite/like.html';

// 获取分享参数接口 -- 分享前调用
var getInviteData = domain+'/invite/get-invite-data.html';

// 用户注册接口
var register = domain+'/invite/register.html';

// 查看已邀请好友列表信息
var inviteList = domain+'/invite/invite-list.html';

// 抽奖接口
var lottery = domain+'/invite/lottery.html';

// 确认奖励接口
var giftSure = domain+'/invite/gift-sure.html';

// 中奖记录接口
var awardLog = domain+'/invite/award-log.html';

// 获取兑换码
var giftLog = domain+'/invite/gift-log.html';


// 存储用户状态数据对象
var isLogin; //是否登陆
var is_share; //是否分享
var is_like; //是否like
// 开始抽奖
var Off = true;
var score = 0;

$(function() {
    // facebook分享页面操作
    $('.btn-share1,.btn-share3').on('click',function(){
        fb_sharePage();
    });

    getUserInfo();

    $(document).on('click','.game_go,.btn-reward,.btn-Prn,.alertCode',function(){
        console.log(isLogin)
        if (!isLogin) {
            dialog.alertPopLog();
        }
    });



    // 查看奖励列表
    $('.btn-reward').on('click', function() {
        dialog.alertPoprd('0');
    });

    $('.alertCode').on('click',function(){
        // dialog.alertCode('1');
    });

    // 有奖预约 -- 校验
    $('.btn-Prn').on('clickttt', function() {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
        var obj = document.getElementById("mazey"); //要验证的对象
        if (obj.value === "") { //输入不能为空
            layer.tips('邮箱不能为空!', '#mazey', {
              tips: [1, '#ff26ab'] //还可配置颜色
            });
            return false;
        }
        if (!reg.test(obj.value)) { //正则验证不通过，格式不对
            layer.tips('邮箱格式不正确,请从新输入!', '#mazey', {
              tips: [1, '#ff26ab'] //还可配置颜色
            });
            obj.value = "";
            return false;
        } else {
            // 同意协议
            if ($('.ag-tips').hasClass('yes')) {
                layer.msg('格式正确,提交到后台')
                // 这里提交邮箱到后台
                // 这里要先判断第一步是否完成

            }else{
                layer.tips('同意协议先!', '.ag-tips', {
                  tips: [1, '#ff26ab'] //还可配置颜色
                });
            }
        }
    })





    /*$(".game_go").click(function() {
        if (score <= 0) {
            alert('抽奖次数不足!')
        } else {
            if (Off) {
                score--;
                draw()
            }
        }
    });*/


    // 扭蛋机 动画
    function draw() {
        Off = !Off; //开关重复点击
        var number = Math.floor(4 * Math.random() + 1);

        for (i = 1; i <= 13; i++) {
            $(".qiu_" + i).removeClass("diaol_" + i);
            $(".qiu_" + i).addClass("wieyi_" + i);
        };

        setTimeout(function() {
            for (i = 1; i <= 13; i++) {
                $(".qiu_" + i).removeClass("wieyi_" + i);
            }
        }, 1100);
        setTimeout(function() {
            console.log(number)
            switch (number) {
                case 1:
                    dialog.alertPLott('', '666 Gold');
                    break;
                case 2:
                    dialog.alertPLott('', '777 Gold');
                    break;
                case 3:
                    dialog.alertPLott('', '888 Gold');
                    break;
                case 4:
                    dialog.alertPLott('', '999 Gold');
                    break;
            }

            Off = !Off; // 执行完毕后重置
        }, 1100)

        //取消动画
        setTimeout(function() {
            $(".shengycs span").text(score);
        }, 0)

    };
});



// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: getUserInfoUrl,
        type: "post",
        data: {},
        dataType: "json",
        beforeSend: function(XMLHttpRequest) {},
        success: function(json) {
            console.log(json);
            // 未登录
            if (json.code == 1003) {
                /*============页面初始化============*/
                isLogin = false;
            }
            // 登录
            if (json.code == 0) {
                /*============页面初始化============*/
                isLogin = true;
                (".shengycs span").text(json.data.lottery_num);
            }
        },
        complete: function() {}, //请求完成的处理
        error: function(XMLHttpRequest, textStatus, errorThrown) {} // 请求失败时调用此函数。
    });
}


// fb分享页面
function fb_sharePage() {
    FB.ui({
            method: "share",
            href: "http://eo-moba.herogame.com/invite/index.html"
        },
        function(response) {
            if ($.isArray(response)) {
                $.ajax({
                    url: fbShare,
                    type: "post",
                    data: {},
                    dataType: "json",
                    beforeSend: function(XMLHttpRequest) {
                        layer_load = layer.load(2, {
                            time: 10 * 1000
                        });
                    },
                    // 请求成功后的回调函数
                    success: function(json, textStatus) {
                        layer.close(layer.index);
                        if (json.code == 0) {
                            is_share = true;
                            layer.msg("分享成功,抽卡次数X5!");
                            (".shengycs span").text(json.data.lottery_num);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // 请求失败时调用此函数。
                        layer.msg("Error", {
                            time: 1000
                        });
                    }
                });
            } else {
                layer.msg("分享失败!", {
                    time: 1000
                });
            }
        }
    );
}

// fblike

function fb_like(){

}