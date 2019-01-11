// 提交后台
define(["jquery"], () => {
	class RegExp {
		constructor() {
			// 定义正则
			this.phone = /^1[34578]\d{9}$/;
			this.pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
			this.captcha = /^[a-z0-9]{4}$/i;
			
			this.init();
		}
		// 初始化(绑定事件)
		init() {
			this.form = $("form");
			this.span = $(".err-text_span");
			
			this.form.delegate("input", "blur", (e) => {
				this.target = e.currentTarget;
				this.test();
			});
		}
		// 正则验证
		test() {
			if (this.target.id === "inputPhone") {
				if (this.phone.test($(this.target).val())) {
					this.span.html("");
				} else{
					this.span.html("<i></i>请输入正确的手机号码");
				}
			} else if (this.target.id === "inputPassword1") {
				if (this.pwd.test($(this.target).val())) {
					this.span.html("");
				} else{
					this.span.html("<i></i>密码有8～20个字符，需同时包含英文和数字");
				}
			} else if (this.target.id === "inputPassword2") {
				if ($(this.target).val() === $("#inputPassword1").val()) {
					this.span.html("");
				} else{
					this.span.html("<i></i>两次密码输入不一致");
				}
			} else if (this.target.id === "inputCaptcha") {
				if (this.captcha.test($(this.target).val()) && ($(this.target).val() === $(".captcha-pic").text().toLowerCase() || $(this.target).val() === $(".captcha-pic").text().toUpperCase() || $(this.target).val() === $(".captcha-pic").text())) {
					this.span.html("");
				} else{
					this.span.html("<i></i>图形验证码错误");
				}
			} else if (this.target.id === "inputMessage") {
				if ($(this.target).val() === "1234") {
					this.span.html("");
				} else{
					this.span.html("<i></i>手机验证码错误");
				}
			}
		}
	}
	return new RegExp();
});