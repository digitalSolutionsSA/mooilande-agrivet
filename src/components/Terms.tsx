import React, { useLayoutEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { gsap, ScrollTrigger, revealAll } from '../lib/motion';
import { CONTACT } from '../data/site';

interface Item {
  title: string;
  content: React.ReactNode;
}

const ITEMS: Item[] = [
  {
    title: 'Returns & Refunds Policy',
    content: (
      <ol>
        <li>Returns are accepted within <strong>7 days of purchase</strong>.</li>
        <li>The <strong>original invoice</strong> is required for all returns.</li>
        <li>Items must be in <strong>original packaging, undamaged, and resaleable</strong>. No returns will be accepted on seed or fertilizers.</li>
        <li>Animal feed returns are accepted within <strong>7 days</strong>, subject to product condition.</li>
        <li>Returns after 7 days will <strong>not be accepted</strong> unless required by applicable law.</li>
      </ol>
    ),
  },
  {
    title: 'Veterinary Medicines & Vaccines – No Returns',
    content: (
      <p>
        In accordance with veterinary medicine handling and storage regulations, and to maintain product integrity, safety, and efficacy, <strong>no animal medicines or vaccines</strong> — including cold-chain and non-cold-chain products — may be returned or exchanged once they have left the premises. This policy applies <strong>regardless of storage conditions</strong> after purchase. Thank you for your understanding.
      </p>
    ),
  },
  {
    title: 'Delivery & Courier Services',
    content: (
      <>
        <p>
          Mooilande AgriVet offers <strong>nationwide courier and delivery services</strong>. Delivery charges are calculated based on the distance from our premises in Mooilande, Meyerton.
        </p>
        <p>
          Shipping and courier services on <strong>feed loads and other applicable large items</strong> are available at the sole discretion of Mooilande AgriVet. Additional charges may apply.
        </p>
        <p>
          Delivery timeframes are estimates only and are not guaranteed. Mooilande AgriVet shall not be held liable for delays caused by third-party couriers, weather conditions, or other circumstances beyond our control.
        </p>
        <p>
          Risk of loss or damage to goods passes to the customer upon handover to the courier or upon delivery, whichever occurs first.
        </p>
      </>
    ),
  },
  {
    title: 'Pricing & Payment',
    content: (
      <>
        <p>
          All prices are displayed in South African Rand (ZAR) and are inclusive of VAT where applicable. Prices are subject to change without prior notice.
        </p>
        <p>
          Mooilande AgriVet reserves the right to cancel or refuse any order where a pricing error has occurred. Payment must be received in full before goods are dispatched or handed over.
        </p>
      </>
    ),
  },
  {
    title: 'Product Information & Availability',
    content: (
      <p>
        Every effort is made to ensure that product descriptions, images, and specifications are accurate; however, Mooilande AgriVet does not warrant that all information is error-free, complete, or current. Products are subject to availability and may be discontinued or substituted without notice. Always read label instructions before use.
      </p>
    ),
  },
  {
    title: 'Limitation of Liability',
    content: (
      <p>
        To the fullest extent permitted by South African law, Mooilande AgriVet shall not be liable for any indirect, incidental, consequential, or special damages arising from the purchase or use of our products, including but not limited to crop failure, livestock illness or death, or loss of income. Our liability is limited to the purchase price of the specific product giving rise to the claim. Nothing in these terms limits any statutory rights you may have under the Consumer Protection Act 68 of 2008.
      </p>
    ),
  },
  {
    title: 'Customer Responsibilities',
    content: (
      <ol>
        <li>It is the customer's responsibility to ensure that products are stored and used in accordance with the manufacturer's instructions and applicable regulations.</li>
        <li>Veterinary medicines must only be used under appropriate veterinary guidance where required by law.</li>
        <li>The customer is responsible for ensuring that any products purchased comply with local by-laws and permit requirements.</li>
      </ol>
    ),
  },
  {
    title: 'Privacy & Data',
    content: (
      <p>
        Personal information collected during enquiries, purchases, or newsletter sign-ups is used solely to fulfil your order and communicate with you. We do not sell or share your personal data with third parties except as required to process your order (e.g., delivery couriers). By engaging with us you consent to the collection and processing of your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA).
      </p>
    ),
  },
  {
    title: 'Governing Law & Dispute Resolution',
    content: (
      <p>
        These terms and conditions are governed by the laws of the Republic of South Africa. Any dispute arising from a transaction with Mooilande AgriVet shall first be referred to good-faith negotiation. If unresolved, disputes may be referred to the relevant consumer authority or a court of competent jurisdiction within South Africa. The Consumer Protection Act 68 of 2008 and the Electronic Communications and Transactions Act 25 of 2002 apply where relevant.
      </p>
    ),
  },
  {
    title: 'Amendments',
    content: (
      <p>
        Mooilande AgriVet reserves the right to amend these terms and conditions at any time without prior notice. The version published on our website at the time of your purchase constitutes the applicable terms. Continued use of our services following any amendment constitutes acceptance of the updated terms.
      </p>
    ),
  },
];

const BADGES = [
  { label: '7-Day Returns Window', tone: 'green' },
  { label: 'Invoice Required for Returns', tone: 'green' },
  { label: 'Vet Medicines — No Returns', tone: 'red' },
  { label: 'Nationwide Delivery Available', tone: 'blue' },
];

const Accordion: React.FC<Item & { defaultOpen?: boolean }> = ({ title, content, defaultOpen }) => {
  const [open, setOpen] = useState(!!defaultOpen);
  const body = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    const el = body.current!;
    if (first.current) {
      first.current = false;
      gsap.set(el, { height: open ? 'auto' : 0 });
      return;
    }
    gsap.to(el, {
      height: open ? 'auto' : 0,
      duration: 0.6,
      ease: 'expo.inOut',
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [open]);

  return (
    <div className={`acc ${open ? 'is-open' : ''}`}>
      <button className="acc__head" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{title}</span>
        <Plus size={20} className="acc__icon" />
      </button>
      <div className="acc__body" ref={body}>
        <div className="acc__inner">{content}</div>
      </div>
    </div>
  );
};

const Terms: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => revealAll(root.current!), root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="terms" className="terms" ref={root}>
      <div className="container terms__grid">
        <aside className="terms__aside">
          <span className="eyebrow" data-reveal>Legal</span>
          <h2 className="display" data-reveal="lines">
            Terms &amp; <em>conditions.</em>
          </h2>
          <p data-reveal>
            Please read these terms carefully. By purchasing from or engaging with Mooilande AgriVet you agree to be
            bound by the policies below. Last updated: May 2025.
          </p>
          <div className="terms__badges" data-stagger>
            {BADGES.map(b => (
              <span key={b.label} className={`badge badge--${b.tone}`}>{b.label}</span>
            ))}
          </div>
          <p className="terms__help" data-reveal>
            Questions about our policies? <a href="#contact">Contact us</a> or email{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </aside>

        <div className="terms__list" data-stagger>
          {ITEMS.map((item, i) => (
            <Accordion key={item.title} {...item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Terms;
