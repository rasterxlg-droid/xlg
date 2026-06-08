import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendTelegramNotification } from '@/lib/telegram';

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  locale: z.enum(['ru', 'en']).default('ru'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Save lead to database
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        locale: data.locale,
      },
    });

    // Send Telegram notification (non-blocking)
    sendTelegramNotification(data.name, data.phone, data.locale).catch(console.error);

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Contact API error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
