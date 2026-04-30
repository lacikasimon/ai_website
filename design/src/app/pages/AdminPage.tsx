import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  Ban,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Images,
  Inbox,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';
import { RecaptchaBox } from '../components/RecaptchaBox';
import { AdminContentManager } from '../components/AdminContentManager';
import { AdminMediaManager } from '../components/AdminMediaManager';
import {
  ContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} from '../utils/contactMessages';
import {
  AdminRole,
  AdminUser,
  clearAdminSession,
  createAdminUser,
  deleteAdminUser,
  getAdminBanStatus,
  getAdminSession,
  getAdminUsers,
  updateAdminUser,
  validateAdminLogin,
} from '../utils/adminSecurity';
import {
  createServerAdminUser,
  deleteServerAdminUser,
  deleteServerContactMessage,
  getServerAdminSession,
  loadServerAdminDashboard,
  loginServerAdmin,
  logoutServerAdmin,
  updateServerAdminUser,
  updateServerContactMessageStatus,
} from '../utils/adminApi';

const shopUrl = 'https://shop.syshub.ro/';
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();

type AdminSection = 'content' | 'media' | 'messages' | 'users' | 'security';
type AdminStorageMode = 'checking' | 'server' | 'local';

const adminSections = [
  {
    id: 'content' as const,
    label: 'Pagini și meniu',
    description: 'Editare pagini, linkuri și ordine meniu',
    icon: FileText,
  },
  {
    id: 'media' as const,
    label: 'Imagini',
    description: 'Încărcare, text alt și cod de inserare',
    icon: Images,
  },
  {
    id: 'messages' as const,
    label: 'Mesaje',
    description: 'Contact, căutare și export CSV',
    icon: MessageSquare,
  },
  {
    id: 'users' as const,
    label: 'Utilizatori',
    description: 'Conturi, roluri și acces admin',
    icon: Users,
  },
  {
    id: 'security' as const,
    label: 'Securitate',
    description: 'Fail-to-ban, reCAPTCHA și stare',
    icon: Shield,
  },
] satisfies Array<{
  id: AdminSection;
  label: string;
  description: string;
  icon: typeof FileText;
}>;

