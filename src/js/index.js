require(["requirejs.config"], () => {
	require(["jquery", "template", "url", "addCart", "bootstrapjs", "header", "carousel", "footer"], ($, template, url, addCart) => {
		$.ajax({
			url: url.baseUrlRap+"new-list",
			type: "GET",
			dataType: "json",
			success: function(res){
				if (res.res_code === 1) {
					var newLi = res.res_body.data;
					var html = template("new-list_template", {newLi: newLi});
					$(".new-list").html(html);
					$(".addCart").each((index, addBtn) => {
						$(addBtn).on("click", function(){
						   addCart.init(newLi[index]);
					   });
					});
				}
			}
		});
	});
});