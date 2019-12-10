$(function () {
    /*顶部导航栏*/
    $('.region').mouseenter(function () {
        $('.dropdown_fl').show();
    });
    $('.region').mouseleave(function () {
        $('.dropdown_fl').hide();
    });
    $('.fr_block').mouseenter(function () {
        $(this).children('div').show();
    });
    $('.fr_block').mouseleave(function () {
        $(this).children('div').hide();
    });
    /*购物车01*/
    $('.shop_car').mouseenter(function () {
        $('.shop_car_dropdown').show();
    });
    $('.shop_car').mouseleave(function () {
        $('.shop_car_dropdown').hide();
    });
    /*购物车02*/
    $('.fixed_shop_car').mouseenter(function () {
        $('.fixed_car_dropdown').show();
    });
    $('.fixed_shop_car').mouseleave(function () {
        $('.fixed_car_dropdown').hide();
    });
    /*固定导航栏*/
    var navOffset = $('.Seckill').offset().top;
    var elevator_nav_lis=$('.elevator_nav>ul>li');
    var features_offset=$('.features').offset().top;
    var channles_offset=$('.channels_jd').offset().top;
    var recommend_offset=$('.recommend').offset().top;
    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        if (navOffset<scrollPos) {
            $('.elevator_nav').css({'position': 'fixed', 'top': 100});
            $('.fixed_nav').slideDown();
        }
        else {
            $('.fixed_nav').hide();
            $('.elevator_nav').css({'position': 'absolute', 'top': navOffset});
        }
    });
    elevator_nav_lis.eq(0).click(function () {
        flag = false;
        $("body, html").stop().animate({
            scrollTop: navOffset-50
        }, function() {
            flag = true;
        });
    });
    elevator_nav_lis.eq(1).click(function () {
        flag = false;
        $("body, html").stop().animate({
            scrollTop: features_offset-50
        }, function() {
            flag = true;
        });
    });
    elevator_nav_lis.eq(2).click(function () {
        flag = false;
        $("body, html").stop().animate({
            scrollTop: channles_offset-50
        }, function() {
            flag = true;
        });
    });
    elevator_nav_lis.eq(3).click(function () {
        flag = false;
        $("body, html").stop().animate({
            scrollTop: recommend_offset-50
        }, function() {
            flag = true;
        });
    });
    elevator_nav_lis.eq(6).click(function () {
        flag = false;
        $("body, html").stop().animate({
            scrollTop: 0
        }, function() {
            flag = true;
        });
    });
    /*焦点导航*/
    var index;
    $("#fs_index>li").mouseenter(function () {
        index = $(this).index();
        $('.fs_clo1_dropdown').children('div').eq(index).show();
        $('.fs_clo1_dropdown').css({border: "1px solid #d9d9d9", boxShadow: ' 0 0 1px #000', zIndex: 3});
    });
    $("#fs_index>li").mouseleave(function () {
        index = $(this).index();
        $('.fs_clo1_dropdown').children('div').eq(index).hide();
        $('.fs_clo1_dropdown').css({border: "0px solid #d9d9d9", boxShadow: ' 0 0 0px #000', zIndex: 1});

    });
    $('.dropdown_1').mouseenter(function () {
        $(this).show();
        $('.fs_clo1_dropdown').css({border: "1px solid #d9d9d9", boxShadow: ' 0 0 1px #000', zIndex: 3});
    });
    $('.dropdown_1').mouseleave(function () {
        $(this).hide();
        $('.fs_clo1_dropdown').css({border: "0px solid #d9d9d9", boxShadow: ' 0 0 0px #000', zIndex: 1});
    });

    //主轮播图
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';

        }, 15);
    }

    var arrow_l = document.querySelector('.fs_arrow_l');
    var arrow_r = document.querySelector('.fs_arrow_r');
    var focus = document.querySelector('.fs_clo2');
    var focusWidth = focus.offsetWidth;
    var ul = focus.querySelector('ul');
    var ol = document.querySelector('.circle');
    var num = 0;
    var circle = 0;
    var flag = true;
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        timer = setInterval(function () {
            arrow_r.click();
        }, 3000)
    });
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data_index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('data_index');
            num = index;
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var firstImg = ul.children[0].cloneNode(true);
    ul.appendChild(firstImg);
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }

    });
    var timer = setInterval(function () {
        arrow_r.click();
    }, 3000);

    //透明度轮播图
    var opacity_index = 0;
    var opacity_timer;
    var opacity_lis = $('.fs_clo3>ul>li');
    var a=true;
    $('.fs_clo3').mouseenter(function () {
        $('.fs_clo3>a').show();
        clearInterval(opacity_timer);
    });
    $('.fs_clo3').mouseleave(function () {
        $('.fs_clo3>a').hide();
        opacity_timer = setInterval(function () {
            $('#fs_arrow_l').click();
        }, 4000)
    });
    $('#fs_arrow_r').click(function () {
            if (opacity_index == opacity_lis.length) {
                opacity_index = 0;
            }
            $('.fs_clo3>ul>li').siblings().stop().fadeOut(500);
            opacity_lis.eq(opacity_index).stop().fadeIn(500,);
            opacity_index++;
    });
    $('#fs_arrow_l').click(function () {
        if (opacity_index < 0) {
            opacity_index = opacity_lis.length - 1;
        }
        $('.fs_clo3>ul>li').siblings().stop().fadeOut(500);
        opacity_lis.eq(opacity_index).stop().fadeIn(500);
        opacity_index--;

    });
    opacity_timer = setInterval(function () {
        $('#fs_arrow_l').click();
    }, 4000);
    //秒杀轮播图01
    var ulWidth = $('.SecKill_list').width();
    var sk_ul = $('.SecKill_list>ul');
    var sk_index = 0;
    var ullength = sk_ul.children(li).length / 4;
    $('.SecKill_list').mouseenter(function () {
        $('.SecKill_list>a').show();
        clearInterval(sk_timer);
        sk_timer = null;
    });
    $('.SecKill_list').mouseleave(function () {
        $('.SecKill_list>a').hide();
        sk_timer = setInterval(function () {
            $('.sk_arrow_r').click();
        }, 3000);
    });
    for (var i = 0; i < 4; i++) {
        var skImg = sk_ul.children(li).eq(i).clone(true);
        skImg.appendTo(sk_ul);
    }
    $('.sk_arrow_r').click(function () {
        if (sk_index > ullength - 1) {
            sk_ul.css({"left": 0});
            sk_index = 0;
        }
        sk_index++;
        sk_ul.stop().animate({left: -sk_index * ulWidth});
    });
    $('.sk_arrow_l').click(function () {
        if (sk_index == 0) {
            sk_index = ullength;
            sk_ul.css({"left": -sk_index * ulWidth});

        }
        sk_index--;
        sk_ul.stop().animate({left: -sk_index * ulWidth});
    });
    var sk_timer = setInterval(function () {
        $('.sk_arrow_r').click();
    }, 3000);

    //秒杀轮播图02
    var brand_index = 0;
    var brandWinth = $('.SecKill_brand').width();
    var brandul = $('.SecKill_brand>ul');
    var brand_lis = $('.SecKill_brand>ul>li').length;
    for (var i = 0; i < brand_lis; i++) {
        $("<li></li>").appendTo($('.SecKill_brand>ol'));
    }
    $('.SecKill_brand>ol>li').eq(0).addClass('brand_current');
    $('.SecKill_brand>ol>li').mouseenter(function () {
        brand_index = $(this).index();
        $(this).siblings().removeClass('brand_current');
        $(this).addClass('brand_current');
        brandul.animate({left: -brand_index * brandWinth});
    });
    /*tab栏*/
    var tab_index;
    var tab_lis = $('.features01_left_tab>li');
    tab_lis.mouseenter(function () {
        $('.features01_left_tab>li>a').removeClass('tab_current');
        $(this).children().addClass('tab_current');
        tab_index = $(this).index();
        $('.tab_all').children().hide();
        $('.tab_all>div').eq(tab_index).show();
    });
    /*好物滚动栏*/
    var goods_ulWidth = $('.goods_list').width();
    var goods_ul = $('.goods_list_ul');
    var good_ul = document.querySelector('.goods_list_ul');
    for (var i = 0; i < 5; i++) {
        var goodsImg = goods_ul.children(li).eq(i).clone(true);
        goodsImg.appendTo(goods_ul);
    }

    function nice_goods() {
        goods_ul.animate({left: -goods_ulWidth * 2}, 19800, 'linear', function () {
            good_ul.style.left = 0;
            nice_goods();
        });
    }

    nice_goods();
    $('.goods_list').mouseenter(function () {
        goods_ul.stop();
    });
    //鼠标离开，动画启动，计算完成剩余动画需要时间
    $('.goods_list').mouseleave(function () {
        var goods_left = parseInt(good_ul.style.left);
        goods_time = -(-1980 - goods_left) * 10;
        goods_ul.animate({left: -goods_ulWidth * 2}, goods_time, 'linear', function () {
            good_ul.style.left = 0;
            nice_goods();
        });
    });
    //频道广场楼层 轮播
    var channels_index = 0;
    var channels_timer;
    var channels_ul = $('.channels_bd');
    var channels_lis = $('.channels_bd_list>div');
    channels_ul.mouseenter(function () {
        clearInterval(channels_timer);
    });
    channels_ul.mouseleave(function () {
        channels_timer = setInterval(function () {
            $('.ch_arrow_r').click();
        }, 4000)
    });
    $('.ch_arrow_r').click(function () {
        flag = false;
        if (channels_index == channels_lis.length) {
            channels_index = 0;
        }
        $('.channels_bd_list>div').siblings().stop().fadeOut(500);
        channels_lis.eq(channels_index).stop().fadeIn(500);
        channels_index++;
    });
    $('.ch_arrow_l').click(function () {
        if (channels_index < 0) {
            channels_index = channels_lis.length - 1;
        }
        $('.channels_bd_list>div').siblings().stop().fadeOut(500);
        channels_lis.eq(channels_index).stop().fadeIn(500);
        channels_index--;
    });
    channels_timer = setInterval(function () {
        $('.ch_arrow_r').click();
    }, 4000);
//    为你推荐 tab
    var feed_li=$('.recommend_tab>li');
    var feed_index;
    feed_li.click(function () {
        $('.recommend_tab>li').find('span').removeClass('recommend_item_title_text');
        $('.recommend_tab>li>div').removeClass('recommend_item_active');
        $(this).find('span').addClass('recommend_item_title_text');
        $(this).children().eq(1).addClass('recommend_item_active');
        feed_index=$(this).index();
        $('.recommend_inner').children().hide().eq(feed_index).show();
    });
});