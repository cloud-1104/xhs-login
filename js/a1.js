let _const__WEBPACK_IMPORTED_MODULE_31__ = {
    "$Z": "src_loaded",
    "DY": "sc",
    "Fx": 471,
    "Go": "p1",
    "LI": "/api/redcaptcha/v2/getconfig",
    "LN": [],
    "MS": 0,
    "N4": "sdt_source_storage_key",
    "N8": "scriptingEval",
    "PP": [
        "/privacy",
        "/privacy/teenager"
    ],
    "Ql": "/api/sec/v1/scripting",
    "Qo": "infra_sec_spam_walify",
    "RH": "webId",
    "TG": 3,
    "UG": "infra_sec_verify_walify",
    "V_": "gid",
    "WF": "sdt_source_init",
    "WT": "sign_lack_info",
    "XP": "sec_poison_id",
    "YF": 465,
    "eQ": 462,
    "fI": "1",
    "gv": 2,
    "hJ": "infra_sec_web_api_walify",
    "i8": "4.2.6",
    "ls": "last_tiga_update_time",
    "mW": "dssts",
    "mj": "xsecplatform",
    "o4": "a1",
    "o8": [
        "/t.xiaohongshu.com",
        "/c.xiaohongshu.com",
        "spltest.xiaohongshu.com",
        "t2.xiaohongshu.com",
        "t2-test.xiaohongshu.com",
        "lng.xiaohongshu.com",
        "apm-track.xiaohongshu.com",
        "apm-track-test.xiaohongshu.com",
        "apm-fe.xiaohongshu.com",
        "fse.xiaohongshu.com",
        "fse.devops.xiaohongshu.com",
        "fesentry.xiaohongshu.com",
        "spider-tracker.xiaohongshu.com"
    ],
    "ou": "xsecappid",
    "p4": "websectiga",
    "q2": "b1",
    "qk": {
        "300011": "检测到帐号异常，请稍后重试",
        "300012": "网络连接异常，请检查网络设置后重试",
        "300013": "访问频次异常，请勿频繁操作",
        "300015": "浏览器异常，请尝试更换浏览器后重试"
    },
    "qq": 1,
    "sU": "0",
    "tP": "loadts",
    "vJ": "/api/sec/v1/sbtsource",
    "xC": 461,
    "yl": [
        "fe_api/burdock/v2/user/keyInfo",
        "fe_api/burdock/v2/shield/profile",
        "fe_api/burdock/v2/shield/captcha",
        "fe_api/burdock/v2/shield/registerCanvas",
        "api/sec/v1/shield/webprofile",
        "api/sec/v1/shield/captcha",
        {},
        {},
        {},
        {},
        "/fe_api/burdock/v2/note/post",
        "/api/sns/web",
        "/api/redcaptcha",
        "/api/store/jpd/main"
    ],
    "z7": "b1b1"
}

function kn(e){
     var crc32 = function crc32(e) {
            for (var a, r = [], c = 0; c < 256; c++) {
                a = c;
                for (var d = 0; d < 8; d++)
                    a = 1 & a ? 0xedb88320 ^ a >>> 1 : a >>> 1;
                r[c] = a
            }
            for (var s = -1, f = 0; f < e.length; f++)
                s = s >>> 8 ^ r[255 & (s ^ e.charCodeAt(f))];
            return (-1 ^ s) >>> 0
     };
}
function getPlatformCode(e) {
            switch (e) {
            case "Android":
                return 2;
            case "iOS":
                return 1;
            case "Mac OS":
                return 3;
            case "Linux":
                return 4;
            default:
                return 5
            }
}
var CHARSET = "abcdefghijklmnopqrstuvwxyz1234567890";
function genRandomString(e) {
    return Array(e).fill(void 0).map(function() {
        return CHARSET[Math.floor(36 * Math.random())]
    }).join("")
}

function generateLocalId(e) {
    var a = getPlatformCode(e)
        , r = "000"                                                                                     //_const__WEBPACK_IMPORTED_MODULE_31__.sU = 0
        , c = "".concat((+new Date).toString(16)).concat(genRandomString(30)).concat(a).concat(0).concat(r)
        , d = (0,kn)(c);
    return "".concat(c).concat(d).substring(0, 52)
}
module.exports = {
  generateLocalId
};
console.log(generateLocalId("Windows"))