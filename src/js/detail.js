require(['./requirejs.config'], () => {
    require(["jquery", "url", "template", "bootstrapjs", "header", "footer"], ($, url, template) => {
        class Detail{
            constructor(){
                this.init();
            }
            init(){
                var searchArr = location.search.slice(1).split("=");
                var searchObj = {};
                searchObj[searchArr[0]] = searchArr[1];
                $.ajax({
                    url: url.baseUrlRap+"detail",
                    type: "GET",
                    data: searchObj,
                    dataType: "json",
                    success: function(res){
                        if (res.res_code === 1) {
                            var detail = res.res_body;
                            var html = template("detail-template", detail);
                            $(".detail").html(html);
                        }
                    }
                });
            }
        }

        return new Detail();
    });
});