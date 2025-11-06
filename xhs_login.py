#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
小红书登录二维码获取

MIT License

Copyright (c) 2025 cloud-1104

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
import subprocess
import json
import secrets
import requests
import time
from PIL import Image
import qrcode as qr_module
from pathlib import Path
from loguru import logger


def generate_web_id():
    """生成随机 webId (32位十六进制字符串)"""
    return secrets.token_hex(16)


def get_common_headers(web_id, xs_signature):
    """
    生成通用请求头

    Args:
        web_id: webId
        xs_signature: x-s 签名

    Returns:
        dict: 请求头
    """
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'sec-ch-ua-platform': '"Windows"',
        'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'x-s': xs_signature,
        'origin': 'https://www.xiaohongshu.com',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.xiaohongshu.com/',
        'accept-language': 'zh-CN,zh;q=0.9',
        'priority': 'u=1, i',
        'Cookie': f'webId={web_id};',
        'content-type': 'application/json;charset=UTF-8'
    }


def get_xs_signature(url_path, cookie_value=""):
    """
    调用 login.js 生成 x-s 签名

    Args:
        url_path: API 路径 + JSON 参数，例如: '/api/sns/web/v1/login/qrcode/create{"qr_type":1}'
        cookie_value: cookie 值（可选）

    Returns:
        str: XYS_ 开头的签名字符串
    """
    js_code = f"""
    const {{ getXS }} = require('./js/login.js');
    console.log(getXS('{url_path}', ''));
    """

    try:
        result = subprocess.run(
            ['node', '-e', js_code],
            capture_output=True,
            text=True,
            check=True,
            cwd='.',
            encoding='utf-8'
        )
        for line in result.stdout.split('\n'):
            line = line.strip()
            if line.startswith('XYS_'):
                logger.debug(f"生成签名成功: {line}")
                return line

        error_msg = f"未找到有效的 XYS_ 签名，输出内容:\n{result.stdout}"
        logger.error(error_msg)
        raise ValueError(error_msg)
    except subprocess.CalledProcessError as e:
        logger.error(f"生成签名失败: {e.stderr}")
        raise


def get_qrcode(web_id):
    """
    获取小红书登录二维码

    Args:
        web_id: 预生成的 webId

    Returns:
        dict: 二维码信息
    """
    url_path = '/api/sns/web/v1/login/qrcode/create{"qr_type":1}'

    logger.info("开始生成 x-s 签名")
    xs_signature = get_xs_signature(url_path)
    logger.info(f"x-s 签名: {xs_signature}")

    url = "https://edith.xiaohongshu.com/api/sns/web/v1/login/qrcode/create"
    headers = get_common_headers(web_id, xs_signature)
    payload = '{"qr_type":1}'

    logger.info("正在请求二维码")
    response = requests.post(url, headers=headers, data=payload)
    logger.debug(f"响应状态码: {response.status_code}")
    logger.debug(f"响应内容: {response.text}")

    if response.status_code == 200:
        result = response.json()
        if result.get('success'):
            qr_data = result.get('data', {})
            qr_id = qr_data.get('qr_id')
            qr_code = qr_data.get('code')
            qr_url = qr_data.get('url')

            logger.success("二维码获取成功")
            logger.info(f"二维码 ID: {qr_id}")
            logger.info(f"验证码: {qr_code}")
            logger.info(f"二维码链接: {qr_url}")

            qr_img = qr_module.make(qr_url)
            qr_img_path = Path('login_qrcode.png')
            qr_img.save(qr_img_path)
            logger.info(f"二维码图片已保存到: {qr_img_path.absolute()}")

            return {
                'web_id': web_id,
                'qr_id': qr_id,
                'qr_code': qr_code,
                'qr_url': qr_url,
                'qr_img_path': str(qr_img_path.absolute()),
                'xs_signature': xs_signature
            }
        else:
            logger.error(f"请求失败: {result}")
            return None
    else:
        logger.error(f"HTTP 请求失败: {response.status_code}")
        return None


