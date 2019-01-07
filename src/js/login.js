require(["../js/requirejs.config"], () => {
	require(["jquery", "bootstrapjs", "header", "footer"], () => {
		$("h3").on("click", function(){
			$(this).addClass("ac").siblings().removeClass("ac");
			$(".content form").eq($(this).index()).addClass("ac").siblings().removeClass("ac");
		});
	});
});