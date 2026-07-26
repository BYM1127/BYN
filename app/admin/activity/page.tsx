import dbConnect from '@/lib/db'
import ActivityLog from '@/models/ActivityLog'
import { Activity, Clock } from 'lucide-react'

export const revalidate = 0

function getActionColor(action: string) {
  switch (action) {
    case 'LOGIN': return 'var(--color-photography)'
    case 'REGISTER': return 'var(--color-crochet)'
    case 'ORDER': return 'var(--color-gold)'
    case 'WHATSAPP_CONTACT': return '#25D366'
    case 'EMAIL_CONTACT': return 'var(--color-webdesign)'
    default: return 'var(--color-text-secondary)'
  }
}

export default async function ActivityPage() {
  await dbConnect()
  
  // Fetch latest 100 activities, most recent first
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(100).lean()

  return (
    <div style={{ padding: '3rem 2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-xl)', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Activity size={22} color="var(--color-gold)" />
        </div>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.15rem' }}>Activity Log</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Recent interactions across BYM Studio.</p>
        </div>
      </div>

      <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Latest Activity</h2>
        </div>
        
        {logs.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            No activity recorded yet.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Timestamp</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Action</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>User</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log: any) => (
                <tr key={log._id.toString()} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Clock size={14} />
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      background: `${getActionColor(log.action)}20`,
                      color: getActionColor(log.action)
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{log.user}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-secondary)' }}>{log.details || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
