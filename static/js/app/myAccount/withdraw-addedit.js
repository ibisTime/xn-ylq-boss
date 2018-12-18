$(function() {
    var accountNumber = getQueryString('accountNumber');
    var view = getQueryString('v');
    var repayOfflineAccountVal = '';

    showLoading();
    reqApi({
        code: '623917',
        json: {
            key: 'repayOfflineAccount',
            companyCode: OSS.system  // 查询打款方式 特殊处理companyCode传systemCode
        },
        sync: true
    }).then(function(data) {
        hideLoading();
        repayOfflineAccountVal = data.cvalue;
      reqApi({
        code: '623915',
        json: {
          systemCode: OSS.system,
          companyCode: OSS.system,
          start: 1,
          limit: 100,
          type: 'WITH',
          updater: ''
        },
        sync: true
      }).then(function (res) {
        console.log(res);
        var columns =  [{
          field: 'remark',
          title: '参数名'
        }, {
          field: 'cvalue',
          title: '参数值'
        }]
        var fields = [{
          field: 'amount',
          title: '取现金额',
          amount: true,
          required: true
        }, {
          field: 'payCardInfo',
          title: '开户行',
          required: true,
          help: '例如：招商银行杭州支行'
        }, {
          field: 'payCardNo',
          title: '银行卡号',
          number: true,
          required: true,
        }, {
          field: "applyNote",
          title: "备注"
        }, {
          field: 'payRules',
          title: '取现规则',
          type: 'o2m',
          readonly: true
        }];

        buildDetail({
          fields: fields,
          view: view,
          addCode: '802350',
          beforeSubmit: (data) => {
            data.accountNumber = accountNumber;
            data.applyUser = getUserId();
            data.applyUserType = 'B';
            return data;
          }
        });
        $('#payRules').html('<table id="payRulesList"></table>');
        $('#payRulesList').bootstrapTable({
          striped: true,
          clickToSelect: true,
          singleSelect: true,
          columns: columns,
          data: res.list
        });
      })

    }, hideLoading);
});