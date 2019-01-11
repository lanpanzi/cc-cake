require(['./requirejs.config'], () => {
    require(["jquery", "header", "bootstrapjs", "footer", "cookie"], ($, header) => {
        class Cart {
            constructor() {
                this.str = "";
                this.arr = [];

                this.init().structure();
            }
            init() {
                this.cart1 = $(".cart1");
                this.cart2 = $(".cart2");
                this.tBody = $("tbody");

                return this;
            }
            structure() {
                if ($.cookie("productInfo")) {
                    this.cart2.css({
                        "display": "block"
                    });
                    this.cart1.css({
                        "display": "none"
                    });

                    this.arr = JSON.parse($.cookie("productInfo"));
                    $.each(this.arr, (index, item) => {
                        this.str += `<tr>
                                        <td>
                                            <a href="javascript:;">
                                                <div class="left">
                                                    <img src="${item.img}" alt="">
                                                </div>
                                                <div class="right">${item.title}</div>
                                            </a>
                                        </td>
                                        <td></td>
                                        <td>
                                            ￥<span>${item.price}</span>
                                        </td>
                                        <td>
                                            <div class="number quantity-update">
                                                <input type="button" class="minus" value="－" />
                                                <input type="text" class="goods" name="goods" data-max="
                                                    99" value="${item.num}" />
                                                <input type="button" class="plus" value="＋" />
                                            </div>
                                        </td>
                                        <td>
                                            ￥<span class="subtotals">${item.price}</span>
                                        </td>
                                        <td>
                                            <a href="javascript:;" class="delBtns">删除</a>
                                        </td>
                                    </tr>`;
                    });
                    this.tBody.html(this.str);
                    // 减少商品数量的按钮
                    $(".minus").each((index, minu) => {
                        $(minu).on("click", () => {
                            this.reduce(index);
                        });
                    });
                    // 增加商品数量的按钮
                    $(".plus").each((index, plu) => {
                        $(plu).on("click", () => {
                            this.add(index);
                        });
                    });
                    // 删除商品的数量
                    $(".delBtns").each((index, delBtn) => {
                        $(delBtn).on("click", () => {
                            this.delete(index);
                        });
                    });
                    this.goods = $(".goods");
                    // 失去焦点更新商品数量
                    this.goods.each((index, good) => {
                        $(good).on("blur", () => {
                            this.update(index);
                        })
                    });
                    // 清空购物车
                    $(".cart-submit-empty").on("click", () => {
                        this.clearCart();
                    })
                    // 小计
                    this.subtotals = $(".subtotals");
                    this.subTotal().total();
                    // 结算
                    $("#action-submit-btn").on("click", () => {
                        this.balance();
                    });
                } else {
                    this.cart2.css({
                        "display": "none"
                    });
                    this.cart1.css({
                        "display": "block"
                    });
                }
            }
            // 减少商品数量
            reduce(key) {
                if (this.arr[key].num === 1) {
                    alert("购买数量不能小于1件");
                } else {
                    this.arr[key].num--;
                    this.goods.eq(key).val(this.arr[key].num);

                    this.subTotal().reMemory().total();
                    header.count();
                }
            }
            // 修改商品数量
            update(key) {
                this.arr[key].num = this.goods.eq(key).val();
                this.subTotal().reMemory().total();
                header.count();
            }
            // 增加商品数量
            add(key) {
                this.arr[key].num++;
                this.goods.eq(key).val(this.arr[key].num);

                this.subTotal().reMemory().total();
                header.count();
            }
            // 删除商品
            delete(key) {
                if (confirm("您确定要将该商品移除购物车吗？")) {
                    this.arr.splice(key, 1);
                    this.reMemory();
                    location.reload();
                    this.total();
                    header.count();
                }
            }
            // 清空购物车
            clearCart() {
                $.cookie("productInfo", JSON.stringify(this.arr), {
                    expires: -1,
                    path: "/"
                });
                location.href = "/index.html";
                header.count();
            }
            // 对商品进行操作后需要重存cookie
            reMemory() {
                $.cookie("productInfo", JSON.stringify(this.arr), {
                    path: "/"
                });
                return this;
            }
            // 小计
            subTotal() {
                $.each(this.arr, (index, item) => {
                    var sub = item.price * item.num;
                    this.subtotals.eq(index).text(sub.toFixed(2));
                })
                return this;
            }
            // 总计
            total() {
                var sum = 0;
                this.subtotals.each((index, subtotal) => {
                    sum += parseFloat($(subtotal).text());
                });
                $(".goods_subtotal").text("￥"+ sum.toFixed(2));
                $(".totalSkuPrice").text("￥"+ sum.toFixed(2));
                return this;
            }
            // 判断用户登录状态
            balance() {
                if (!($.cookie("phoneNum"))) {
                    if (confirm("需要登录才能结算")) {
                        location.href = "/html/login.html";
                    }
                } else{
                    location.href = "/html/balance.html";
                }
            }
        }

        return new Cart();
    });
});