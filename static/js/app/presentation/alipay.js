$(function () {
    var userId = sessionStorage.getItem('report_userId');
    showLoading();
    reqApi({
        code: "623060",
        json: {
            userId: userId,
            key: 'INFO_ZHIFUBAO'
        }
    }).then(function (data) {
        hideLoading();
        data && $('.report-place .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        data && $('.report-box .status').html('（'+ OSS.reportFlagList[data.flag] +'）');
        if (data && data.result){
            data = JSON.parse(data.result);
            $('#code').html(data.ref);
            $('#validDatetime').html(dateTimeFormat(data.validDatetime));

            // 主要支出 - 总资产
            var table_major_expenditure_repayment_thead = '';
            var table_major_expenditure_repayment_tbody = '';
            var major_expenditure_repayment = data.major_expenditure.repayment; // 获取当前数据
            Object.keys(major_expenditure_repayment).forEach(function (d, i) {
                var major_expenditure_repayment_data = major_expenditure_repayment[d];// 获取当前行数据

                table_major_expenditure_repayment_tbody += '<tr>' +
                    '<td>' + DictList.major_expenditure_repayment[d] + '</td>';
                if (i === 0) {
                    table_major_expenditure_repayment_thead = '<tr>' +
                        '<th>月份</th>';
                }
                // 遍历列
                Object.keys(major_expenditure_repayment_data).forEach(function (v, j) {
                    if (i === 0) {
                        table_major_expenditure_repayment_thead += '<th>' + v + '</th>';
                    }
                    table_major_expenditure_repayment_tbody += '<td>' + major_expenditure_repayment_data[v] + '</td>';
                });
                table_major_expenditure_repayment_thead += '</tr>';
                table_major_expenditure_repayment_tbody += '</tr>';
            });
            $('#table_major_expenditure_repayment thead').html(table_major_expenditure_repayment_thead);
            $('#table_major_expenditure_repayment tbody').html(table_major_expenditure_repayment_tbody);

        }
    }, hideLoading);
});