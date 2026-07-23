import type { Metadata } from 'next'
import Link from 'next/link'
import { Monitor, ArrowRight, Check, Zap, Globe, Smartphone, ShieldCheck, Star, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Web Design Services',
  description:
    'Bespoke website design and development by BYM Studio. Stunning landing pages, e-commerce stores, portfolios, and custom web apps. Serving clients worldwide.',
}

const TIERS = [
  {
    id: 'starter',
    name: 'Starter Site',
    emoji: '🚀',
    description: 'Perfect for getting online fast. A beautiful, professional site that makes a great first impression.',
    price: 'From R2,500',
    pages: '1–3 pages',
    turnaround: '5–7 days',
    popular: false,
    features: [
      'Custom design (no templates)',
      'Mobile-first responsive',
      'Contact form',
      'SEO basics',
      'Google Analytics setup',
      '1 round of revisions',
      'Domain setup assistance',
    ],
  },
  {
    id: 'business',
    name: 'Business Site',
    emoji: '💼',
    description: 'A full business website that converts visitors into customers. Designed to represent your brand perfectly.',
    price: 'From R5,500',
    pages: '5–8 pages',
    turnaround: '10–14 days',
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 8 pages',
      'Custom illustrations / graphics',
      'Blog or news section',
      '3 rounds of revisions',
      'Speed optimisation',
      'Social media integration',
      '30-day post-launch support',
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    emoji: '🛒',
    description: 'Sell online with a stunning, secure store. Product pages, checkout, inventory — all beautifully designed.',
    price: 'From R9,000',
    pages: 'Unlimited products',
    turnaround: '2–3 weeks',
    popular: false,
    features: [
      'Everything in Business',
      'Product catalogue & collections',
      'Cart & checkout flow',
      'Payment gateway integration',
      'Inventory management',
      'Order notification system',
      '60-day post-launch support',
      'Staff training session',
    ],
  },
  {
    id: 'webapp',
    name: 'Custom Web App',
    emoji: '⚙️',
    description: 'Need something powerful and unique? I build custom web applications with modern tech stacks.',
    price: 'Quote on enquiry',
    pages: 'Custom scope',
    turnaround: 'Discussed on project',
    popular: false,
    features: [
      'Full-stack development',
      'User authentication & roles',
      'Database design',
      'API development',
      'Admin dashboard',
      'Deployment & hosting setup',
      'Ongoing maintenance available',
      'Worldwide client base',
    ],
  },
]

const TECH_STACK = [
  { name: 'Next.js', category: 'Framework' },
  { name: 'React', category: 'UI Library' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'Supabase', category: 'Database' },
  { name: 'Vercel', category: 'Hosting' },
  { name: 'Figma', category: 'Design' },
  { name: 'Node.js', category: 'Server' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'REST APIs', category: 'Integration' },
  { name: 'Git / GitHub', category: 'Version Control' },
]

const PORTFOLIO = [
  {
    id: '1',
    title: 'BMZtrial1',
    type: 'Business Website',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description: "Building a website for a friend's business. Focused on creating a clean, professional online presence.",
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    projectUrl: 'https://github.com/BYM1127/BMZtrial1',
    color: 'var(--color-webdesign)',
    emoji: '🌸'
  },
  {
    id: '2',
    title: 'DkLC - Catering',
    type: 'Food & Catering',
    tech: ['React', 'CSS', 'Vite'],
    description: 'Dimpho ke Lesego Catering website. Showcasing delicious menus, services, and an easy booking contact system.',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    projectUrl: 'https://github.com/BYM1127/DkLC',
    color: 'var(--color-crochet)',
    emoji: '🍲'
  },
  {
    id: '3',
    title: 'IMELA-PROJECTS',
    type: 'Corporate Website',
    tech: ['Next.js', 'Tailwind', 'TypeScript'],
    description: 'Electrical & Solar Expertise You Can Trust. Fast, reliable installations and maintenance for residential and commercial projects.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
    projectUrl: 'https://github.com/BYM1127/IMELA-PROJECTS',
    color: 'var(--color-photography)',
    emoji: '💡'
  },
  {
    id: '4',
    title: 'Binary Breakout',
    type: 'Educational Game',
    tech: ['JavaScript', 'Canvas', 'Logic'],
    description: 'An interactive, educational browser game designed to help students practice binary logic and conversions.',
    imageUrl: '',
    projectUrl: 'https://binarybreakout.netlify.app/',
    color: 'var(--color-crochet)',
    emoji: '🎮'
  },
  {
    id: '5',
    title: 'BYM Studio',
    type: 'Full-Stack Platform',
    tech: ['Next.js', 'React', 'TypeScript'],
    description: 'A custom-built, full-stack platform managing custom crochet orders, photography bookings, and web design enquiries.',
    imageUrl: '',
    projectUrl: 'https://bym-studio.vercel.app',
    color: 'var(--color-webdesign)',
    emoji: '✨'
  },
  {
    id: '6',
    title: 'Interactive Resume',
    type: 'Portfolio',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    description: 'A modern, interactive portfolio and resume showcasing my skills, experience, and complete technical journey.',
    imageUrl: '',
    projectUrl: '',
    color: 'var(--color-photography)',
    emoji: '👋'
  },
]

const PROCESS = [
  { step: '01', icon: '🔍', title: 'Discovery Call', desc: 'We chat about your goals, brand, target audience, and what you need the site to do for you.' },
  { step: '02', icon: '🎨', title: 'Design', desc: 'I create wireframes and a full visual design in Figma. You approve every detail before a single line of code is written.' },
  { step: '03', icon: '💻', title: 'Development', desc: 'Your approved design is built with clean, fast, modern code. You get progress updates throughout.' },
  { step: '04', icon: '🚀', title: 'Launch', desc: 'I handle deployment, domain setup, and final checks. Your site goes live — and I\'m here if you need anything after.' },
]

