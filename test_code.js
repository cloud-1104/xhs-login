// 测试脚本 - 验证 code.js 能否在 Node.js 中独立运行

// 加载 code.js (它会自动补环境并暴露 window.mnsv2)
require('./code.js');

// 测试参数
const arg = "/api/sns/web/v1/login/qrcode/create{\"qr_type\":1}";
const arg2 = "3d08093c65de13679b96a87493e1ed41";

console.log('========================================');
console.log('环境补丁已加载');
console.log('globalThis.document:', typeof globalThis.document);
console.log('globalThis.navigator:', typeof globalThis.navigator);
console.log('globalThis.mnsv2:', typeof globalThis.mnsv2);
console.log('========================================');

// 调用目标函数
if (typeof globalThis.mnsv2 === 'function') {
  try {
    const result = globalThis.mnsv2(arg, arg2);
    console.log('\n✅ 调用成功!');
    console.log('返回值:', result);
  } catch (error) {
    console.error('\n❌ 调用失败:', error.message);
    console.error('堆栈:', error.stack);
  }
} else {
  console.error('\n❌ 函数 mnsv2 未暴露到 globalThis');
  console.log('可用的全局变量:', Object.keys(globalThis).filter(k => k.includes('mns') || k.includes('c93')));
}
