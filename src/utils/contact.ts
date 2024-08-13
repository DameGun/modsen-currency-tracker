import { send } from '@emailjs/browser';

import { EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID } from '@/constants/environment';
import type { ContactFormValues } from '@/types/contact';

export async function sendEmail(data: ContactFormValues) {
  const serviceId = EMAIL_SERVICE_ID;
  const templateId = EMAIL_TEMPLATE_ID;
  const publicKey = EMAIL_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Some of email credentials are missing');
  }

  return await send(serviceId, templateId, data, { publicKey });
}
