// 提交后台
define(["jquery"], () => {
	class Reg {
		constructor() {
			// 定义正则
			this.phone = /^1[34578]\d{9}$/;
			this.pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
			this.captcha = /^u847$/i; 
			
			this.init();
		}
		// 初始化(绑定事件)
		init() {
			this.form = $("form");
			this.span = $(".err-text_span");
			
			this.form.delegate("input", "blur", (e) => {
				this.test(e.currentTarget);
			});
			
			this.form.on("submit", (e) => {
				// 阻止默认行为
				event.preventDefault();
				if (this.test()) {
					this.reg();
				}
			})
		}
		test(target) {
			if (target.id === "inputPhone") {
				if (this.phone.test($(target).val())) {
					this.span.html("");
				} else{
					this.span.html("<i></i>请输入正确的手机号码");
				}
			} else if (target.id === "inputPassword1") {
				if (this.pwd.test($(target).val())) {
					this.span.html("");
				} else{
					this.span.html("<i></i>密码有8～20个字符，需同时包含英文和数字");
				}
			} else if (target.id === "inputPassword2") {
				if ($(target).val() === $("#inputPassword1").val()) {
					this.span.html("");
				} else{
					this.span.html("<i></i>两次密码输入不一致");
				}
			} else if (target.id === "inputCaptcha") {
				if (this.captcha.test($(target).val())) {
					this.span.html("");
				} else{
					this.span.html("<i></i>图形验证码错误");
				}
			} else if (target.id === "inputMessage") {
				if ($(target).val() === "1234") {
					this.span.html("");
				} else{
					this.span.html("<i></i>手机验证码错误");
				}
				
				return true;
			}
		}
 		// 向后台发起请求
		req(event) {
		  	// ajax发送请求
			$.ajax({
				url: "http://localhost/api/v1/register.php",
				type: "POST",
				data: {
					phoneNum: $("#inputPhone").val(),
					password: $("#inputPassword2").val()
				},
				success: function(res) {
					console.log(res);
				},
				dataType: "json"
			});
		}
	}
	return new Reg();
});