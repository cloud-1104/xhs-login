// Node.js环境包装器 - 用于在Python中调用
const fs = require('fs');
const path = require('path');

// 加载混淆的code.js
const codeContent = fs.readFileSync(path.join(__dirname, 'code.js'), 'utf8');

// 在全局作用域执行code.js
eval(codeContent);

// 导出暴露的函数供Python调用
module.exports = {
    // 主要的签名函数
    mnsv2: function(arg, arg2) {
        if (typeof globalThis.mnsv2 !== 'function') {
            throw new Error('mnsv2 function not found in globalThis');
        }
        return globalThis.mnsv2(arg, arg2);
    },

    // 导出其他可能有用的函数
    getGlobalFunctions: function() {
        const funcs = [];
        for (let key in globalThis) {
            if (typeof globalThis[key] === 'function' && key.startsWith('_')) {
                funcs.push(key);
            }
        }
        return funcs;
    }
};

// 如果直接运行此文件,进行测试
if (require.main === module) {
    console.log('Testing code_wrapper.js...');

    // 测试参数
    const testArg = "/api/sns/web/v1/login/qrcode/create{\"qr_type\":1}";
    const testArg2 = "3d08093c65de13679b96a87493e1ed41";

    try {
        const result = module.exports.mnsv2(testArg, testArg2);
        console.log('Success! Result:', result);
        console.log('Available global functions:', module.exports.getGlobalFunctions().slice(0, 10));
    } catch (error) {
        console.error('Error:', error.message);
    }
}
