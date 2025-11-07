// 引入 x-s.js 以确保 window.mnsv2 被挂载
const CryptoJs =require("crypto-js")
require('./x-s.js');
const { generateLocalId } = require('./a1.js')
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

function tb(str) {
    const poly = 0xedb88320;
    const table = new Array(256);

    for (let i = 0; i < 256; i++) {
        let crc = i;
        for (let j = 0; j < 8; j++) {
            crc = (crc & 1) ? (crc >>> 1) ^ poly : crc >>> 1;
        }
        table[i] = crc;
    }

    let crc = -1;
    for (let i = 0; i < str.length; i++) {
        crc = table[(crc ^ str.charCodeAt(i)) & 0xff] ^ (crc >>> 8);
    }

    return crc ^ -1;
}


// function tb(e) {
//     for (var a = 0xedb88320, r, c, d = 256, s = []; d--; s[d] = r >>> 0)
//         for (c = 8, r = d; c--; )
//             r = 1 & r ? r >>> 1 ^ a : r >>> 1;
//     if ("string" == typeof e) {
//         for (var r = 0, c = -1; r < e.length; ++r)
//             c = s[255 & c ^ e.charCodeAt(r)] ^ c >>> 8;
//         return -1 ^ c ^ a
//     }
// }



function getxscomment(){
    const g = generateLocalId("Windows")
    const _ = "";     // 参数 x6
    const b = "";     // 参数 x7
    const merged = _ + b + g;
    y = {
    "s0": 5, //getPlatformCode传入设备平台生成
    "s1": "", //固定空
    "x0": "1", //通过localStorage算出 localStorage.getItem(u.z7)
    "x1": "4.2.6",
    "x2": "Windows",
    "x3": "xhs-pc-web",
    "x4": "4.84.4",
    "x5": g, //a1
    "x6": "",
    "x7": "",
    "x8": "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSBMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR6QL+5Ii6sdneeSfqYHqwl2qt5B0DBIx+PGDi/sVtkIxdsxuwr4qtiIhuaIE3e3LV0I3VTIC7e0utl2ADmsLveDSKsSPw5IEvsiVtJOqw8BuwfPpdeTFWOIx4TIiu6ZPwrPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7eSqte/D7sDcpipedeYrDtIC6eDVw2IENsSqtlnlSuNjVtIvoekqt3cZ7sVo4gIESyIhE2+9DUIvzy4I8OIic7ZPwAIviC4o/sDLds6PwVIC7eSd7sd0R4IEvs3IGMtVwUIids3s/sxZNeiVtbcUeeYVwhIvMLaA7efVwRp9KsDuwmIxltIxZSouwOgVwpsr4heU/e6LveDPwFIvgs1ros1DZiIi7sjbos3grFIE0sDqwHIvmZaVtfaPwzIhOsDqwQIEAsiqwlIh/eDqtANuwPmVwDIxmxIvQpPdIRJLve3qthIEDaIk0eYuwQZbEqn00sjeHSIEYKPVwQsutaIkJeVPwDKWgskY/e6bEyIEJekd/skqtsnPwqICJeSPwiIh5eVAILIv5eYo/e0PtSICKs6PwV4omqIhHeICgeVLoeTgveYb6e1qteIEqRICTMLqw8IiSIIk5sxb832//eYW==", // localStorage.getItem(u.q2)
    "x9": tb(merged), //(0,p.tb)("".concat(_).concat(b).concat(g)) 需要g的值
    "x10": 0, //固定0
    "x11": "normal" //固定normal
    }
    return b64Encode(encodeUtf8( JSON.stringify(y)))
    // return '2UQAPsHC+aIjqArjwjHjNsQhPsHCH0rjNsQhPaHCH0c1Pjh9HjIj2eHjwjQgynEDJ74AHjIj2ePjwjQhyoPTqBPT49pjHjIj2ecjwjHFN0WFN0cjNsQh+aHCH0rEG/p0P0mSPeHA2BLM8fPA2nbT4emD+AL78ASh2o4E4BWFG0L7+nbj+/ZIPeZA+AL7PeDjNsQh+jHCHjHVHdW7H0ijHjIj2eWjwjQQPAYUaBzdq9k6qB4Q4fpA8b878FSet9RQzLlTcSiM8/+n4MYP8F8LagY/P9Ql4FpUzfpS2BcI8nT1GFbC/L88JdbFyrSiafp/JDMra7pFLDDAa7+8J7QgabmFz7Qjp0mcwp4fanD68p40+fp8qgzELLbILrDA+9p3JpH9LLI3+LSk+d+DJfpSL98lnLYl49IUqgcMc0mrcDShtMmozBD6qM8FyFSh8o+h4g4U+obFyLSi4nbQz/+SPFlnPrDApSzQcA4SPopFJeQmzBMA/o8Szb+NqM+c4ApQzg8Ayp8FaDRl4AYs4g4fLomD8pzBpFRQ2ezLanSM+Skc47Qc4gcMag8VGLlj87PAqgzhagYSqAbn4FYQy7pTanTQ2npx87+8NM4L89L78p+l4BL6ze4AzB+IygmS8Bp8qDzFaLP98Lzn4AQQzLEAL7bFJBEVL7pwyS8Fag868nTl4e+0n04ApfuF8FSbL7SQyrLFtASrpLS92dDFa/YOanS0+Mkc4FbQ4fSe+Bu6qFzP8oP9Lo4naLP78p+D+7+DPbHFaLp9qA+QzFMFpd4panSDqA+AN7+hnDESyp8FGf+p8np8pd4iag8+/Bbm+9pD4gqM8ASdqFzn49pQ2BlFagYyL9RM4FRdpd4Iq7HFyBppN9L9/o8Szbm7zDS987PlqfRAPLzyyLSk+7+xGfRAP94UzDSbPo+rqg4Hag8Tnfbn4B8YLo4CanYOqFzl4MbQzLbAygb7JrSiN9prqgzm/dp7LBMn4FzQ2BMhag8zqbmDapQt/o8SP7bFyrSbzBbQyAmSngp7Lpkjzgb1PemAyfpHLFSbnLTcpd4zq7pFGLS9P9ph4gzftFl68/bVcg+LqfTSanYwqAP7/9pxLozcGS8FJFDAN7+Dqg4QanSdqAbp4gSQcFTA8B8O8Lzc4b+Q2B4A2op7p0QDprRQzLI3aLP9q7YQJ9pn804S8oQOqMSc4okQypZlag8Tybkn4BRQc9lxanYdqM8P+BlHpaRA8dbF4rSi/emTqg4B2p+Oq9zQcg+xqgzk8p8F2LSe+rMQzgkEGMmFqsHVHdWEH0iTPADEweZUwerANsQhP/Zjw0ZVHdWlPaHCHfE6qfMYJsQR'
}

console.log(getxscomment())

// 导出签名函数供 Python 调用
module.exports = {
    getXS: seccore_signv2,
    getxscomment:getxscomment
};

// 测试代码(可取消注释)
// console.log("\nmnsv2补环境输出:"+mnsv2('/api/sns/web/v1/login/qrcode/create{"qr_type":1}', ""))



// console.log("\n最终x-s输出:"+seccore_signv2('/api/sns/web/v1/login/qrcode/create{"qr_type":1}', ""))

//登录
// console.log(seccore_signv2('/api/sns/web/v1/login/qrcode/status?qr_id=142561762397376923&code=493677', ""))


