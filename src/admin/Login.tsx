import React, { useState } from 'react';
import { supabase, emailLinkError } from '../lib/supabase';

interface Props {
  recovering: boolean;
  onRecovered: () => void;
}

type Mode = 'signin' | 'forgot';

const Login: React.FC<Props> = ({ recovering, onRecovered }) => {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(
    emailLinkError ? `${emailLinkError}. Reset links only work once, so request a new one below.` : '',
  );
  const [notice, setNotice] = useState('');

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message === 'Invalid login credentials' ? 'That email and password don’t match.' : error.message);
  };

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dssa-portals`,
    });
    setBusy(false);
    if (error) setError(error.message);
    else setNotice('If that email belongs to an admin, a reset link is on its way.');
  };

  const setNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Use at least 8 characters.');
      return;
    }
    setBusy(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) setError(error.message);
    else onRecovered();
  };

  return (
    <div className="adm adm-center adm-login">
      <form
        className="adm-card adm-auth"
        onSubmit={recovering ? setNewPassword : mode === 'signin' ? signIn : sendReset}
      >
        <img src="/animals-logo.webp" alt="" className="adm-auth__logo" />
        <span className="adm-eyebrow">Mooilande AgriVet</span>
        <h1>{recovering ? 'Choose a new password' : mode === 'signin' ? 'Admin portal' : 'Reset your password'}</h1>

        {!recovering && (
          <label className="adm-field">
            <span>Email</span>
            <input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
          </label>
        )}

        {(recovering || mode === 'signin') && (
          <label className="adm-field">
            <span>{recovering ? 'New password' : 'Password'}</span>
            <input
              type="password"
              autoComplete={recovering ? 'new-password' : 'current-password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
        )}

        {error && <p className="adm-alert adm-alert--error">{error}</p>}
        {notice && <p className="adm-alert">{notice}</p>}

        <button className="adm-btn adm-btn--primary adm-btn--block" disabled={busy}>
          {busy ? 'Please wait…' : recovering ? 'Save password' : mode === 'signin' ? 'Sign in' : 'Send reset link'}
        </button>

        {!recovering && (
          <button
            type="button"
            className="adm-link"
            onClick={() => {
              setMode(m => (m === 'signin' ? 'forgot' : 'signin'));
              setError('');
              setNotice('');
            }}
          >
            {mode === 'signin' ? 'Forgot your password?' : 'Back to sign in'}
          </button>
        )}
        <a href="/" className="adm-link">← Back to the website</a>
      </form>
    </div>
  );
};

export default Login;