def check_qrcode_status(qr_id, code, web_id):
    """
    检查二维码扫码状态

    Args:
        qr_id: 二维码ID
        code: 验证码
        web_id: webId

    Returns:
        tuple: (状态数据, 完整响应)
    """
    url_path = f'/api/sns/web/v1/login/qrcode/status?qr_id={qr_id}&code={code}'
    logger.debug(f"生成签名路径: {url_path}")

    xs_signature = get_xs_signature(url_path)
    logger.debug(f"签名 x-s: {xs_signature}")

    url = f"https://edith.xiaohongshu.com/api/sns/web/v1/login/qrcode/status?qr_id={qr_id}&code={code}"
    headers = get_common_headers(web_id, xs_signature)

    logger.debug(f"请求 URL: {url}")
    logger.debug(f"Cookie webId: {web_id}")

    response = requests.get(url, headers=headers)
    logger.debug(f"响应状态码: {response.status_code}")
    logger.debug(f"响应内容: {response.text}")

    if response.status_code == 200:
        result = response.json()
        if result.get('success'):
            return result.get('data', {}), result
        else:
            return None, result

    return None, None


def wait_for_scan(qr_id, code, web_id, timeout=300, interval=2):
    """
    等待用户扫码

    Args:
        qr_id: 二维码ID
        code: 验证码
        web_id: webId
        timeout: 超时时间（秒），默认300秒
        interval: 轮询间隔（秒），默认2秒

    Returns:
        dict: 登录结果
    """
    logger.info(f"开始等待扫码，超时时间: {timeout}秒，轮询间隔: {interval}秒")

    start_time = time.time()
    poll_count = 0

    # code_status 状态映射
    status_map = {
        0: "未扫描",
        1: "已扫描，等待确认",
        2: "登录成功",
        3: "二维码已过期"
    }

    while True:
        poll_count += 1
        elapsed = int(time.time() - start_time)

        logger.info(f"轮询 #{poll_count}，已等待 {elapsed}秒 / {timeout}秒")

        if elapsed > timeout:
            logger.error("扫码超时")
            return None

        status_data, full_response = check_qrcode_status(qr_id, code, web_id)

        if status_data is None:
            if full_response:
                logger.warning(f"请求失败: {full_response}")
            else:
                logger.warning("无响应数据")
            logger.info(f"{interval}秒后重试")
            time.sleep(interval)
            continue

        code_status = status_data.get('code_status')
        status_text = status_map.get(code_status, f"未知状态: {code_status}")

        logger.info(f"状态码: {code_status}, 状态: {status_text}")
        logger.debug(f"完整数据: {json.dumps(status_data, ensure_ascii=False)}")

        if code_status == 2:
            logger.success("登录成功")
            return status_data
        elif code_status == 3:
            logger.error("二维码已过期，请重新获取")
            return None
        elif code_status == 1:
            logger.info("请在手机上点击确认登录")

        time.sleep(interval)


if __name__ == '__main__':
    web_id = generate_web_id()
    logger.info(f"生成的 webId: {web_id}")

    result = get_qrcode(web_id)

    if result:
        logger.info("=" * 50)
        logger.info("登录信息汇总:")
        logger.info(f"webId: {result['web_id']}")
        logger.info(f"二维码ID: {result['qr_id']}")
        logger.info(f"验证码: {result['qr_code']}")
        logger.info(f"二维码URL: {result['qr_url']}")
        logger.info(f"二维码图片: {result['qr_img_path']}")
        logger.info("=" * 50)

        login_result = wait_for_scan(
            qr_id=result['qr_id'],
            code=result['qr_code'],
            web_id=result['web_id']
        )

        if login_result:
            logger.info("=" * 50)
            logger.info("登录结果:")
            logger.info(json.dumps(login_result, indent=2, ensure_ascii=False))
            logger.info("=" * 50)
