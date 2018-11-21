$(function () {
    var columns = [ {
        field: 'today',
        title: '日期',
        formatter: function (v, data) {
            return dateFormat(data.today,'yyyy-MM-dd')
        }
    },{
        field: 'regNum',
        title: '注册人数'
    },{
        field: 'certiNum',
        title: '认证人数'
    },{
        field: 'zmxyNum',
        title: '芝麻认证人数'
    },{
        field: 'carrierNum',
        title: '运营商认证人数'
    },{
        field: 'jdtNum',
        title: '借贷通导流人数'
    },{
        field: 'applyNum',
        title: '申请人数'
    },{
        field: 'fkNum',
        title: '放款单量'
    },{
        field: 'fkAmount',
        title: '放款金额',
        formatter: moneyFormat
    },{
        field: 'orderAmount',
        title: '订单金额',
        formatter: moneyFormat
    },{
        field: 'yhkNum',
        title: '当日应还款单量'
    },{
        field: 'yhkAmount',
        title: '当日应还款金额',
        formatter: moneyFormat
    },{
        field: 'sjhkNum',
        title: '实际还款总单量'
    },{
        field: 'bfhkNum',
        title: '宝付代扣还款单量'
    },{
        field: 'bfhkAmount',
        title: '宝付代扣还款金额',
        formatter: moneyFormat
    },{
        field: 'zfbhkNum',
        title: '支付宝还款单量'
    },{
        field: 'zfbhkAmount',
        title: '支付宝还款金额',
        formatter: moneyFormat
    },{
        field: 'hkAmount',
        title: '实际还款总金额',
        formatter: moneyFormat
    },{
        field: 'xqNum',
        title: '续期总单量'
    },{
        field: 'bfdkNum',
        title: '宝付代扣续期单量'
    },{
        field: 'bfdkAmount',
        title: '宝付代扣续期金额',
        formatter: moneyFormat
    },{
        field: 'zfbdkNum',
        title: '支付宝代扣续期单量'
    },{
        field: 'zfbdkAmount',
        title: '支付宝代扣续期金额',
        formatter: moneyFormat
    },{
        field: 'xqTotalAmount',
        title: '续期总金额',
        formatter: moneyFormat
    },{
        field: 'yqhkNum',
        title: '逾期还款单量'
    },{
        field: 'yqhkAmount',
        title: '逾期还款金额',
        formatter: moneyFormat
    },{
        field: 'bfyqNum',
        title: '宝付代扣逾期还款单量'
    },{
        field: 'bfyqTotalAmount',
        title: '宝付代扣逾期还款金额',
        formatter: moneyFormat
    },{
        field: 'zfbyqNum',
        title: '支付宝逾期还款单量',
    },{
        field: 'zfbyqTotalAmount',
        title: '支付宝逾期还款金额',
        formatter: moneyFormat
    },{
        field: 'ysNum',
        title: '当前应收单量',
    },{
        field: 'ysTotalAmount',
        title: '当前应收金额',
        formatter: moneyFormat
    },{
        field: 'ysbjTotalAmount',
        title: '当前应收本金',
        formatter: moneyFormat
    },{
        field: 'ysfyTotalAmount',
        title: '当前应收费用',
        formatter: moneyFormat
    },{
        field: 'yqCount',
        title: '当前逾期单量'
    },{
        field: 'yqTotalAmount',
        title: '当前逾期金额',
        formatter: moneyFormat
    },{
        field: 'yqbjTotalAmount',
        title: '当前逾期本金',
        formatter: moneyFormat
    },{
        field: 'yqfyTotalAmount',
        title: '当前逾期费用',
        formatter: moneyFormat
    }];

    buildList({
        columns: columns,
        pageCode: '623700',
    });

});