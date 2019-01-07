require(["requirejs.config"], () => {
	require(["jquery", "bootstrapjs", "header", "cookie", "footer"], () => {
		class Log{
			constructor() {
				this.init();
			}
			// 绑定事件
			init() {
				var _this = this;
				$("h3").on("click", function(){
					_this.change(this);
				});
				$(".content form").on("submit", function(e){
					e.preventDefault();
					_this.entry(this);
				});
			}
			// 登录方式切换
			change(that) {
				$(that).addClass("ac").siblings().removeClass("ac");
				$(".content form").eq($(that).index()).addClass("ac").siblings().removeClass("ac");
			}
			// 提交后台进行登录
			entry(that) {
				if ($(that).index() === 0) {
					$.ajax({
						url: "http://localhost/api/v1/login.php",
						type: "POST",
						data: {
							phoneNum: $("#inputPhone1").val(),
							password: $("#inputPassword").val() 
						},
						success: function(res){
							if (res.res_code === 1) {
								if ($("#remember1").prop("checked")) {
									// 选中了“记住我”
									$.cookie(
										"phoneNum", 
										res.res_body.phoneNum, 
										{expires: 3, path: "/"}
									);
								} else{
									// 未选中“记住我”
									$.cookie(
										"phoneNum", 
										res.res_body.phoneNum, 
										{path: "/"}
									);
								}
								location.href = "/index.html";
							} else{
								alert("请输入正确的账号");
							}
						},
						dataType: "json"
					});
				} /* else if ($(that).index() === 1) {

				} */
			}
		}
		new Log();
	});
});