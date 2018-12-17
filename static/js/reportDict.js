// 报表数据字典
var DictList = {
    // 查询过该用户的相关企业类型
    'searched_org_type': {
        'CASH_LOAN': '现金贷',
        'COMPENSATION': '信用卡代偿',
        'CONSUMSTAGE': '消费分期',
        'CREDITPAY': '信用支付',
        'DATACOVERGE': '数据聚合平台',
        'DIVERSION': '导流平台',
        'BANK': '银行',
        'P2P': 'P2P理财',
        'ZHENGXIN': '信用机构',
        '其他': '其他'
    },
    // 学历
    'education_info': {
        '0': '未知',
        '1': '专科',
        '2': '本科',
        '3': '硕士研究生',
        '4': '博士研究生',
        '5': '预科',
        '6': '夜大/电大/函大'
    },
    // 时段
    'time_step': {
        'morning': '早晨[5:30-9:00]',
        'forenoon': '上午[9:00-11:30]',
        'noon': '中午[11:30-13:30]',
        'afternoon': '下午[13:30-17:30]',
        'dusk': '傍晚[17:30-19:30]',
        'evening': '晚上[19:30-23:30]',
        'daybreak': '凌晨[23:30-1:30]',
        'midnight': '深夜[1:30-5:30]',
    },
    // 主要支出 - 总资产
    'major_expenditure_repayment': {
        'credit_rpy_amt': '信用卡还款金额(元)',
        'credit_rpy_cnt': '信用卡还款笔数',
        'huabei_rpy_amt': '花呗还款金额(元)',
        'huabei_rpy_cnt': '花呗还款笔数',
        'jiebei_rpy_amt': '借呗还款金额(元)',
        'jiebei_rpy_cnt': '借呗还款笔数',
        'other_rpy_amt': '其他还款金额(元)',
        'other_rpy_cnt': '其他还款笔数'
    },
  // 主要支出 - 消费
  'major_expenditure_consumption': {
    'total_consume_amt': '总消费金额(元)',
    'total_consume_cnt': '总消费笔数',
    'max_consume_amt': '月单笔最大消费金额(元)',
    'online_shopping_amt': '网购金额(元)',
    'online_shopping_cnt': '网购笔数',
    'takeout_amt': '外卖金额(元)',
    'takeout_cnt': '外卖笔数',
    'lifepay_amt': '生活缴费金额(元)',
    'lifepay_cnt': '生活缴费笔数',
    'taxipay_amt': '打车金额(元)',
    'taxipay_cnt': '打车笔数',
    'carpay_amt': '汽车用品金额(元)',
    'carpay_cnt': '汽车用品笔数',
    'travel_amt': '航旅金额(元)',
    'travel_cnt': '航旅笔数',
    'lottery_amt': '彩票金额(元)',
    'lottery_rate': '彩票金额占比',
    'lottery_cnt': '彩票笔数',
    'game_amt': '游戏金额(元)',
    'game_rate': '游戏金额占比',
    'game_cnt': '游戏笔数'
  },
  // 主要支出 - 转账-转出
  'major_expenditure_transfer_out_info': {
    'out_amt': '转出总金额(元)',
    'out_cnt': '转出总笔数',
    'max_out_amt': '月单笔最大转出金额(元)'
  },
  // 主要支出 - 理财
  'major_expenditure_financial': {
    'zhao_cai_bao_purchase_amt': '招财申购金额(元)',
    'fund_purchase_amt': '基金申购金额(元)',
    'cun_jin_bao_purchase_amt': '存金宝申购金额(元)'
  },
  // 主要支出 - 其他
  'major_expenditure_financial': {
    'redpkt_amt': '发红包金额',
    'redpkt_cnt': '发红包个数',
    'max_redpkt_amt': '月单个红包最大金额(元)',
    'donate_amt': '爱心捐赠金额(元)',
    'donate_cnt': '爱心捐赠笔数',
    'gratuity_amt': '打赏金额(元)'
  }
}