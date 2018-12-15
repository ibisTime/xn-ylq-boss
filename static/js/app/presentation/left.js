$(function() {
    var userId = getQueryString('userId');
    sessionStorage.setItem('report_userId', userId);

    // 获取七牛地址
    reqApi({
        code: '623917',
        json: {
            key: 'qiniu_domain',
            updater:'',
            companyCode: OSS.system
        },
        sync: true
    }).then(function(data) {
        window.sessionStorage.setItem('qiniuUrl', 'http://' + data.cvalue);
    });

    initMenu();

	function initMenu(){
	    $.when(
            reqApi({
                code: "623060",
                json: {
                    userId: userId,
                    key: 'INFO_ZHIFUBAO'
                }
            }),
            reqApi({
                code: "623060",
                json: {
                    userId: userId,
                    key: 'INFO_CARRIER'
                }
            })
        ).then(function (data, data2) {
            if (data && data.result) {
                $("#reportLeft li.alipay").attr('href', + data.message);
            }

            if (data1 && data1.result) {
                $("#reportLeft li.carrierOperator").attr('href', + data1.message);
            }
        });
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