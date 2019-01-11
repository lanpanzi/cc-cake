define(["jquery", "header"], ($, header) => {
    class AddCart {
        constructor() {

        }
        init(data) {
            this.data = data;
            this.data.num = 1;
            this.memory();
        }
        memory() {
            //判断arr中是否有元素，有元素就先保存下来
            var arr = $.cookie("productInfo") ? JSON.parse($.cookie("productInfo")) : [];
            //声明一个变量来记录数组中满足条件的元素的下标
            var index;
            //some判断数组中是否有满足条件的元素，找到就结束
            var isExist = arr.some((item, i) => {
                index = i;
                return item.id === this.data.id;
            });
            //判断是否有和obj相同的元素  如果有则num++,没有就添加obj
            isExist ? arr[index].num++ : arr.push(this.data);
            $.cookie("productInfo", JSON.stringify(arr), {path: "/"});
            header.count();
            if (confirm("添加购物车成功，前往购物车？")) {
                location.href = "/html/cart.html";
            }
        }
    }

    return new AddCart();
});