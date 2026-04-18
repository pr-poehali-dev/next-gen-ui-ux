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
    comment = body.get('comment', '').strip()

    if not phone or not school or not service:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'fill_all_fields'}
        }

    token = os.environ['TELEGRAM_BOT_TOKEN'].strip()
    chat_id = os.environ['TELEGRAM_CHAT_ID'].strip()

    text = (
        f"\U0001f4cb *Новая заявка — Школьный Призрак*\n\n"
        f"\U0001f4de Телефон: {phone}\n"
        f"\U0001f3eb Школа: {school}\n"
        f"\U0001f4dd Услуга: {service}"
    )
    if comment:
        text += f"\n\U0001f4ac Комментарий: {comment}"

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req)
    except Exception as e:
        print(f"[ERROR] Telegram API error: {e}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': str(e)}
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'ok': True}
    }