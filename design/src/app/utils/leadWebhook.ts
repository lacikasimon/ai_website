import { ContactMessage } from './contactMessages';

type LeadWebhookResult = {
  ok: boolean;
  message?: string;
};

const contactLeadEndpoint = import.meta.env.VITE_CONTACT_LEAD_ENDPOINT?.trim() || '/api/contact-lead.php';
const contactLeadCampaign = import.meta.env.VITE_CONTACT_LEAD_CAMPAIGN?.trim() || 'syshub_ro_contact';

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) {
    return { firstName: parts[0] || '', lastName: '' };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

function getSourceUrl() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.href;
}

export async function sendContactLead(message: ContactMessage, recaptchaToken: string): Promise<LeadWebhookResult> {
  const { firstName, lastName } = splitName(message.name);

  const response = await fetch(contactLeadEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: 'website_contact',
      email: message.email,
      phone: message.phone,
      name: message.name,
      first_name: firstName,
      last_name: lastName,
      campaign: contactLeadCampaign,
      message: message.message,
      external_id: message.id,
      source_url: getSourceUrl(),
      submitted_at: message.createdAt,
      recaptchaToken,
    }),
  });

  if (response.ok) {
    return { ok: true };
  }

  let responseMessage = '';
  try {
    const data = (await response.json()) as { message?: string };
    responseMessage = data.message || '';
  } catch {
    responseMessage = '';
  }

  return {
    ok: false,
    message: responseMessage || 'Mesajul nu a putut fi trimis. Vă rugăm să încercați din nou.',
  };
}
