export type AdminRole = 'admin' | 'editor';

export type AdminUser = {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  pin: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
};

export type AdminSession = {
  userId: string;
  username: string;
  displayName: string;
  role: AdminRole;
  startedAt: string;
};

type LoginAttempt = {
  username: string;
  failedCount: number;
  bannedUntil?: string;
  lastFailedAt?: string;
};

type AdminLoginResult =
  | { ok: true; session: AdminSession; user: AdminUser }
  | { ok: false; error: string; bannedUntil?: string; remainingAttempts?: number };

export type AdminUserInput = {
  username: string;
  displayName: string;
  role: AdminRole;
  pin: string;
};

const usersKey = 'genesys-admin-users-v1';
const attemptsKey = 'genesys-admin-login-attempts-v1';
const sessionKey = 'genesys-admin-session-v1';
const maxFailedAttempts = Number(import.meta.env.VITE_ADMIN_MAX_FAILED_ATTEMPTS || 5);
const banMinutes = Number(import.meta.env.VITE_ADMIN_BAN_MINUTES || 15);

function hasStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function getSeedPin() {
  return import.meta.env.VITE_ADMIN_PIN?.trim() || '1234';
}

function getDefaultAdminUser(): AdminUser {
  const now = new Date().toISOString();

  return {
    id: 'admin-default',
    username: 'admin',
    displayName: 'Administrator',
    role: 'admin',
    pin: getSeedPin(),
    active: true,
    createdAt: now,
    updatedAt: now,
  };
}

function parseUsers(raw: string | null): AdminUser[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((candidate): AdminUser | null => {
        if (!candidate || typeof candidate !== 'object') {
          return null;
        }

        const value = candidate as Partial<AdminUser>;
        if (
          typeof value.id !== 'string' ||
          typeof value.username !== 'string' ||
          typeof value.displayName !== 'string' ||
          typeof value.pin !== 'string'
        ) {
          return null;
        }

        return {
          id: value.id,
          username: normalizeUsername(value.username),
          displayName: value.displayName,
          role: value.role === 'editor' ? 'editor' : 'admin',
          pin: value.pin,
          active: value.active !== false,
          createdAt: typeof value.createdAt === 'string' ? value.createdAt : new Date().toISOString(),
          updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : new Date().toISOString(),
          lastLoginAt: typeof value.lastLoginAt === 'string' ? value.lastLoginAt : undefined,
        };
      })
      .filter((user): user is AdminUser => Boolean(user));
  } catch {
    return [];
  }
}

function persistUsers(users: AdminUser[]) {
  if (!hasStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(usersKey, JSON.stringify(users));
  } catch {
    // Interfața rămâne utilizabilă chiar dacă browserul blochează localStorage.
  }
}

