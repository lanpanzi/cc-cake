define(['jquery', 'template'], ($, template) => {
    class Item{
        constructor() {

        }
        init(url) {
            new Promise((resolve, reject) => {
                $(".cake-list_content").load("/html/component/item.html", () => {
                    resolve();
                });
            }).then(() => {
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    success: function(res){
                        if (res.res_code === 1) {
                            var list = res.res_body.data;
                            var html = template("list-template", {list: list});
                            $(".list").html(html);
                        }
                    }
                });
            });
        }
    }

    return new Item();
});