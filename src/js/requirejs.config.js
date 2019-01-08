require.config({
	baseUrl: "/",
	
	paths: {
		"jquery":      "libs/jquery/jquery-1.11.3.min",
		"bootstrapjs": "libs/bootstrap/js/bootstrap.min",
		"cookie":      "libs/jquery/jquery-plugins/jquery.cookie.min",
		"template":    "libs/template/template-web",
		"header":      "js/component/header",
		"carousel":    "js/component/carousel",
		"reg":		   "js/component/reg",
		"captcha":     "js/component/captcha",
		"url":		   "js/component/url",
		"item":        "js/component/item",
		"footer":      "js/component/footer"
	},
	
	// 不符合AMD模块规范, 垫片
	shim: {
		"bootstrapjs": {
			deps: ["jquery"]
		},
		"cookie": {
			deps: ["jquery"]
		}
	}
});