const WHY_ME = [
  { icon: <Zap size={20} />, title: 'Fast Delivery', desc: 'No month-long waits. Most projects ship within 2 weeks.' },
  { icon: <Globe size={20} />, title: 'Worldwide Clients', desc: 'I\'ve worked with clients across Africa, Europe, and beyond.' },
  { icon: <Smartphone size={20} />, title: 'Mobile-First', desc: 'Every site I build looks perfect on every screen size.' },
  { icon: <ShieldCheck size={20} />, title: 'Secure & Reliable', desc: 'Best practices for security, performance, and uptime built-in.' },
  { icon: <Star size={20} />, title: 'Premium Quality', desc: 'No templates, no shortcuts — every site is custom built for you.' },
  { icon: <Code size={20} />, title: 'Clean Code', desc: 'Maintainable, well-documented code you can hand to any developer.' },
]

export default function WebDesignPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          paddingTop: '9rem',
          paddingBottom: '5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: -100, left: '10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-webdesign-dim)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.1rem', marginBottom: '1.5rem', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-webdesign)' }}>
            <Monitor size={12} /> Web Design & Development
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}>
            Websites That{' '}
            <span className="text-gradient-web">Wow the World</span>
          </h1>
          <p style={{ lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2.5rem' }}>
            I design and build fast, beautiful, and effective websites for businesses and creators worldwide.
            From simple landing pages to full custom web apps — if you can dream it, I can build it.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/webdesign/enquire" className="btn btn-web btn-lg">
              <Monitor size={18} /> Start a Project
            </Link>
            <a href="#portfolio" className="btn btn-ghost btn-lg">
              View My Work <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title font-serif">Why Choose BYM Studio?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Quality, speed, and results — every single time.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
            {WHY_ME.map((w) => (
              <div key={w.title} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--color-webdesign-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-webdesign)', marginBottom: '0.85rem' }}>
                  {w.icon}
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.35rem', color: 'var(--color-text-primary)' }}>{w.title}</h3>
                <p style={{ fontSize: '0.845rem', lineHeight: 1.6 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-web" style={{ marginBottom: '1rem' }}>Packages & Pricing</span>
            <h2 className="section-title font-serif">Service Tiers</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              All prices in ZAR. International clients quoted in USD/EUR on request.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                style={{
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${tier.popular ? 'rgba(139,92,246,0.5)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-2xl)',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {tier.popular && (
                  <div style={{ background: 'linear-gradient(135deg, var(--color-webdesign), var(--color-webdesign-light))', color: '#fff', textAlign: 'center', padding: '0.45rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    ⭐ Most Popular
                  </div>
                )}
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{tier.emoji}</span>
                    <h3 className="font-serif" style={{ fontSize: '1.3rem', marginTop: '0.35rem' }}>{tier.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>{tier.description}</p>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {[tier.price, tier.pages, tier.turnaround].map((stat) => (
                      <span key={stat} style={{ fontSize: '0.75rem', color: 'var(--color-webdesign)', background: 'var(--color-webdesign-dim)', padding: '0.3rem 0.7rem', borderRadius: 'var(--radius-full)' }}>
                        {stat}
                      </span>
                    ))}
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, marginBottom: '1.5rem' }}>
                    {tier.features.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
                        <Check size={13} style={{ color: 'var(--color-webdesign)', flexShrink: 0, marginTop: '0.1rem' }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/webdesign/enquire?tier=${tier.id}`}
                    className="btn btn-web"
                    style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    Get Started <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }} id="portfolio">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-web" style={{ marginBottom: '1rem' }}>Portfolio</span>
            <h2 className="section-title font-serif">Recent Projects</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A selection of websites and apps I've built for clients.
            </p>
          </div>
          <div className="grid-auto-fill">
            {PORTFOLIO.map((p) => (
              <div key={p.id} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', background: `linear-gradient(135deg, ${p.color}18, rgba(255,255,255,0.02))`, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ fontSize: '3.5rem' }}>{p.emoji}</div>
                  )}
                  {p.projectUrl && (
                    <a href={p.projectUrl} target="_blank" rel="noreferrer" className="project-overlay"
                       style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      <span className="btn btn-web btn-sm">View Live Site</span>
                    </a>
                  )}
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.72rem', color: p.color, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {p.type}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                    {p.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: 'var(--color-text-muted)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title font-serif">My Tech Stack</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Modern, proven technologies that deliver fast and reliable websites.
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {TECH_STACK.map((t) => (
              <div
                key={t.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.85rem 1.25rem',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  minWidth: 90,
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{t.name}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-webdesign)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="section-title font-serif">My Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.5rem' }}>
            {PROCESS.map((p) => (
              <div key={p.step} className="card" style={{ padding: '1.75rem', position: 'relative' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'rgba(139,92,246,0.1)', fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: '-0.5rem' }}>{p.step}</div>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{p.icon}</div>
                <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ padding: '3rem 1.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Ready to Build Something Amazing?
          </h2>
          <p style={{ maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Tell me about your project and I'll send you a free quote within 24 hours.
          </p>
          <Link href="/webdesign/enquire" className="btn btn-web btn-lg">
            <Monitor size={18} /> Start Your Project
          </Link>
        </div>
      </section>

      <style>{`
        .project-overlay:hover {
          opacity: 1 !important;
        }
      `}</style>
    </>
  )
}
