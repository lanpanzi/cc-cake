define(["jquery", "bootstrapjs"], () => {
	class Carousel {
		constructor() {
			this.index = 0;
			this.btns = [];
			this.timer = null;

			this.init();
		}
		init() {
			// 导入carousel.html
			$(".carousel-wrap").load("/html/component/carousel.html", () => {
				// 获取到li的宽以及li的数量
				this.$oUl = $(".carousel ul");
				this.$imgs = this.$oUl.children();
				this.liWidth = this.$imgs.eq(0).width();
				this.len = this.$imgs.length;
				// 创建按钮并向末尾追加第0张图片
				for(var i = 0; i < this.len; i++) {
					this.btns.push($("<li>").addClass(i === 0 ? "ac" : "").appendTo($("ol")));
				}
				this.$imgs.eq(0).clone().appendTo(this.$oUl);
				// 设置ul的宽
				this.$oUl.width((this.len + 1) * this.liWidth);
				// 轮播图的运动
				this.move();
			});
		}
		move() {
			var _this = this;
			// 给按钮添加点击事件
			$.each(this.btns, function(i, $btn) {
				$btn.on("click", function() {
					_this.btns[_this.index].removeClass("ac");
					_this.index = i;
					$(this).addClass("ac");
					_this.$oUl.stop().animate({
						left: -_this.index * _this.liWidth
					});
				});
			});
			// 自动轮播
			$(".carousel").hover(() => {
				clearInterval(this.timer);
			}, () => {
				this.autoPlay();
			});
		}
		autoPlay() {
			this.timer = setInterval(() => {
				this.btns[this.index].removeClass("ac");
				if(++this.index >= this.len) {
					this.$oUl.stop().animate({
						left: -this.index * this.liWidth
					}, () => {
						this.$oUl.css({
							left: 0
						});
					});
					this.index = 0;
				} else {
					this.$oUl.stop().animate({
						left: -this.index * this.liWidth
					});
				}
				this.btns[this.index].addClass("ac");
			}, 2000);
		}
	}

	return new Carousel();
});