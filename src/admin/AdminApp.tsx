import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase, openedFromRecoveryLink } from '../lib/supabase';
import Login from './Login';
import Dashboard from './Dashboard';
import './admin.css';

type Access = 'checking' | 'admin' | 'denied';

/** /dssa-portals — sign in, confirm the user is an admin, then show the product manager. */
const AdminApp: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [access, setAccess] = useState<Access>('checking');
  // Also set from the URL, in case the PASSWORD_RECOVERY event fires before we subscribe
  const [recovering, setRecovering] = useState(openedFromRecoveryLink);

  // Keep the portal out of search results
  useEffect(() => {
    document.title = 'Admin Portal – Mooilande AgriVet';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'PASSWORD_RECOVERY') setRecovering(true);
      setSession(s);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // An admin can read their own row in public.admins; anyone else gets nothing back
  useEffect(() => {
    if (!session) return;
    setAccess('checking');
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setAccess(data ? 'admin' : 'denied'));
  }, [session]);

  if (loading) return <div className="adm adm-center"><div className="adm-spinner" /></div>;

  if (!session || recovering) {
    return <Login recovering={recovering} onRecovered={() => setRecovering(false)} />;
  }

  if (access === 'checking') return <div className="adm adm-center"><div className="adm-spinner" /></div>;

  if (access === 'denied') {
    return (
      <div className="adm adm-center">
        <div className="adm-card adm-auth">
          <img src="/animals-logo.webp" alt="" className="adm-auth__logo" />
          <h1>No admin access</h1>
          <p>
            You're signed in as <strong>{session.user.email}</strong>, but this account hasn't been given access to the
            portal yet. Ask the site owner to add you as an admin.
          </p>
          <button className="adm-btn adm-btn--ghost" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </div>
    );
  }

  return <Dashboard session={session} />;
};

export default AdminApp;
