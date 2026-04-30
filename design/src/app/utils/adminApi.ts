import { AdminRole, AdminSession, AdminUser, AdminUserInput } from './adminSecurity';
import { ContactMessage } from './contactMessages';

const adminEndpoint = import.meta.env.VITE_ADMIN_ENDPOINT?.trim() || '/api/admin.php';

type AdminApiPayload = {
  ok?: boolean;
  message?: string;
  user?: unknown;
  users?: unknown[];
  messages?: unknown[];
  bannedUntil?: string | null;
  remainingAttempts?: number | null;
};

export type AdminServerResult = {
  available: boolean;
  ok: boolean;
  message?: string;
  user?: AdminUser;
  session?: AdminSession;
  users?: AdminUser[];
  messages?: ContactMessage[];
  bannedUntil?: string | null;
  remainingAttempts?: number | null;
};

function createSession(user: AdminUser): AdminSession {
  return {
    userId: user.id,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    startedAt: new Date().toISOString(),
  };
}

function normalizeRole(value: unknown): AdminRole {
  return value === 'editor' ? 'editor' : 'admin';
}

function normalizeServerUser(value: unknown): AdminUser | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<AdminUser>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.username !== 'string' ||
    typeof candidate.displayName !== 'string'
  ) {
    return null;
  }

  return {
    id: candidate.id,
    username: candidate.username,
    displayName: candidate.displayName,
    role: normalizeRole(candidate.role),
    pin: '',
    active: candidate.active !== false,
    createdAt: typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString(),
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : new Date().toISOString(),
    lastLoginAt: typeof candidate.lastLoginAt === 'string' ? candidate.lastLoginAt : undefined,
  };
}

function normalizeServerUsers(values: unknown[] | undefined) {
  return (values || []).map(normalizeServerUser).filter((user): user is AdminUser => Boolean(user));
}

function normalizeServerMessage(value: unknown): ContactMessage | null {
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

function normalizeServerMessages(values: unknown[] | undefined) {
  return (values || []).map(normalizeServerMessage).filter((message): message is ContactMessage => Boolean(message));
}

function normalizeResult(data: AdminApiPayload, available = true): AdminServerResult {
  const user = normalizeServerUser(data.user);

  return {
    available,
    ok: data.ok !== false,
    message: data.message,
    user: user || undefined,
    session: user ? createSession(user) : undefined,
    users: normalizeServerUsers(data.users),
    messages: normalizeServerMessages(data.messages),
    bannedUntil: data.bannedUntil,
    remainingAttempts: data.remainingAttempts,
  };
}

async function adminRequest(params: URLSearchParams, init?: RequestInit): Promise<AdminServerResult> {
  const separator = adminEndpoint.includes('?') ? '&' : '?';

  try {
    const response = await fetch(`${adminEndpoint}${separator}${params.toString()}`, {
      credentials: 'include',
      ...init,
      headers: {
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init?.headers || {}),
      },
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { available: false, ok: false, message: 'Admin API indisponibil.' };
    }

    const data = (await response.json()) as AdminApiPayload;
    if (response.status === 503) {
      return { available: false, ok: false, message: data.message || 'Admin server nu este configurat.' };
    }

    const result = normalizeResult(data);
    return {
      ...result,
      ok: response.ok && result.ok,
      message: data.message || result.message,
    };
  } catch {
    return { available: false, ok: false, message: 'Admin API indisponibil.' };
  }
}

async function postAdminAction(action: string, payload: Record<string, unknown> = {}) {
  return adminRequest(new URLSearchParams(), {
    method: 'POST',
    body: JSON.stringify({ action, ...payload }),
  });
}

export function getServerAdminSession() {
  return adminRequest(new URLSearchParams({ action: 'session' }));
}

export function loadServerAdminDashboard() {
  return adminRequest(new URLSearchParams({ action: 'admin-data' }));
}

export function loginServerAdmin(username: string, pin: string, recaptchaToken = '') {
  return postAdminAction('login', { username, pin, recaptchaToken });
}

export function logoutServerAdmin() {
  return postAdminAction('logout');
}

export function createServerAdminUser(user: AdminUserInput) {
  return postAdminAction('create-user', { user });
}

export function updateServerAdminUser(
  userId: string,
  changes: Partial<Pick<AdminUser, 'active' | 'role' | 'displayName'>> & { pin?: string },
) {
  return postAdminAction('update-user', { user: { id: userId, ...changes } });
}

export function deleteServerAdminUser(userId: string) {
  return postAdminAction('delete-user', { id: userId });
}

export function updateServerContactMessageStatus(messageId: string, status: ContactMessage['status']) {
  return postAdminAction('update-message', { id: messageId, status });
}

export function deleteServerContactMessage(messageId: string) {
  return postAdminAction('delete-message', { id: messageId });
}
