import wepy from 'wepy'

// 服务器接口地址
const host = 'http://larabbs.test/api'

// 普通请求
const request = async (options, showLoading = true) => {
	// 显示加载中
	if (showLoading) {
		wepy.showLoading({title:'加载中'})
	}

	// 链接请求地址
	options.url = host + '/' + options.url

	let response = await wepy.request(options)

	if (showLoading) {
		// 隐藏加载中
		wepy.hideLoading()
	}


	// 服务器异常后给与提示
	if (response.statusCode === 500) {
		wepy.showModal({
			title: '提示',
			content: '服务器错误，请联系管理员或者重试'
		})
	}

	return response
}

// 登录
const login  = async (params = {}) => {
	// code只能使用一次，所以每次得单独调用
	let loginData = await wepy.login()

	// 参数中增加code
	params.code = loginData.code

	// 接口请求 weapp/authorizations
	let authResponse = await request({
		url: 'weapp/authorizations',
		data: params,
		method: 'POST'
	})

	// 登录成功，记录token信息
	if (authResponse.statusCode === 201) {
		wepy.setStorageSync('access_token', authResponse.data.access_token)
		wepy.setStorageSync('access_token_expired_at', new Date().getTime() + authResponse.data.expired_in * 1000)
	}

	return authResponse
}

export default {
	request,
	login
}