const emptyUserForm = {
  username: '',
  displayName: '',
  role: 'editor' as AdminRole,
  pin: '',
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function csvCell(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadMessagesCsv(messages: ContactMessage[]) {
  const rows = [
    ['Data', 'Stare', 'Nume', 'Email', 'Telefon', 'Mesaj'],
    ...messages.map((message) => [
      formatDate(message.createdAt),
      message.status === 'new' ? 'Nou' : 'Citit',
      message.name,
      message.email,
      message.phone,
      message.message,
    ]),
  ];

  const csv = rows.map((row) => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mesaje-contact-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function isBanActive(bannedUntil: string | null) {
  return Boolean(bannedUntil && new Date(bannedUntil).getTime() > Date.now());
}

function getUserActionError(error: unknown) {
  return error instanceof Error ? error.message : 'Operațiunea nu a putut fi efectuată.';
}

export function AdminPage() {
  useSeo({
    title: `Admin | ${siteContent.meta.ogTitle}`,
    description: 'Interfață minimă de administrare pentru mesajele primite prin site.',
    path: '/admin',
    noindex: true,
  });

  const [session, setSession] = useState(() => getAdminSession());
  const [users, setUsers] = useState<AdminUser[]>(() => getAdminUsers());
  const [loginData, setLoginData] = useState({ username: 'admin', pin: '' });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [bannedUntil, setBannedUntil] = useState<string | null>(() => getAdminBanStatus('admin'));
  const [authError, setAuthError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>(() => getContactMessages());
  const [query, setQuery] = useState('');
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  const [activeAdminSection, setActiveAdminSection] = useState<AdminSection>('content');
  const [adminStorageMode, setAdminStorageMode] = useState<AdminStorageMode>('checking');
  const [authLoading, setAuthLoading] = useState(false);

  const currentUser = session ? users.find((user) => user.id === session.userId && user.active) : null;
  const authenticated = Boolean(session && currentUser);
  const canManageUsers = currentUser?.role === 'admin';
  const recaptchaRequired = Boolean(recaptchaSiteKey);
  const serverBacked = adminStorageMode === 'server';
  const loginIsBanned = !serverBacked && isBanActive(bannedUntil);
  const unreadCount = messages.filter((message) => message.status === 'new').length;
  const storageLabel = adminStorageMode === 'checking' ? 'verificare' : serverBacked ? 'MySQL' : 'locală';
  const filteredMessages = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return messages;
    }

    return messages.filter((message) =>
      [message.name, message.email, message.phone, message.message]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [messages, query]);

  const applyServerDashboard = async () => {
    const dashboard = await loadServerAdminDashboard();
    if (!dashboard.available || !dashboard.ok) {
      return;
    }

    if (dashboard.user && dashboard.session) {
      setSession(dashboard.session);
    }
    if (dashboard.users) {
      setUsers(dashboard.users);
    }
    if (dashboard.messages) {
      setMessages(dashboard.messages);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function restoreServerSession() {
      const result = await getServerAdminSession();
      if (cancelled) {
        return;
      }

      if (!result.available) {
        setAdminStorageMode('local');
        return;
      }

      setAdminStorageMode('server');
      if (!result.ok || !result.user || !result.session) {
        clearAdminSession();
        setSession(null);
        setUsers([]);
        setMessages([]);
        return;
      }

      clearAdminSession();
      setSession(result.session);
      setUsers([result.user]);

      const dashboard = await loadServerAdminDashboard();
      if (!cancelled && dashboard.available && dashboard.ok) {
        if (dashboard.user && dashboard.session) {
          setSession(dashboard.session);
        }
        if (dashboard.users) {
          setUsers(dashboard.users);
        }
        if (dashboard.messages) {
          setMessages(dashboard.messages);
        }
      }
    }

    void restoreServerSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginIsBanned) {
      setAuthError(`Cont blocat temporar până la ${formatDate(bannedUntil || '')}.`);
      return;
    }

    if (recaptchaRequired && !recaptchaToken) {
      setAuthError('Confirmați reCAPTCHA înainte de autentificare.');
      return;
    }

    setAuthLoading(true);
    try {
      const serverResult = await loginServerAdmin(loginData.username, loginData.pin, recaptchaToken);
      if (serverResult.available) {
        setAdminStorageMode('server');
        if (serverResult.ok && serverResult.user && serverResult.session) {
          clearAdminSession();
          setSession(serverResult.session);
          setUsers([serverResult.user]);
          setAuthError('');
          setLoginData((previous) => ({ ...previous, pin: '' }));
          setRecaptchaToken('');
          setBannedUntil(null);
          await applyServerDashboard();
          return;
        }

        setBannedUntil(serverResult.bannedUntil || null);
        setAuthError(
          serverResult.remainingAttempts !== undefined && serverResult.remainingAttempts !== null && serverResult.remainingAttempts > 0
            ? `${serverResult.message || 'Date de autentificare incorecte.'} Încercări rămase: ${serverResult.remainingAttempts}.`
            : serverResult.message || 'Date de autentificare incorecte.',
        );
        return;
      }

      setAdminStorageMode('local');
      const result = validateAdminLogin(loginData.username, loginData.pin);
      setUsers(getAdminUsers());

      if (result.ok) {
        setSession(result.session);
        setAuthError('');
        setLoginData((previous) => ({ ...previous, pin: '' }));
        setRecaptchaToken('');
        setBannedUntil(null);
        setMessages(getContactMessages());
        return;
      }

      setBannedUntil(result.bannedUntil || getAdminBanStatus(loginData.username));
      setAuthError(
        result.remainingAttempts !== undefined && result.remainingAttempts > 0
          ? `${result.error} Încercări rămase: ${result.remainingAttempts}.`
          : result.error,
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (serverBacked) {
      await logoutServerAdmin();
    }
    clearAdminSession();
    setSession(null);
    setUsers(serverBacked ? [] : getAdminUsers());
    setMessages(serverBacked ? [] : getContactMessages());
    setLoginData({ username: 'admin', pin: '' });
    setRecaptchaToken('');
  };

  const markAsRead = async (messageId: string) => {
    if (serverBacked) {
      const result = await updateServerContactMessageStatus(messageId, 'read');
      if (result.available && result.ok && result.messages) {
        setMessages(result.messages);
      }
      return;
    }

    setMessages(updateContactMessageStatus(messageId, 'read'));
  };

  const removeMessage = async (messageId: string) => {
    if (serverBacked) {
      const result = await deleteServerContactMessage(messageId);
      if (result.available && result.ok && result.messages) {
        setMessages(result.messages);
      }
      return;
    }

    setMessages(deleteContactMessage(messageId));
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserError('');
    setUserSuccess('');

    try {
      if (serverBacked) {
        const result = await createServerAdminUser(userForm);
        if (!result.ok) {
          throw new Error(result.message || 'Utilizatorul nu a putut fi creat.');
        }
        if (result.users) {
          setUsers(result.users);
        }
        setUserForm(emptyUserForm);
        setUserSuccess('Utilizatorul a fost creat.');
        return;
      }

      setUsers(createAdminUser(userForm));
      setUserForm(emptyUserForm);
      setUserSuccess('Utilizatorul a fost creat.');
    } catch (error) {
      setUserError(getUserActionError(error));
    }
  };

  const changeUserRole = async (userId: string, role: AdminRole) => {
    setUserError('');
    setUserSuccess('');

    try {
      if (serverBacked) {
        const result = await updateServerAdminUser(userId, { role });
        if (!result.ok) {
          throw new Error(result.message || 'Rolul nu a putut fi actualizat.');
        }
        if (result.users) {
          setUsers(result.users);
        }
        return;
      }

      setUsers(updateAdminUser(userId, { role }));
    } catch (error) {
      setUserError(getUserActionError(error));
    }
  };

  const toggleUserActive = async (userId: string, active: boolean) => {
    setUserError('');
    setUserSuccess('');

    try {
      if (serverBacked) {
        const result = await updateServerAdminUser(userId, { active });
        if (!result.ok) {
          throw new Error(result.message || 'Starea utilizatorului nu a putut fi actualizată.');
        }
        if (result.users) {
          setUsers(result.users);
        }
        return;
      }

      setUsers(updateAdminUser(userId, { active }));
    } catch (error) {
      setUserError(getUserActionError(error));
    }
  };

  const removeUser = async (userId: string) => {
    if (!session) {
      return;
    }

    setUserError('');
    setUserSuccess('');

    try {
      if (serverBacked) {
        const result = await deleteServerAdminUser(userId);
        if (!result.ok) {
          throw new Error(result.message || 'Utilizatorul nu a putut fi șters.');
        }
        if (result.users) {
          setUsers(result.users);
        }
        return;
      }

      setUsers(deleteAdminUser(userId, session.userId));
    } catch (error) {
      setUserError(getUserActionError(error));
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <section className="border-b border-blue-100 bg-white py-10">
          <div className="container mx-auto px-4">
            <nav className="mb-4 text-sm text-slate-500">
              <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                Acasă
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Admin</span>
            </nav>
            <h1 className="text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
              Admin
            </h1>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <form
            onSubmit={handleLogin}
            className="mx-auto max-w-md rounded-xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-950/5"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-blue-50">
                <Lock className="h-5 w-5 text-blue-800" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-blue-950">Autentificare admin</h2>
                <p className="text-sm text-slate-500">
                  Utilizator, parolă/PIN, reCAPTCHA și protecție fail-to-ban.
                </p>
              </div>
            </div>

            <label htmlFor="admin-username" className="mb-2 block text-sm font-medium text-slate-700">
              Utilizator
            </label>
            <input
              id="admin-username"
              type="text"
              value={loginData.username}
              onChange={(event) => {
                const username = event.target.value;
                setLoginData((previous) => ({ ...previous, username }));
                setBannedUntil(getAdminBanStatus(username));
                setAuthError('');
              }}
              className="mb-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              autoComplete="username"
              required
            />

            <label htmlFor="admin-pin" className="mb-2 block text-sm font-medium text-slate-700">
              PIN
            </label>
            <input
              id="admin-pin"
              type="password"
              value={loginData.pin}
              onChange={(event) => setLoginData((previous) => ({ ...previous, pin: event.target.value }))}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              autoComplete="current-password"
              required
            />
            <div className="mt-4">
              <RecaptchaBox siteKey={recaptchaSiteKey} onTokenChange={setRecaptchaToken} />
            </div>
            {loginIsBanned && bannedUntil && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                <Ban className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Prea multe încercări eșuate. Autentificare blocată până la {formatDate(bannedUntil)}.</span>
              </div>
            )}
            {authError && <p className="mt-3 text-sm text-red-600">{authError}</p>}

            <button
              type="submit"
              disabled={loginIsBanned || authLoading || adminStorageMode === 'checking'}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-950/20 transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock className="h-4 w-4" />
              {authLoading || adminStorageMode === 'checking' ? 'Se verifică...' : 'Intră în admin'}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <section className="border-b border-blue-100 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <nav className="mb-4 text-sm text-slate-500">
                <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                  Acasă
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-700">Admin</span>
              </nav>
              <h1 className="text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
                Admin
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Mesaje primite prin formularul de contact, management utilizatori și scurtături pentru administrarea site-ului.
              </p>
              {currentUser && (
                <p className="mt-2 text-sm text-slate-500">
                  Autentificat: <span className="font-semibold text-slate-700">{currentUser.displayName}</span> ·{' '}
                  {currentUser.role === 'admin' ? 'Administrator' : 'Editor'}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-950 shadow-sm transition-colors hover:bg-blue-50"
            >
              <LogOut className="h-4 w-4" />
              Ieșire
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Mesaje totale</p>
                <p className="mt-1 text-3xl font-semibold text-blue-950">{messages.length}</p>
              </div>
              <Inbox className="h-7 w-7 text-blue-800" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Necitite</p>
                <p className="mt-1 text-3xl font-semibold text-blue-950">{unreadCount}</p>
              </div>
              <Mail className="h-7 w-7 text-blue-800" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Telefon public</p>
                <p className="mt-1 text-2xl font-semibold text-blue-950">
                  {siteContent.contact.phones[0].display}
                </p>
              </div>
              <Phone className="h-7 w-7 text-blue-800" />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Utilizatori admin</p>
                <p className="mt-1 text-3xl font-semibold text-blue-950">{users.length}</p>
              </div>
              <Users className="h-7 w-7 text-blue-800" />
            </div>
          </div>
        </div>

        <nav className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-5" aria-label="Meniu admin">
          {adminSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeAdminSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveAdminSection(section.id)}
                className={`flex min-h-20 items-center gap-3 rounded-xl border p-4 text-left shadow-sm transition-colors ${
                  isActive
                    ? 'border-blue-300 bg-blue-800 text-white shadow-blue-950/15'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isActive ? 'bg-white/15 text-white' : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-semibold">{section.label}</span>
                  <span className={`mt-1 block text-xs ${isActive ? 'text-blue-50' : 'text-slate-500'}`}>
                    {section.description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        {activeAdminSection === 'content' && <AdminContentManager />}
        {activeAdminSection === 'media' && <AdminMediaManager />}

        {activeAdminSection === 'messages' && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-blue-950">Mesaje contact</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredMessages.length} din {messages.length} mesaje afișate.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Caută mesaj"
                    className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200 sm:w-56"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => downloadMessagesCsv(messages)}
                  disabled={messages.length === 0}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-blue-100 bg-white px-4 text-sm font-semibold text-blue-950 shadow-sm transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Exportă CSV
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <article key={message.id} className="p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-slate-950">{message.name}</h3>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              message.status === 'new'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {message.status === 'new' ? 'Nou' : 'Citit'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                          <a href={`mailto:${message.email}`} className="transition-colors hover:text-slate-900">
                            {message.email}
                          </a>
                          {message.phone && (
                            <a href={`tel:${message.phone}`} className="transition-colors hover:text-slate-900">
                              {message.phone}
                            </a>
                          )}
                          <span>{formatDate(message.createdAt)}</span>
                        </div>
                        <p className="mt-4 whitespace-pre-wrap text-slate-700">{message.message}</p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        {message.status === 'new' && (
                          <button
                            type="button"
                            onClick={() => markAsRead(message.id)}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Citit
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMessage(message.id)}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Șterge
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Inbox className="mx-auto h-10 w-10 text-slate-300" />
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">Nu există mesaje afișate.</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Mesajele trimise prin formularul de contact vor apărea aici.
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-blue-950">Scurtături</h2>
              <div className="mt-4 space-y-2">
                <Link
                  to="/contact#formular-contact"
                  className="flex min-h-10 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Formular contact
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  to="/finantare-ue"
                  className="flex min-h-10 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Finanțare UE
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <a
                  href={shopUrl}
                  className="flex min-h-10 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Magazin
                  <ShoppingBag className="h-4 w-4" />
                </a>
              </div>
            </section>

            <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
              <h2 className="text-lg font-semibold text-blue-950">Stare</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <span>SEO admin</span>
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">noindex</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Stocare mesaje</span>
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">{storageLabel}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Fail-to-ban</span>
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">5 / 15 min</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>reCAPTCHA</span>
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">
                    {recaptchaSiteKey ? 'activ' : 'neconfigurat'}
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </div>
        )}

        {activeAdminSection === 'users' && (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-blue-950">Management utilizatori</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {serverBacked
                    ? 'Utilizatori salvați în MySQL pentru interfața admin. Rolul admin poate gestiona conturile.'
                    : 'Utilizatori locali pentru interfața admin. Rolul admin poate gestiona conturile.'}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
                <ShieldCheck className="h-4 w-4" />
                Fail-to-ban activ
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-[22rem_minmax(0,1fr)]">
            <form onSubmit={handleCreateUser} className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-950">
                <UserPlus className="h-5 w-5" />
                Utilizator nou
              </h3>
              <fieldset disabled={!canManageUsers} className="space-y-3 disabled:opacity-60">
                <div>
                  <label htmlFor="new-username" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Utilizator
                  </label>
                  <input
                    id="new-username"
                    value={userForm.username}
                    onChange={(event) => setUserForm((previous) => ({ ...previous, username: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    autoComplete="off"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="new-display-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nume afișat
                  </label>
                  <input
                    id="new-display-name"
                    value={userForm.displayName}
                    onChange={(event) => setUserForm((previous) => ({ ...previous, displayName: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="new-role" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Rol
                  </label>
                  <select
                    id="new-role"
                    value={userForm.role}
                    onChange={(event) =>
                      setUserForm((previous) => ({ ...previous, role: event.target.value as AdminRole }))
                    }
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="new-pin" className="mb-1.5 block text-sm font-medium text-slate-700">
                    PIN
                  </label>
                  <input
                    id="new-pin"
                    type="password"
                    value={userForm.pin}
                    onChange={(event) => setUserForm((previous) => ({ ...previous, pin: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    autoComplete="new-password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900"
                >
                  <UserPlus className="h-4 w-4" />
                  Creează utilizator
                </button>
              </fieldset>
              {!canManageUsers && (
                <p className="mt-3 text-sm text-slate-500">Doar administratorii pot modifica utilizatorii.</p>
              )}
              {userError && <p className="mt-3 text-sm text-red-600">{userError}</p>}
              {userSuccess && <p className="mt-3 text-sm text-emerald-700">{userSuccess}</p>}
            </form>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[minmax(0,1fr)_7rem_7rem_8rem] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 max-lg:hidden">
                <span>Utilizator</span>
                <span>Rol</span>
                <span>Stare</span>
                <span className="text-right">Acțiuni</span>
              </div>
              <div className="divide-y divide-slate-200">
                {users.map((user) => (
                  <article
                    key={user.id}
                    className="grid grid-cols-1 gap-3 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_7rem_7rem_8rem] lg:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-950">{user.displayName}</h3>
                        {session?.userId === user.id && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                            curent
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        Ultima autentificare: {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'niciodată'}
                      </p>
                    </div>

                    <select
                      value={user.role}
                      onChange={(event) => changeUserRole(user.id, event.target.value as AdminRole)}
                      disabled={!canManageUsers}
                      className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 disabled:opacity-60"
                    >
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>

                    <button
                      type="button"
                      disabled={!canManageUsers}
                      onClick={() => toggleUserActive(user.id, !user.active)}
                      className={`inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                        user.active
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {user.active ? 'Activ' : 'Blocat'}
                    </button>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={!canManageUsers || session?.userId === user.id}
                        onClick={() => removeUser(user.id)}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Șterge
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        )}

        {activeAdminSection === 'security' && (
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-950">Securitate și scurtături</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Starea protecțiilor admin și linkuri rapide pentru administrare.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
                  <ShieldCheck className="h-4 w-4" />
                  Admin noindex
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
              <section className="rounded-lg border border-blue-100 bg-blue-50/60 p-5">
                <h3 className="text-lg font-semibold text-blue-950">Stare protecții</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <span>SEO admin</span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">noindex</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Stocare mesaje</span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">{storageLabel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Fail-to-ban</span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">5 / 15 min</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>reCAPTCHA</span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">
                      {recaptchaSiteKey ? 'activ' : 'neconfigurat'}
                    </span>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-blue-950">Scurtături</h3>
                <div className="mt-4 space-y-2">
                  <Link
                    to="/contact#formular-contact"
                    className="flex min-h-10 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Formular contact
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/finantare-ue"
                    className="flex min-h-10 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Finanțare UE
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <a
                    href={shopUrl}
                    className="flex min-h-10 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Magazin
                    <ShoppingBag className="h-4 w-4" />
                  </a>
                </div>
              </section>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
