require(['./requirejs.config'], () => {
    require(["jquery", "url", "item", "addCart", "bootstrapjs", "header", "footer"], ($, url, item) => {
        item.init(url.baseUrlRap+"list");
    });
});