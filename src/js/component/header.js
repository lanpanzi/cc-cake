define(["jquery", "bootstrapjs", "cookie"], () => {
	class Header {
		constructor() {
			this.str = "";

			this.init();
		}
		init() {
			// 导入header
			$("header").load("/html/component/header.html", () => {
				this.condition = $("#condition");
				this.renew();
				$("#exit").on("click", () => {
					this.quit();
				});
				this.num = $("#num");
				this.count();

				// 搜索功能
				this.form = $("form");
				$("#search").on("click", (e) => {
					e.preventDefault();
					this.search();
				});
			});

			return this;
		}
		// 判断是否有cookie, 有cookie则更新用户登录状态
		renew() {
			if ($.cookie("phoneNum")) {
				this.str += `<a href="javascript:;" class="navbar-link" id="user">${$.cookie("phoneNum")}</a>&nbsp;
							<a href="javascript:;" class="navbar-link" id="exit">退出</a>`;
			} else {
				this.str += `<a href="/html/login.html" class="navbar-link">登录</a>
							<i id="or">/</i>
							<a href="/html/register.html" class="navbar-link">注册</a>`;
			}
			this.condition.html(this.str);
		}
		// 退出登录操作
		quit() {
			if (confirm("您确定要退出登录吗？")) {
				$.cookie("phoneNum", $.cookie("phoneNum"), {
					expires: -1,
					path: "/"
				});
				location.reload();
			}
		}
		// 商品件数
		count() {
			var num = 0;
			if ($.cookie("productInfo")) {
				var arr = JSON.parse($.cookie("productInfo"));
				$.each(arr, (index, item) => {
					num += item.num;
				});
			}
			this.num.text(num);
			return this;
		}

		// 搜索
		search() {
			var str = this.form.serialize();
			$.getJSON(
				"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&" + str,
				function (res) {
					$("#hint").css({display: "block"});
					var data = res.s;

					$.each(data, function (i, item) {
						$("<li>" + item + "</li>").appendTo($("#hint"));
					});

					$("#hint").on("click", "li", function(){
						$("input[type=text]").val($(this).text());
						$("#hint").hide();
					})
				});
		}
	}

	return new Header();
});