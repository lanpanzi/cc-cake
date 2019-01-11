require(['./requirejs.config'], () => {
    require(["jquery", "url", "template", "addCart", "bootstrapjs", "header", "footer", "cookie"], ($, url, template, addCart) => {
        class Detail{
            constructor(){
                this.arr = [];

                this.init().tabChange();
            }
            init(){
                var searchArr = location.search.slice(1).split("=");
                var searchObj = {};
                searchObj[searchArr[0]] = searchArr[1];
                var _this = this;
                $.ajax({
                    url: url.baseUrlRap+"detail",
                    type: "GET",
                    data: searchObj,
                    dataType: "json",
                    success: function(res){
                        if (res.res_code === 1) {
                            var detail = res.res_body;
                            var html = template("detail-template", detail);
                            $(".detail-wrap").html(html);
                            $(".addCart").on("click", () => {
                                addCart.init(detail);
                            });
                        }
                    }
                });

                $.ajax({
                    url: url.baseUrlRap+"detail-list",
                    type: "GET",
                    data: searchObj,
                    dataType: "json",
                    success: function(res){
                        if (res.res_code === 1) {
                            var detailList = res.res_body.data;
                            var html = template("detail-introduction_template", {detailList:detailList});
                            $(".detail-introduction p").html(html);
                        }
                    }
                });

                return this;
            }
            tabChange() {
                $(".goods_list_li").on("click", function(){
                    $(this).addClass("goodsinfocur").siblings().removeClass("goodsinfocur");
                    $(".info-box").eq($(this).index()).addClass("ac").siblings().removeClass("ac");
                });
            }
        }

        return new Detail();
    });
});