define(["jquery"], () => {
    class Captcha {
        constructor() {
            this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ];
            this.colorStr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f',
                'A', 'B', 'C', 'D', 'E', 'F'
            ];

            this.getCaptcha().init();
        }
        init() {
            $("#freshen").on("click", () => {
                this.getCaptcha();
            })
        }
        getCaptcha() { 
            var str = "",
                bgColor = "";
            // 随机字符
            for (var i = 0; i < 4; i++) {
                var index = Math.floor(Math.random() * (this.arr.length));
                str += this.arr[index];
            }
            $(".captcha-pic").text(str);
            // 随机颜色
            for (var j = 0; j < 6; j++) {
                var index = Math.floor(Math.random() * (this.colorStr.length));
                bgColor += this.colorStr[index]; 
            }
            $(".captcha-pic").css({"background": "#"+bgColor});
            return this;
        }
    }

    return new Captcha();
});