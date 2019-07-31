/**
 * 微信登录
 */
function login() {
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                // var code = res.code;
                let money = this.data.checkedPrice; //用户选中的打赏价钱
                let userInfo = this.data.userInfo; //用户登录的所有信息
                // console.log(this.data.userInfo, "666")
                let nick_name = userInfo.nickName;
                let avatar_url = userInfo.avatarUrl;
                resolve({
                    userInfo: this.data.userInfo
                })
            }
        });
    })
}

/**
 * 请求支付参数
 */
function requestPayParametes(url, code, money, nick_name, avatar_url) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: {
                code: code,
                money,
                nick_name,
                avatar_url
            },
            method: "POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: (res) => {
              console.log(res)
                let data = res.data.data;
                resolve({
                    appId: data.appId,
                    timeStamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: 'MD5',
                    paySign: data.paySign
                })
            }
        });
    })
}

/**
 * 小程序段微信支付函数
 * @param {*} price 
 */
function pay(url, code, price, nick_name, avatar_url) {
    return new Promise((resolve, reject) => {
        requestPayParametes(url, code, price, nick_name, avatar_url).then(res => {
          console.log(res);
            wx.requestPayment({
                appId: res.appId,
                timeStamp: res.timeStamp,
                nonceStr: res.nonceStr,
                package: res.package,
                signType: 'MD5',
                paySign: res.paySign,
                success(res) {
                    resolve&&resolve(true);
                },
                fail: function() {
                    reject&&reject(false);
                }
            });
        });
    });
}
module.exports = {
    pay: pay
}