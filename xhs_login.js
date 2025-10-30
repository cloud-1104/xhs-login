//生成 c 数组

// 需要生成 api端点+参数
arg = "/api/sns/web/v1/login/qrcode/create{\"qr_type\":1}"

arg2 = "3d08093c65de13679b96a87493e1ed41"

s = window.mnsv2(arg, arg2)
// 需要生成 f
f = {
    "x0": "4.2.6",
    "x1": "xhs-pc-web",
    "x2": "Windows",
    "x3": "mns0301_fZaKqtOr0muNsmm7nR/vWsGaz2CMR85VkKjxYjLI2j577I4dycspUzdMNQXQyp4UuX2hmVsoqVnNupFKTP9SSIgTM29NArBQLlCH+GTZzKh0d7DeU/pA0JHKXS0ZVG6o0CMCnpsRzRJPUaT3lmRKSndVZlciE0JRIk0OHF==",
    "x4": ""
}
a = {
    "callFrom": "web",
    "appId": "xhs-pc-web"
}


console.log("S=>" + s);









// 生成 c 数组
for (var c = [], d = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5", s = 0, f = d.length; s < f; ++s) c[s] = d[s];


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
function tripletToBase64(e) {
    return c[e >> 18 & 63] + c[e >> 12 & 63] + c[e >> 6 & 63] + c[63 & e]
}
function encodeChunk(e, a, r) {
    for (var c, d = [], s = a; s < r; s += 3)
        c = (e[s] << 16 & 0xff0000) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]),
            d.push(tripletToBase64(c));
    return d.join("")
}
//转base64
function b64Encode(e) {
    for (var a, r = e.length, d = r % 3, s = [], f = 16383, u = 0, l = r - d; u < l; u += f)
        s.push(encodeChunk(e, u, u + f > l ? l : u + f));
    return 1 === d ? (a = e[r - 1],
        s.push(c[a >> 2] + c[a << 4 & 63] + "==")) : 2 === d && (a = (e[r - 2] << 8) + e[r - 1],
            s.push(c[a >> 10] + c[a >> 4 & 63] + c[a << 2 & 63] + "=")),
        s.join("")
}


//请求内容转数组
console.log(b64Encode(encodeUtf8(JSON.stringify(f))));
//b64Encode(encodeUtf8(JSON.stringify(f)))

//组装最后的X-S
//"XYS_" + (0,p.xE) ((0,p.lz)(JSON.stringify(f)))



