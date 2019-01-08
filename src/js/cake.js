require(['./requirejs.config'], () => {
    require(["jquery", "url", "item", "bootstrapjs", "header", "footer"], ($, url, item) => {
        item.init(url.baseUrlRap+"list");
    });
});