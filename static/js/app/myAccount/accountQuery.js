$(function() {
    var accountNumber;

    showLoading();
    reqApi({
        code: '802301',
        json: {
            currency: 'CNY',
            userId: getUserId()
        },
        sync: true
    }).then(function(data) {
    	hideLoading()
    	var lists = data[0];
        $("#amount-CNY").text( '￥' + moneyFormat(lists.amount));
        accountNumber = lists.accountNumber;

    }, hideLoading);

});