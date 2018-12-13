$(function() {
    var userId = getQueryString('userId');
    sessionStorage.setItem('report_userId', userId);

    initMenu();

	function initMenu(){
        //导航切换
        $("#reportLeft li").click(function(e){
            if ($(this).find('a').attr('href').indexOf('*') > -1) {
                e.preventDefault();
                return;
            }
            $(this).addClass("active").siblings().removeClass("active");
        });
	}
	$('.left-menu').slimscroll({
		height: $(document.body).height() - 40
	});
	var timer;
	$(window).on('resize', function() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			$('.left-menu').slimscroll({
				height: $(document.body).height() - 40
			});
		}, 500);
	});

    /**
     * 通过正则表达式获取URL传递参数
     * @param name
     * @returns
     */
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.parent.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
});