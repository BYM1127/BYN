// ── Shared types for BYM Studio ──────────────────────────────────────────

export type UserRole = 'user' | 'admin'
export type Pillar = 'crochet' | 'photography' | 'webdesign'

// ── Crochet ──────────────────────────────────────────────────────────────

export type CrochetCategory =
  | 'bags'
  | 'blankets'
  | 'tops'
  | 'accessories'
  | 'home_decor'
  | 'baby'
  | 'custom'

export interface CrochetProduct {
  id: string
  name: string
  description: string
  price: number
  category: CrochetCategory
  imageUrl: string
  images?: string[]
  tags: string[]
  inStock: boolean
  featured: boolean
  createdAt: unknown
}

export type CrochetOrderStatus =
  | 'pending_review'
  | 'quoted'
  | 'accepted'
  | 'deposit_paid'
  | 'in_production'
  | 'ready'
  | 'delivered'
  | 'cancelled'

export interface CrochetOrder {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  type: 'custom' | 'boutique'
  productId?: string
  // Wizard fields
  pieceType?: string
  stitchStyle?: string
  colours?: string[]
  size?: string
  inspirationNote?: string
  inspirationImageUrl?: string
  sketchDataUrl?: string
  customerNotes?: string
  // Status
  status: CrochetOrderStatus
  quotedPrice?: number
  quoteMessage?: string
  depositAmount?: number
  depositPaid?: boolean
  estimatedReadyDate?: string
  productionNotes?: string
  rejectionReason?: string
  createdAt: unknown
  updatedAt: unknown
}

// ── Photography ───────────────────────────────────────────────────────────

export type SessionType =
  | 'portrait'
  | 'family'
  | 'maternity'
  | 'newborn'
  | 'couples'
  | 'event'
  | 'product'
  | 'boudoir'

export interface PhotoPackage {
  id: string
  name: string
  sessionType: SessionType
  durationMinutes: number
  description: string
  includes: string[]
  price: number
  editedPhotos: number
  turnaroundDays: number
  popular?: boolean
  imageUrl: string
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'

export interface PhotoBooking {
  id: string
  bookingNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  packageId: string
  packageName: string
  sessionType: SessionType
  preferredDate: string
  alternativeDate?: string
  location?: string
  addOns: string[]
  specialRequests?: string
  totalPrice: number
  status: BookingStatus
  confirmedDate?: string
  meetingLink?: string
  adminNotes?: string
  createdAt: unknown
  updatedAt: unknown
}

// ── Web Design ────────────────────────────────────────────────────────────

export type ProjectType =
  | 'landing'
  | 'business'
  | 'ecommerce'
  | 'portfolio'
  | 'webapp'
  | 'custom'

export type BudgetRange =
  | 'under_500'
  | '500_1000'
  | '1000_2500'
  | '2500_5000'
  | 'over_5000'

export type EnquiryStatus =
  | 'new'
  | 'reviewing'
  | 'quoted'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'declined'

export interface WebProject {
  id: string
  title: string
  description: string
  projectType: ProjectType
  techStack: string[]
  imageUrl: string
  liveUrl?: string
  featured: boolean
  completedAt?: string
  createdAt: unknown
}

export interface WebEnquiry {
  id: string
  enquiryNumber: string
  customerId?: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  projectType: ProjectType
  budgetRange: BudgetRange
  timelineWeeks?: number
  description: string
  referenceUrls?: string[]
  status: EnquiryStatus
  quotedPrice?: number
  adminNotes?: string
  createdAt: unknown
  updatedAt: unknown
}

// ── Gallery ───────────────────────────────────────────────────────────────

export interface GalleryItem {
  id: string
  title: string
  pillar: Pillar
  imageUrl: string
  description?: string
  tags: string[]
  featured: boolean
  sortOrder: number
  createdAt: unknown
}

// ── Reviews ───────────────────────────────────────────────────────────────

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface Review {
  id: string
  customerId?: string
  customerName: string
  quote: string
  rating: number
  pillar: Pillar
  status: ReviewStatus
  isFeatured: boolean
  adminNotes?: string
  createdAt: unknown
}

// ── Site Settings ─────────────────────────────────────────────────────────

export interface SiteSettings {
  phone?: string
  email?: string
  whatsapp?: string
  instagram?: string
  tiktok?: string
  location?: string
  turnaroundWeeks?: number
  heroTagline?: string
}
