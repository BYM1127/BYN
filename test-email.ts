import { sendEmail } from './lib/resend';

async function test() {
  console.log('Testing Resend connection...');
  const result = await sendEmail({
    to: 'delivered@resend.dev', // Resend's official test email address
    subject: 'Test Email from BYM Studio',
    html: '<p>If you see this, the Resend integration is working perfectly!</p>'
  });
  console.log('Result:', result);
}

test();
