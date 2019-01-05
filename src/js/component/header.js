define(["jquery", "bootstrapjs"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			// 导入header
			$("header").load("/html/component/header.html");
		}
	}
	
	return new Header();
});