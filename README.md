# BYM Studio

BYM (BokasYarnMarket) Studio is a modern, premium online platform bringing together three distinct creative pillars:
1. **Crochet Studio**: A shop for ready-made items and a comprehensive 6-step interactive design wizard for custom orders.
2. **Photography**: A booking platform for photography sessions, packages, and portfolio gallery.
3. **Web Design**: A portfolio and enquiry system for custom web development services.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Auth:** [Firebase](https://firebase.google.com/) (Firestore, Auth, Storage)
- **Emails:** [Resend](https://resend.com/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BYM1127/BYN.git
   cd BYN
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install / yarn
   ```

3. **Set up Environment Variables:**
   Copy the example file and fill in your Firebase and Resend credentials:
   ```bash
   cp .env.local.example .env.local
   ```
   *Follow the setup instructions inside `.env.local.example` to create your Firebase project.*

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser.**

## Project Structure

- `app/` - Next.js App Router (Pages, Layouts, API routes, Auth middleware)
- `components/` - Shared UI components (Navbar, Footer, Buttons)
- `lib/` - Shared utilities (Firebase init, Auth Context, Firestore helpers)
- `types/` - TypeScript type definitions

## Setting up an Admin User

To access the `/admin` dashboard:
1. Sign up for an account on the site (`/auth/register`).
2. Go to your Firebase Console -> Firestore Database.
3. Open the `users` collection and find your user document (ID matches your Auth UID).
4. Add a string field named `role` with the value `"admin"`.
5. Refresh the site and the Admin dashboard link will appear in the navigation.

---

*Handcrafted with ❤️ by BYM Studio.*
