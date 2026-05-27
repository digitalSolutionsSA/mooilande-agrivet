import React from 'react';

const teamMembers = [
  { name: 'Adolph Barnard', role: 'Animal Nutritionist & Operations Manager', image: '/team/adolphbarnard.png' },
  { name: 'Lydia Nrateng Mokoena', role: 'General Worker/ House Keeping', image: '/team/nratengmokoena.png' },
  { name: 'Carina Beukes', role: 'Manager', image: '/team/carinabeukes.png' },
  { name: 'Wanda Viljoen', role: 'Store Manager', image: '/team/wandaviljoen.png' },
  { name: 'Megan De Bruyn', role: 'Receiving Clerk', image: '/team/megandebruyn.png' },
  { name: 'Andries Blignaut', role: 'Store & Machine Operator', image: '/team/andriesblignaut.png' },
  { name: 'Hardus Botha', role: 'Delivery Driver', image: '/team/hardusbotha.png' },
  { name: 'Mariska Smith', role: 'General Worker / Cashier', image: '/team/mariskasmith.png' },
  { name: 'Dianke De Villiers', role: 'Social Media / Cashier', image: '/team/diankedevilliers.png' },
  { name: 'Charleen van Baalen', role: 'Bookkeeper', image: '/team/charleenvanbaalen.png' },
  { name: 'Annatjie Coetsee', role: 'Protek Sales Assistant', image: '/team/annatjiecoetsee.png' },
  { name: 'Johnny Marjorie', role: 'General Worker / Floor Assistant', image: '/team/johnnymarjorie.png' },
  { name: 'Danike Perelaer', role: 'General Worker / Cashier', image: '/team/danikeperelaer.png' },
  { name: 'Moses Zolidwa', role: 'General Worker / Store Assistant', image: '/team/moseszolidwa.png' },
  { name: 'Simon Mokaloba', role: 'General Worker / Store Assistant', image: '/team/simonmokaloba.png' },
];

const marqueeItems = [...teamMembers, ...teamMembers];

const TeamMarquee: React.FC = () => {
  return (
    <section
      id="team"
      style={{
        padding: '50px 0', // 👈 tighter section
        background:
          'linear-gradient(180deg, var(--clr-cream) 0%, rgba(250,246,237,0.96) 100%)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ marginBottom: 18 }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--clr-leaf)',
            display: 'block',
            marginBottom: 8,
          }}
        >
          Meet The Team
        </span>

        <h2
          className="team-heading"
          style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 'clamp(1.4rem, 2vw, 2rem)',
            fontWeight: 700,
            color: 'var(--clr-text)',
            marginBottom: 6,
            lineHeight: 1.2,
            whiteSpace: 'nowrap', // 👈 single line desktop
          }}
        >
          The people behind{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--clr-moss)' }}>
            Mooilande AgriVet.
          </em>
        </h2>

        <div
          style={{
            width: 45,
            height: 3,
            background: 'linear-gradient(90deg, var(--clr-lime), transparent)',
            marginBottom: 10,
            borderRadius: 2,
          }}
        />

        <p
          style={{
            color: 'var(--clr-text-muted)',
            lineHeight: 1.5,
            fontSize: '0.9rem',
            maxWidth: 520,
          }}
        >
          Meet the team that keeps Mooilande AgriVet moving every day.
        </p>
      </div>

      <div className="team-marquee-wrap">
        <div className="team-marquee-track">
          {marqueeItems.map((member, index) => (
            <article key={`${member.name}-${index}`} className="team-card">
              <div className="team-card__image-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card__image"
                />
              </div>

              <div className="team-card__content">
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .team-marquee-wrap {
          overflow: hidden;
          width: 100%;
        }

        .team-marquee-track {
          display: flex;
          gap: 14px;
          width: max-content;
          animation: scroll 28s linear infinite;
        }

        .team-marquee-wrap:hover .team-marquee-track {
          animation-play-state: paused;
        }

        .team-card {
          width: 180px;
          min-width: 180px;
          background: rgba(255,255,255,0.95);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0,0,0,0.05);
        }

        .team-card__image-wrap {
          width: 100%;
          aspect-ratio: 1 / 1; /* 👈 square */
          overflow: hidden;
        }

        .team-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .team-card__content {
          padding: 10px;
        }

        .team-card__name {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 3px;
          color: var(--clr-text);
        }

        .team-card__role {
          font-size: 0.8rem;
          color: var(--clr-text-muted);
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* 👇 MOBILE FIX (important or it breaks) */
        @media (max-width: 768px) {
          .team-heading {
            white-space: normal;
          }

          .team-card {
            width: 150px;
            min-width: 150px;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamMarquee;
export { TeamMarquee };