function getAttempts(): LoginAttempt[] {
  if (!hasStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(attemptsKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistAttempts(attempts: LoginAttempt[]) {
  if (!hasStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(attemptsKey, JSON.stringify(attempts));
  } catch {
    // Fail-to-ban local nu poate persista când storage-ul este blocat.
  }
}

function activeAdminCount(users: AdminUser[]) {
  return users.filter((user) => user.active && user.role === 'admin').length;
}

function getAttempt(username: string) {
  return getAttempts().find((attempt) => attempt.username === username);
}

function isBanned(attempt?: LoginAttempt) {
  if (!attempt?.bannedUntil) {
    return false;
  }

  return new Date(attempt.bannedUntil).getTime() > Date.now();
}

function registerFailedLogin(username: string) {
  const attempts = getAttempts().filter((attempt) => attempt.username !== username);
  const previous = getAttempt(username);
  const nextFailedCount = (previous?.failedCount || 0) + 1;
  const now = new Date();
  const nextAttempt: LoginAttempt = {
    username,
    failedCount: nextFailedCount,
    lastFailedAt: now.toISOString(),
  };

  if (nextFailedCount >= maxFailedAttempts) {
    nextAttempt.bannedUntil = new Date(now.getTime() + banMinutes * 60 * 1000).toISOString();
  }

  persistAttempts([...attempts, nextAttempt]);

  return {
    bannedUntil: nextAttempt.bannedUntil,
    remainingAttempts: Math.max(maxFailedAttempts - nextFailedCount, 0),
  };
}

function resetLoginAttempts(username: string) {
  persistAttempts(getAttempts().filter((attempt) => attempt.username !== username));
}

export function getAdminUsers() {
  const users = hasStorage() ? parseUsers(window.localStorage.getItem(usersKey)) : [];
  if (users.length > 0) {
    return users;
  }

  const defaultUser = getDefaultAdminUser();
  persistUsers([defaultUser]);
  return [defaultUser];
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(sessionKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<AdminSession>;
    if (
      typeof parsed.userId !== 'string' ||
      typeof parsed.username !== 'string' ||
      typeof parsed.displayName !== 'string'
    ) {
      return null;
    }

    const currentUser = getAdminUsers().find((user) => user.id === parsed.userId && user.active);
    if (!currentUser) {
      window.sessionStorage.removeItem(sessionKey);
      return null;
    }

    return {
      userId: currentUser.id,
      username: currentUser.username,
      displayName: currentUser.displayName,
      role: currentUser.role,
      startedAt: typeof parsed.startedAt === 'string' ? parsed.startedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(sessionKey);
  }
}

export function validateAdminLogin(usernameInput: string, pinInput: string): AdminLoginResult {
  const username = normalizeUsername(usernameInput || 'admin');
  const attempt = getAttempt(username);

  if (isBanned(attempt)) {
    return {
      ok: false,
      error: 'Prea multe încercări eșuate. Contul este blocat temporar.',
      bannedUntil: attempt?.bannedUntil,
      remainingAttempts: 0,
    };
  }

  const users = getAdminUsers();
  const user = users.find((candidate) => candidate.username === username);

  if (!user || !user.active || user.pin !== pinInput.trim()) {
    const failed = registerFailedLogin(username);
    return {
      ok: false,
      error: failed.bannedUntil ? 'Prea multe încercări eșuate. Contul este blocat temporar.' : 'Date de autentificare incorecte.',
      bannedUntil: failed.bannedUntil,
      remainingAttempts: failed.remainingAttempts,
    };
  }

  resetLoginAttempts(username);

  const now = new Date().toISOString();
  const nextUsers = users.map((candidate) =>
    candidate.id === user.id ? { ...candidate, lastLoginAt: now, updatedAt: now } : candidate,
  );
  persistUsers(nextUsers);

  const updatedUser = nextUsers.find((candidate) => candidate.id === user.id) || user;
  const session: AdminSession = {
    userId: updatedUser.id,
    username: updatedUser.username,
    displayName: updatedUser.displayName,
    role: updatedUser.role,
    startedAt: now,
  };

  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(sessionKey, JSON.stringify(session));
  }

  return { ok: true, session, user: updatedUser };
}

export function createAdminUser(input: AdminUserInput) {
  const users = getAdminUsers();
  const username = normalizeUsername(input.username);

  if (!username || username.length < 3) {
    throw new Error('Username-ul trebuie să aibă minimum 3 caractere.');
  }

  if (users.some((user) => user.username === username)) {
    throw new Error('Există deja un utilizator cu acest username.');
  }

  if (input.pin.trim().length < 4) {
    throw new Error('PIN-ul trebuie să aibă minimum 4 caractere.');
  }

  const now = new Date().toISOString();
  const nextUser: AdminUser = {
    id: createId('user'),
    username,
    displayName: input.displayName.trim() || username,
    role: input.role,
    pin: input.pin.trim(),
    active: true,
    createdAt: now,
    updatedAt: now,
  };

  const nextUsers = [...users, nextUser];
  persistUsers(nextUsers);
  return nextUsers;
}

export function updateAdminUser(userId: string, changes: Partial<Pick<AdminUser, 'active' | 'role' | 'displayName'>>) {
  const users = getAdminUsers();
  const target = users.find((user) => user.id === userId);
  if (!target) {
    return users;
  }

  if (target.role === 'admin' && target.active && changes.active === false && activeAdminCount(users) <= 1) {
    throw new Error('Trebuie să rămână cel puțin un administrator activ.');
  }

  if (target.role === 'admin' && changes.role === 'editor' && activeAdminCount(users) <= 1) {
    throw new Error('Trebuie să rămână cel puțin un administrator activ.');
  }

  const now = new Date().toISOString();
  const nextUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          ...changes,
          displayName: changes.displayName?.trim() || user.displayName,
          updatedAt: now,
        }
      : user,
  );

  persistUsers(nextUsers);
  return nextUsers;
}

export function deleteAdminUser(userId: string, currentUserId: string) {
  const users = getAdminUsers();
  const target = users.find((user) => user.id === userId);
  if (!target || userId === currentUserId) {
    return users;
  }

  if (target.role === 'admin' && target.active && activeAdminCount(users) <= 1) {
    throw new Error('Trebuie să rămână cel puțin un administrator activ.');
  }

  const nextUsers = users.filter((user) => user.id !== userId);
  persistUsers(nextUsers);
  return nextUsers;
}

export function getAdminBanStatus(usernameInput: string) {
  const username = normalizeUsername(usernameInput || 'admin');
  const attempt = getAttempt(username);
  if (!isBanned(attempt)) {
    return null;
  }

  return attempt?.bannedUntil || null;
}
