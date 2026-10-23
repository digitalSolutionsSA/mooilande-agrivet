import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock, Facebook, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { gsap, revealAll, magnetic } from '../lib/motion';
import { CONTACT } from '../data/site';

const Contact: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => revealAll(el), el);
    const offs = Array.from(el.querySelectorAll<HTMLElement>('[data-magnetic]')).map(b => magnetic(b, 0.2));
    return () => {
      offs.forEach(o => o());
      ctx.revert();
    };
  }, []);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  // No backend: hand the enquiry to the visitor's mail app, pre-filled
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry from ${form.name}`;
    const body = `${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Mooilande AgriVet, ' + CONTACT.address)}`;

  return (
    <section id="contact" className="contact" ref={root}>
      <div className="container contact__grid">
        <div className="contact__info">
          <span className="eyebrow eyebrow--amber" data-reveal>Get in touch</span>
          <h2 className="display" data-reveal="lines">
            We're here <em>to help.</em>
          </h2>

          <ul className="contact__list" data-stagger>
            <li>
              <span className="contact__icon"><MapPin size={20} /></span>
              <div>
                <strong>Visit us</strong>
                <p>{CONTACT.address}</p>
                <a href={mapsHref} target="_blank" rel="noreferrer" className="link-arrow">
                  Get directions <ArrowUpRight size={14} />
                </a>
              </div>
            </li>
            <li>
              <span className="contact__icon"><Phone size={20} /></span>
              <div>
                <strong>Call us</strong>
                <p>
                  Landline: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                  <br />
                  Cell / WhatsApp: <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">{CONTACT.cell}</a>
                </p>
              </div>
            </li>
            <li>
              <span className="contact__icon"><Mail size={20} /></span>
              <div>
                <strong>Email us</strong>
                <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              </div>
            </li>
            <li>
              <span className="contact__icon"><Clock size={20} /></span>
              <div>
                <strong>Business hours</strong>
                <dl className="hours">
                  {CONTACT.hours.map(h => (
                    <React.Fragment key={h.day}>
                      <dt>{h.day}</dt>
                      <dd>{h.time}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </div>
            </li>
          </ul>

          <div className="contact__social" data-stagger>
            <a href={CONTACT.facebookHref} target="_blank" rel="noreferrer" className="chip chip--fb">
              <Facebook size={16} /> Facebook
            </a>
            <a href={CONTACT.channelHref} target="_blank" rel="noreferrer" className="chip chip--wa">
              <MessageCircle size={16} /> WhatsApp Channel
            </a>
          </div>
        </div>

        <form className="contact__form" onSubmit={submit} data-reveal>
          <h3>Send us a message</h3>
          <div className="field">
            <input id="f-name" required placeholder=" " value={form.name} onChange={update('name')} />
            <label htmlFor="f-name">Full name</label>
          </div>
          <div className="field-row">
            <div className="field">
              <input id="f-email" type="email" required placeholder=" " value={form.email} onChange={update('email')} />
              <label htmlFor="f-email">Email address</label>
            </div>
            <div className="field">
              <input id="f-phone" type="tel" placeholder=" " value={form.phone} onChange={update('phone')} />
              <label htmlFor="f-phone">Phone number</label>
            </div>
          </div>
          <div className="field">
            <textarea id="f-msg" rows={5} required placeholder=" " value={form.message} onChange={update('message')} />
            <label htmlFor="f-msg">How can we help?</label>
          </div>
          <button type="submit" className="btn btn--amber btn--block" data-magnetic>
            Send message <Send size={16} />
          </button>
          <p className="contact__fine">This opens your email app with your message ready to send.</p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
