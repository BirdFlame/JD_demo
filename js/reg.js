$(function () {
    var reg_tel=new RegExp(/^1[34578]\d{9}$/);
    $('.from_tel').mouseenter(function () {
        $(this).css({borderColor: 'black'});
        $('.form_tel_text').css({borderColor: 'black'});
    });
    $('.from_tel').mouseleave(function () {
        $(this).css({borderColor: '#dddddd'});
        $('.form_tel_text').css({borderColor: '#dddddd'});
    });
    $('.input_tel').focus(function () {
        $('.from_prompt').show();
    });
    $('.input_tel').blur(function () {
        var phone = $(this).val();
        if (!(reg_tel.test(phone))){
            $('.tel_prompt').text('格式错误');
            $('.tel_prompt').css({color:'#ffb55e'});
            $('.from_icon').hide();
        }else {
            $('.from_prompt').hide();
            $('.tel_prompt').css({color: '#33bb44'}).text('格式正确');
            $('.from_icon').show();
        }
    });
});