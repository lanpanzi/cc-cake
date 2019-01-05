require(["../js/requirejs.config"], () => {
	require(["jquery", "bootstrapjs", "header", "footer"], () => {
		var index = 0;
		$("h3").on("click", function(){
			index = $(this).index();
			$(this).addClass("ac").siblings().removeClass("ac");
			$(".content form").eq(index).addClass("ac").siblings().removeClass("ac");
		});
	});
});