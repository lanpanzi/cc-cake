define(["jquery"], () => {
	class Footer {
		constructor() {
			this.init();
		}
		init() {
			// 导入footer
			$("footer").load("/html/component/footer.html");
		}
	}
	
	return new Footer();
});