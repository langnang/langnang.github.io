(function ($, window, document, undefined) { })
{

    $.fn.setCurrentTime = function (format = "hh:mm:ss") {
        var date = new Date();

        // 年、月、日
        var year = date.getFullYear();
        var month = ("00" + (date.getMonth() + 1)).slice(-2);
        var day = ("00" + date.getDate()).slice(-2);

        // 时、分、秒
        var hour = ("00" + date.getHours()).slice(-2);
        var minute = ("00" + date.getMinutes()).slice(-2);
        var second = ("00" + date.getSeconds()).slice(-2);

        // 实时显示
        // element.innerText = "" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        this.text(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
        // console.log(this);
        // console.log($(this));
        // console.log(el);
    }
    $.fn.setCurrentData = function () { }

} (jQuery, window, document)