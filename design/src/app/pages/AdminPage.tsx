import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Inbox,
  Lock,
  LogOut,
  Mail,
  Phone,
  Search,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';
import {
  ContactMessage,
  deleteContactMessage,
  getContactMessages,
  updateContactMessageStatus,
} from '../utils/contactMessages';

const adminAuthKey = 'genesys-admin-authenticated';
const adminPin = import.meta.env.VITE_ADMIN_PIN?.trim() || '1234';
const shopUrl = 'https://shop.syshub.ro/';

function getInitialAuthState() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(adminAuthKey) === 'true';
}

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
    ['Data', 'Status', 'Nume', 'Email', 'Telefon', 'Mesaj'],
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

export function AdminPage() {
  useSeo({
    title: `Admin | ${siteContent.meta.ogTitle}`,
    description: 'Interfață minimă de administrare pentru mesajele primite prin site.',
    path: '/admin',
    noindex: true,
  });

  const [authenticated, setAuthenticated] = useState(getInitialAuthState);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>(() => getContactMessages());
  const [query, setQuery] = useState('');

  const unreadCount = messages.filter((message) => message.status === 'new').length;
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

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pin.trim() === adminPin) {
      window.sessionStorage.setItem(adminAuthKey, 'true');
      setAuthenticated(true);
      setAuthError('');
      setPin('');
      setMessages(getContactMessages());
      return;
    }

    setAuthError('PIN incorect.');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(adminAuthKey);
    setAuthenticated(false);
    setPin('');
  };

  const markAsRead = (messageId: string) => {
    setMessages(updateContactMessageStatus(messageId, 'read'));
  };

  const removeMessage = (messageId: string) => {
    setMessages(deleteContactMessage(messageId));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <section className="border-b border-blue-100 bg-white py-10">
          <div className="container mx-auto px-4">
            <nav className="mb-4 text-sm text-slate-500">
              <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                Home
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
                <p className="text-sm text-slate-500">Interfață locală pentru mesaje.</p>
              </div>
            </div>

            <label htmlFor="admin-pin" className="mb-2 block text-sm font-medium text-slate-700">
              PIN administrator
            </label>
            <input
              id="admin-pin"
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              autoComplete="current-password"
              required
            />
            {authError && <p className="mt-3 text-sm text-red-600">{authError}</p>}

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-950/20 transition-colors hover:bg-blue-900"
            >
              <Lock className="h-4 w-4" />
              Intră în admin
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
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-700">Admin</span>
              </nav>
              <h1 className="text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
                Admin
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Mesaje primite prin formularul de contact și scurtături pentru administrarea site-ului.
              </p>
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
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>

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
                  Export CSV
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
                  Shop
                  <ShoppingBag className="h-4 w-4" />
                </a>
              </div>
            </section>

            <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
              <h2 className="text-lg font-semibold text-blue-950">Status</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <span>SEO admin</span>
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">noindex</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Stocare mesaje</span>
                  <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-blue-800">local</span>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
