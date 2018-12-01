$(function() {
	var code = getQueryString('code');

	var fields = [{
		title: '登录名',
		field: 'loginName',
		required: true,
		maxlength: 30
	}, {
        title: '登录密码',
        field: 'loginPwd',
        type: 'password',
        required: true
    }, {
        title: '姓名',
        field: 'realName',
        required: true
    }, {
        title: '手机号',
        field: 'mobile',
        mobile: true,
        required: true
    }, {
		title: '角色',
		field: 'roleCode',
		required: true,
		type: 'select',
		listCode: '805021',
		keyName: 'code',
		valueName: 'name'
	}, 	{
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];

	buildDetail({
		fields: fields,
		code: code,
		addCode: '630300'
	});

});