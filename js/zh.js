     // 网页简繁体转换
    // 本js用于客户在网站页面选择繁体中文或简体中文显示，默认是正常显示，即简繁体同时显示
    // 在用户第一次访问网页时,会自动检测客户端语言进行操作并提示.此功能可关闭
    // 本程序只在UTF8编码下测试过，不保证其他编码有效
    // -------------- 以下参数大部分可以更改 --------------------
    //s = simplified 简体中文 t = traditional 繁体中文 n = normal 正常显示
    var zh_default = 'n'; //默认语言，请不要改变
    var zh_choose = 'n'; //当前选择
    var zh_expires = 7; //cookie过期天数
    var zh_class = 'zh_click'; //链接的class名，id为class + s/t/n 之一
    var zh_style_active = 'font-weight:bold; color:green;'; //当前选择的链接式样
    var zh_style_inactive = 'color:blue;'; //非当前选择的链接式样
    var zh_browserLang = ''; //浏览器语言
    var zh_autoLang_t = true; //浏览器语言为繁体时自动进行操作
    var zh_autoLang_s = false; //浏览器语言为简体时自动进行操作
    var zh_autoLang_alert = true; //自动操作后是否显示提示消息
    //自动操作后的提示消息
    var zh_autoLang_msg = '歡迎來到本站,本站爲方便台灣香港的用戶\n1.采用UTF-8國際編碼,用任何語言發帖都不用轉碼.\n2.自動判斷繁體用戶,顯示繁體網頁\n3.在網頁最上方有語言選擇,如果浏覽有問題時可以切換\n4.本消息在cookie有效期內只顯示一次';
    var zh_autoLang_checked = 0; //次检测浏览器次数,第一次写cookie为1,提示后为2,今后将不再提示
    //判断浏览器语言的正则,ie为小写,ff为大写
    var zh_langReg_t = /^zh-tw|zh-hk$/i;
    var zh_langReg_s = /^zh-cn$/i;
    //简体繁体对照字表,可以自行替换
    var zh_s = '正式成立字浅显易懂始且作践行者认民族始住行众消食农业动盈多元智慧中华化真文科学伟瑰宝也独无核心算法基石专注于优质初创发掘深信早期股权著低调而稳健迎世界所事都并努力爱本创始理健康二无限机会可寻找哺育中国未来优秀家陪伴他们实现生最社会责任使命坚守固发展节奏以原点念主管彭清大见解相追求更扎实及久规划发展不急于时刻与体系相结合初创股权未来开创更广子佳时间程敏思源践行以之道独到自己阔番新天地信奉精品哲学遵守重质不重量细工慢活原则主旨只个即践行者医疗智意义王沁信市深圳周兰阶支持国家支柱产业关怀类生命基石医疗帮助更多提升生命质量先进制造消费生活吃喝玩乐衣怡一的宙子轮唐段种费即所投将回归生意质让天下起做生意服务驱动型服务包括云数据媒体上海蓝鹏股份梅届事会执委财务计算技术是安全工智等方向未来趋势愿景一点零观矢志不渝心诚意先舍后得脚踏实地学无止境精益求精众志成城饮水触机系统冲商务中心座商业计划书简历投递粤证号我们董事罗森博林集团副总裁限有为广东省海青侨青委主任长价值总商会第七慈善会集团慈善基金赖润伟施比受更福宇宙能量出纳罗晓燕努力加油做更好财务助陈嘉宜行政助之所以因联合曾就职于阿里投身金融领域十余年期致力于中西融合巴投研决策热行业并且拥丰富实战经验对创业天使著智触机叶师傅饮茶鸿运当头网络投资香港胜金莎堡酒庄实业加拉国际旅合伙公司企业人餐饮管系统北京动网天下丰疆';
    var zh_t = '正式成立字淺顯易懂始且作踐行者認民族始住行眾消食農業動盈多元智慧中華化真文科學偉瑰寶也獨無核心算法基石專註於優質初創發掘深信早期股權著低調而穩健迎世界所事都並努力愛本創始理健康二無限機會可尋找哺育中國未來優秀家陪伴他們實現生最社會責任使命堅守固發展節奏以原點念主管彭清大見解相追求更紮實及久規劃發展不急於時刻與體系相結合初創股權未來開創更廣子佳時間程敏思源踐行以之道獨到自己闊番新天地信奉精品哲學遵守重質不重量細工慢活原則主旨只個即踐行者醫療智意義王沁信市深圳周蘭階支持國家支柱產業關懷類生命基石醫療幫助更多提升生命質量先進制造消費生活吃喝玩樂衣怡壹的宙子輪唐段種費即所投將回歸生意質讓天下起做生意服務驅動型服務包括雲數據媒體上海藍鵬股份梅屆事會執委財務計算技術是安全工智等方向未來趨勢願景壹點零觀矢誌不渝心誠意先舍後得腳踏實地學無止境精益求精眾誌成城飲水觸機系統沖商務中心座商業計劃書簡歷投遞粵證號我們董事羅森博林集團副總裁限有為廣東省海青僑青委主任長價值總商會第七慈善會集團慈善基金賴潤偉施比受更福宇宙能量出納羅曉燕努力加油做更好財務助陳嘉宜行政助之所以因聯合曾就職於阿裏投身金融領域十余年期致力於中西融合巴投研決策熱行業並且擁豐富實戰經驗對創業天使著智觸機葉師傅飲茶鴻運當頭網絡投資香港勝金莎堡酒莊實業加拉國際旅合夥公司企業人餐飲管系統北京動網天下豐疆';
    String.prototype.tran = function() {
        var s1,s2;
        if (zh_choose == 't') {
            s1 = zh_s;
            s2 = zh_t;
        }else if(zh_choose == 's') {
            s1 = zh_t;
            s2 = zh_s;
        }else {
            return this;
        }
        var a = '';
        var l = this.length;
        for(var i=0;i<this.length;i++){
            var c = this.charAt(i);
            var p = s1.indexOf(c)
            a += p < 0 ? c : s2.charAt(p);
        }
        return a;
    }
    function setCookie(name, value) {
        var argv = setCookie.arguments;
        var argc = setCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        if (expires != null) {
            var LargeExpDate = new Date ();
            LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
        }
        document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString()));
    }
    function getCookie(Name) {
        var search = Name + "="
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if(offset != -1) {
                offset += search.length;
                end = document.cookie.indexOf(";", offset);
                if(end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(offset, end));
            }else {
                return '';
            }
        }
    }
    function zh_tranBody(obj) {
        var o = (typeof(obj) == "object") ? obj.childNodes : document.body.childNodes;
        for (var i = 0; i < o.length; i++) {
            var c = o.item(i);
            if ('||BR|HR|TEXTAREA|SCRIPT|'.indexOf("|"+c.tagName+"|") > 0) continue;
            if (c.className == zh_class) {
                if (c.id == zh_class + '_' + zh_choose) {
                    c.setAttribute('style', zh_style_active);
                    c.style.cssText = zh_style_active;
                }else {
                    c.setAttribute('style', zh_style_inactive);
                    c.style.cssText = zh_style_inactive;
                }
                continue;
            }
            if (c.title != '' && c.title != null) c.title = c.title.tran();
            if (c.alt != '' && c.alt != null) c.alt = c.alt.tran();
            if (c.tagName == "INPUT" && c.value != '' && c.type != 'text' && c.type != 'hidden' && c.type != 'password') c.value = c.value.tran();
            if (c.nodeType == 3) {
                c.data = c.data.tran();
            }else{
                zh_tranBody(c);
            }
        }
    }
    function zh_tran(go) {
        console.log(898767)
        if (go) zh_choose = go;
        setCookie('zh_choose', zh_choose, zh_expires);
        if (go == 'n') {
            window.location.reload();
        }else {
            zh_tranBody();
        }
    }
    function zh_getLang() {
        if (getCookie('zh_choose')) {
            zh_choose = getCookie('zh_choose');
            return true;
        }
        if (!zh_autoLang_t && !zh_autoLang_s) return false;
        if (getCookie('zh_autoLang_checked')) return false;
        if (navigator.language) {
            zh_browserLang = navigator.language;
        }else if (navigator.browserLanguage) {
            zh_browserLang = navigator.browserLanguage;
        }
        if (zh_autoLang_t && zh_langReg_t.test(zh_browserLang)) {
            zh_choose = 't';
        }else if (zh_autoLang_s && zh_langReg_s.test(zh_browserLang)) {
            zh_choose = 's';
        }
        zh_autoLang_checked = 1;
        setCookie('zh_choose', zh_choose, zh_expires);
        if (zh_choose == zh_default) return false;
        return true;
    }
    function zh_init() {
        zh_getLang();
        c = document.getElementById(zh_class + '_' + zh_choose);
        if (zh_choose != zh_default) {
            if (window.onload) {
                window.onload_before_zh_init = window.onload;
                window.onload = function() {
                    zh_tran(zh_choose);
                    if (getCookie('zh_autoLang_check')) {alert(zh_autoLang_msg);};
                    window.onload_before_zh_init();
                };
            }else {
                window.onload = function() {
                    zh_tran(zh_choose);
                    if (getCookie('zh_autoLang_check')) {alert(zh_autoLang_msg);};
                };
            }
        }
    }
    zh_init();
