// 引入 x-s.js 以确保 window.mnsv2 被挂载
const CryptoJs =require("crypto-js")
require('./x-s.js');
// require('./x-s2.js');
var c = [];
var d = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5";
var a ={
    "callFrom": "web",
    "appId": "xhs-pc-web"
}
for (var s = 0, f = d.length; s < f; ++s) {
    c[s] = d[s];
}


function tripletToBase64(e) {
    return c[e >> 18 & 63] + c[e >> 12 & 63] + c[e >> 6 & 63] + c[63 & e]
}

function encodeChunk(e, a, r) {
    for (var c, d = [], s = a; s < r; s += 3)
        c = (e[s] << 16 & 0xff0000) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]),
            d.push(tripletToBase64(c));
    return d.join("")
}

function b64Encode(e) {
    for (var a, r = e.length, d = r % 3, s = [], f = 16383, u = 0, l = r - d; u < l; u += f)
        s.push(encodeChunk(e, u, u + f > l ? l : u + f));
    return 1 === d ? (a = e[r - 1],
        s.push(c[a >> 2] + c[a << 4 & 63] + "==")) : 2 === d && (a = (e[r - 2] << 8) + e[r - 1],
        s.push(c[a >> 10] + c[a >> 4 & 63] + c[a << 2 & 63] + "=")),
        s.join("")
}

function encodeUtf8(e) {
    for (var a = encodeURIComponent(e), r = [], c = 0; c < a.length; c++) {
        var d = a.charAt(c);
        if ("%" === d) {
            var s = parseInt(a.charAt(c + 1) + a.charAt(c + 2), 16);
            r.push(s),
                c += 2
        } else
            r.push(d.charCodeAt(0))
    }
    return r
}

function seccore_signv2(e, a) {
    let d = CryptoJs.MD5(e).toString()
    let s = window.mnsv2(e, d)
    let f = {
        x0: "4.2.6",
        x1: "xhs-pc-web",
        x2: "Windows",
        x3: s,
        x4: a ? void 0 === a ? "undefined" : (0,
            h._)(a) : ""
    };
    return "XYS_" + b64Encode(encodeUtf8(JSON.stringify(f)))
}

// 导出签名函数供 Python 调用
module.exports = {
    getXS: seccore_signv2
};

// 测试代码(可取消注释)
// console.log(seccore_signv2('/api/sns/web/v1/login/qrcode/create{"qr_type":1}', ""))

//登录
// console.log(seccore_signv2('/api/sns/web/v1/login/qrcode/status?qr_id=142561762397376923&code=493677', ""))


