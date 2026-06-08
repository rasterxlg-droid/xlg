export async function sendTelegramNotification(name: string, phone: string, locale: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram env vars not set, skipping notification');
    return;
  }

  const flag = locale === 'en' ? '🇬🇧' : '🇷🇺';
  const text = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${name}
📱 <b>Телефон:</b> ${phone}
${flag} <b>Язык:</b> ${locale.toUpperCase()}
🕐 <b>Время:</b> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}

<a href="https://wa.me/${phone.replace(/\D/g, '')}">Написать в WhatsApp</a>
  `.trim();

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Telegram API error:', err);
  }
}
