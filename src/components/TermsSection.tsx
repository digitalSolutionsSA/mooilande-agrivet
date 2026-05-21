import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LOGO_GREEN = '#3F6B2A';
const LOGO_ORANGE = '#D97A1E';
const LOGO_LIGHT_GREEN = '#8FBF3A';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionItem & { defaultOpen?: boolean }> = ({ title, content, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: 12,
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px',
          background: open ? LOGO_GREEN : 'rgba(255,255,255,0.15)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '15px', color: 'white' }}>
          {title}
        </span>
        <ChevronDown
          size={18}
          style={{
            color: open ? LOGO_LIGHT_GREEN : 'rgba(255,255,255,0.8)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s',
            flexShrink: 0,
          }}
        />
      </button>

      {open && (
        <div
          style={{
            padding: '20px 24px',
            background: 'white',
            color: '#444',
            fontSize: '14px',
            lineHeight: 1.8,
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const TermsSection: React.FC = () => {
  const items: (AccordionItem & { defaultOpen?: boolean })[] = [
    {
      title: 'Returns & Refunds Policy',
      defaultOpen: true,
      content: (
        <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
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
        <p style={{ margin: 0 }}>
          In accordance with veterinary medicine handling and storage regulations, and to maintain product integrity, safety, and efficacy, <strong>no animal medicines or vaccines</strong> — including cold-chain and non-cold-chain products — may be returned or exchanged once they have left the premises. This policy applies <strong>regardless of storage conditions</strong> after purchase. Thank you for your understanding.
        </p>
      ),
    },
    {
      title: 'Delivery & Courier Services',
      content: (
        <>
          <p style={{ marginTop: 0 }}>
            Mooilande AgriVet offers <strong>nationwide courier and delivery services</strong>. Delivery charges are calculated based on the distance from our premises in Mooilande, Meyerton.
          </p>
          <p>
            Shipping and courier services on <strong>feed loads and other applicable large items</strong> are available at the sole discretion of Mooilande AgriVet. Additional charges may apply.
          </p>
          <p>
            Delivery timeframes are estimates only and are not guaranteed. Mooilande AgriVet shall not be held liable for delays caused by third-party couriers, weather conditions, or other circumstances beyond our control.
          </p>
          <p style={{ marginBottom: 0 }}>
            Risk of loss or damage to goods passes to the customer upon handover to the courier or upon delivery, whichever occurs first.
          </p>
        </>
      ),
    },
    {
      title: 'Pricing & Payment',
      content: (
        <>
          <p style={{ marginTop: 0 }}>
            All prices are displayed in South African Rand (ZAR) and are inclusive of VAT where applicable. Prices are subject to change without prior notice.
          </p>
          <p style={{ marginBottom: 0 }}>
            Mooilande AgriVet reserves the right to cancel or refuse any order where a pricing error has occurred. Payment must be received in full before goods are dispatched or handed over.
          </p>
        </>
      ),
    },
    {
      title: 'Product Information & Availability',
      content: (
        <p style={{ margin: 0 }}>
          Every effort is made to ensure that product descriptions, images, and specifications are accurate; however, Mooilande AgriVet does not warrant that all information is error-free, complete, or current. Products are subject to availability and may be discontinued or substituted without notice. Always read label instructions before use.
        </p>
      ),
    },
    {
      title: 'Limitation of Liability',
      content: (
        <p style={{ margin: 0 }}>
          To the fullest extent permitted by South African law, Mooilande AgriVet shall not be liable for any indirect, incidental, consequential, or special damages arising from the purchase or use of our products, including but not limited to crop failure, livestock illness or death, or loss of income. Our liability is limited to the purchase price of the specific product giving rise to the claim. Nothing in these terms limits any statutory rights you may have under the Consumer Protection Act 68 of 2008.
        </p>
      ),
    },
    {
      title: 'Customer Responsibilities',
      content: (
        <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>It is the customer's responsibility to ensure that products are stored and used in accordance with the manufacturer's instructions and applicable regulations.</li>
          <li>Veterinary medicines must only be used under appropriate veterinary guidance where required by law.</li>
          <li>The customer is responsible for ensuring that any products purchased comply with local by-laws and permit requirements.</li>
        </ol>
      ),
    },
    {
      title: 'Privacy & Data',
      content: (
        <p style={{ margin: 0 }}>
          Personal information collected during enquiries, purchases, or newsletter sign-ups is used solely to fulfil your order and communicate with you. We do not sell or share your personal data with third parties except as required to process your order (e.g., delivery couriers). By engaging with us you consent to the collection and processing of your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA).
        </p>
      ),
    },
    {
      title: 'Governing Law & Dispute Resolution',
      content: (
        <p style={{ margin: 0 }}>
          These terms and conditions are governed by the laws of the Republic of South Africa. Any dispute arising from a transaction with Mooilande AgriVet shall first be referred to good-faith negotiation. If unresolved, disputes may be referred to the relevant consumer authority or a court of competent jurisdiction within South Africa. The Consumer Protection Act 68 of 2008 and the Electronic Communications and Transactions Act 25 of 2002 apply where relevant.
        </p>
      ),
    },
    {
      title: 'Amendments',
      content: (
        <p style={{ margin: 0 }}>
          Mooilande AgriVet reserves the right to amend these terms and conditions at any time without prior notice. The version published on our website at the time of your purchase constitutes the applicable terms. Continued use of our services following any amendment constitutes acceptance of the updated terms.
        </p>
      ),
    },
  ];

  return (
    <section id="terms" style={{ background: LOGO_ORANGE, padding: 'var(--space-2xl) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circles matching the newsletter banner style */}
      <div
        style={{
          position: 'absolute', right: -100, top: -100,
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', left: -80, bottom: -80,
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.06)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.82)',
              display: 'block',
              marginBottom: 12,
            }}
          >
            Legal
          </span>

          <h2
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 16,
            }}
          >
            Terms &amp; Conditions
          </h2>

          <div
            style={{
              width: 60,
              height: 3,
              background: 'rgba(255,255,255,0.45)',
              borderRadius: '2px',
              margin: '0 auto 20px',
            }}
          />

          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '15px',
              lineHeight: 1.7,
              maxWidth: 560,
              margin: '0 auto',
            }}
          >
            Please read these terms carefully. By purchasing from or engaging with Mooilande AgriVet you agree to be bound by the policies below. Last updated: May 2025.
          </p>
        </div>

        {/* Quick-reference badges */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {[
            { label: '7-Day Returns Window', textColor: LOGO_GREEN },
            { label: 'Invoice Required for Returns', textColor: LOGO_GREEN },
            { label: 'Vet Medicines — No Returns', textColor: '#c0392b' },
            { label: 'Nationwide Delivery Available', textColor: '#1a5276' },
          ].map(badge => (
            <span
              key={badge.label}
              style={{
                background: 'white',
                color: badge.textColor,
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Accordion */}
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {items.map(item => (
            <Accordion key={item.title} {...item} />
          ))}
        </div>

        {/* Contact note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            padding: '20px 24px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.25)',
            maxWidth: 560,
            margin: '40px auto 0',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.92)', lineHeight: 1.7 }}>
            Questions about our policies?{' '}
            <a href="#contact" style={{ color: 'white', fontWeight: 700, textDecoration: 'underline' }}>
              Contact us
            </a>{' '}
            or email{' '}
            <a href="mailto:admin@mooilande.co.za" style={{ color: 'white', fontWeight: 700, textDecoration: 'underline' }}>
              admin@mooilande.co.za
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsSection;
