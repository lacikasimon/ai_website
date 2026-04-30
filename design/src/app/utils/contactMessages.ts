export type ContactMessageInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactMessage = ContactMessageInput & {
  id: string;
  createdAt: string;
  status: 'new' | 'read';
};

const storageKey = 'genesys-admin-contact-messages';

function hasStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function createMessageId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeMessage(value: unknown): ContactMessage | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<ContactMessage>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.name !== 'string' ||
    typeof candidate.email !== 'string' ||
    typeof candidate.message !== 'string' ||
    typeof candidate.createdAt !== 'string'
  ) {
    return null;
  }

  return {
    id: candidate.id,
    name: candidate.name,
    email: candidate.email,
    phone: typeof candidate.phone === 'string' ? candidate.phone : '',
    message: candidate.message,
    createdAt: candidate.createdAt,
    status: candidate.status === 'read' ? 'read' : 'new',
  };
}

function persistContactMessages(messages: ContactMessage[]) {
  if (!hasStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(messages));
  } catch {
    // Dacă browserul blochează localStorage, formularul rămâne utilizabil.
  }
}

export function getContactMessages(): ContactMessage[] {
  if (!hasStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizeMessage)
      .filter((message): message is ContactMessage => Boolean(message))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export function saveContactMessage(input: ContactMessageInput) {
  const contactMessage: ContactMessage = {
    id: createMessageId(),
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const nextMessages = [contactMessage, ...getContactMessages()].slice(0, 200);
  persistContactMessages(nextMessages);

  return contactMessage;
}

export function updateContactMessageStatus(messageId: string, status: ContactMessage['status']) {
  const nextMessages = getContactMessages().map((message) =>
    message.id === messageId ? { ...message, status } : message,
  );
  persistContactMessages(nextMessages);
  return nextMessages;
}

export function deleteContactMessage(messageId: string) {
  const nextMessages = getContactMessages().filter((message) => message.id !== messageId);
  persistContactMessages(nextMessages);
  return nextMessages;
}
