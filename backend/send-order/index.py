import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправляет заявку на школьную услугу в Telegram-бот."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    phone = body.get('phone', '').strip()
    school = body.get('school', '').strip()
    service = body.get('service', '').strip()

    if not phone or not school or not service:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'fill_all_fields'}
        }

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    text = (
        f"📋 *Новая заявка — Школьный Призрак*\n\n"
        f"📞 Телефон: {phone}\n"
        f"🏫 Школа: {school}\n"
        f"📝 Услуга: {service}"
    )

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'ok': True}
    }