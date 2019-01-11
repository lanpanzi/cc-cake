require(["requirejs.config"], () => {
	require(["jquery", "bootstrapjs", "regExp", "captcha", "header", "footer"], () => {
		class Register {
			constructor() {
				// 定义正则
				this.phone = /^1[34578]\d{9}$/;
				this.pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
				this.captcha = /^[a-z0-9]{4}$/i;

				this.init();
			}
			// 初始化(绑定事件)
			init() {
				this.span = $(".err-text_span");

				$("form").on("submit", (e) => {
					// 阻止默认行为
					e.preventDefault();
					if (this.test()) {
						console.log(111);
						this.req();
					} else {
						console.log(222);
						this.test();
					}
				})
			}
			// 正则验证
			test() {
				if (this.phone.test($("#inputPhone").val())) {
					var flag = false;
					if (this.pwd.test($("#inputPassword1").val())) {
						if ($("#inputPassword2").val() === $("#inputPassword1").val()) {
							if (this.captcha.test($("#inputCaptcha").val()) && ($("#inputCaptcha").val() === $(".captcha-pic").text().toLowerCase() || $("#inputCaptcha").val() === $(".captcha-pic").text().toUpperCase() || $("#inputCaptcha").val() === $(".captcha-pic").text())) {
								if ($("#inputMessage").val() === "1234") {
									flag = true;
								}
							}
						} else if($("#inputPassword2").val() !== "") {
							this.span.html("<i></i>两次密码输入不一致");
						}
					} 
				} else{
					this.span.html("<i></i>请输入正确的手机号码");
				}
				return flag;
			}
			// 向后台发起请求
			req() {
				// ajax发送请求
				$.ajax({
					url: "http://localhost/api/v1/register.php",
					type: "POST",
					data: {
						phoneNum: $("#inputPhone").val(),
						password: $("#inputPassword2").val()
					},
					success: function (res) {
						console.log(res);
						if (res.res_code === 1) {
							location.href = "/html/login.html";
						}
					},
					dataType: "json"
				});
			}
		}
		return new Register();
	});
});