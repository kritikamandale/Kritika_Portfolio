import { Resend } from 'resend';

const resend = new Resend('re_TkZ2DGN6_93fUBq8kALQfx88c4kFvnEYN');

async function test() {
  const { data, error } = await resend.emails.send({
    from: `Kritika Mandale – Portfolio Inquiry <onboarding@resend.dev>`,
    to: 'kritikamandale@gmail.com',
    subject: 'Test email',
    html: '<p>Test</p>'
  });

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success:', data);
  }
}

test();
