# 🛒 VANTA — E-Commerce Website Documentation

> **Full-stack e-commerce application built with Next.js 16, TypeScript, Tailwind CSS v4, NextAuth.js, and TanStack Query.**

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Technology Stack](#-technology-stack)
3. [Folder Structure](#-folder-structure)
4. [Pages & Routes](#-pages--routes)
5. [Reusable Components](#-reusable-components)
6. [API Layer](#-api-layer)
7. [Authentication System](#-authentication-system)
8. [Middleware (Route Protection)](#-middleware-route-protection)
9. [State Management](#-state-management)
10. [TypeScript Types](#-typescript-types)
11. [Data Flow Diagram](#-data-flow-diagram)
12. [External API Reference](#-external-api-reference)
13. [Environment Variables](#-environment-variables)
14. [Getting Started](#-getting-started)

---

## 🔭 Project Overview

**VANTA** (branded as "Curated Commerce") is a fully functional e-commerce web application that allows users to:

- Browse products with category filtering, price filtering, and search
- View detailed product pages with image galleries
- Register and sign in to their accounts
- Add products to a shopping cart (with quantity management)
- Add/remove products from a wishlist
- Checkout with **Cash on Delivery** or **Online Payment** (Stripe-like gateway)

The app consumes the **Route Academy E-Commerce API** (`ecommerce.routemisr.com`) for all data operations.

---

## 🧰 Technology Stack

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| **Framework**     | Next.js 16.3.4 (App Router)                 |
| **Language**      | TypeScript 5                                |
| **UI/Styling**    | Tailwind CSS v4, Lucide React icons         |
| **Font**          | Google Fonts — Exo (weights: 400, 600, 800) |
| **Auth**          | NextAuth.js v4 (Credentials Provider)       |
| **Data Fetching** | TanStack React Query v5                     |
| **Forms**         | React Hook Form v7                          |
| **Carousel**      | Swiper v14                                  |
| **Animations**    | Motion (Framer Motion) v13, tw-animate-css  |
| **Notifications** | React Toastify v11                          |
| **Loading**       | React Spinners (BeatLoader)                 |
| **UI Components** | Radix UI, shadcn, CVA                       |

---

## 📁 Folder Structure

```
app1/
├── public/                       # Static assets
├── src/
│   ├── assets/images/            # Local images (hero slider)
│   ├── next-auth/
│   │   └── AuthOptions.ts        # NextAuth configuration
│   ├── uitilites/
│   │   └── getTokenFun.ts        # Server-side token extraction
│   ├── proxy.ts                  # Middleware (route protection)
│   └── app/
│       ├── globals.css           # Global styles + Tailwind
│       ├── layout.tsx            # Root layout (Navbar, Footer, Providers)
│       ├── page.tsx              # Home page
│       ├── loading.tsx           # Global loading spinner
│       ├── not-found.tsx         # Custom 404 page
│       ├── (auth)/
│       │   ├── login/page.tsx    # Login page
│       │   └── register/page.tsx # Registration page
│       ├── shop/page.tsx         # Shop page (all products)
│       ├── Categories/
│       │   ├── page.tsx          # All categories
│       │   └── [id]/page.tsx     # Category-specific products
│       ├── brands/page.tsx       # Brands page (placeholder)
│       ├── productDetails/
│       │   └── [id]/page.tsx     # Product detail page
│       ├── cart/page.tsx         # Shopping cart
│       ├── wishlist/
│       │   └── page.tsx          # User wishlist
│       ├── checkout/
│       │   ├── checkoutForm.tsx  # Checkout form component
│       │   └── [CartID]/page.tsx # Checkout page (dynamic)
│       ├── api/
│       │   ├── auth/[...nextauth]/  # NextAuth API route
│       │   └── cart/route.ts        # Cart API proxy route
│       └── _components/          # All reusable components
│           ├── navbar/
│           ├── Footer/
│           ├── Slider/
│           ├── productCarde/
│           ├── FeaturedProduct/
│           ├── CartCoponent/
│           ├── AddBtn/
│           ├── AddWishlistBtn/
│           ├── PriceFilter/
│           ├── ProductSearch/
│           ├── QuantitySelector/
│           ├── MyProvider/
│           ├── TanstackProvider/
│           └── Api/
│               ├── services/
│               │   ├── ProductApi.tsx
│               │   └── Types/
│               │       ├── productType.ts
│               │       ├── CardType.ts
│               │       ├── catogeryApi.tsx
│               │       └── next-auth.d.ts
│               └── actions/
│                   ├── actions.ts
│                   ├── addToCart/
│                   ├── addToWishlist.ts
│                   ├── getWishlist.ts
│                   ├── removeWishlistFun.ts
│                   ├── removeWishlistBtn.tsx
│                   ├── DeletCartFun.ts
│                   ├── UpdateCartFun.ts
│                   ├── DeleteCart.Action.ts
│                   └── Payments/
│                       ├── payCash.Action.ts
│                       └── payOnline.Action.ts
```

---

## 📄 Pages & Routes

### 🏠 Home Page — `/`

| Feature               | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| **Hero Slider**       | Full-width Swiper carousel with 3 hero images (men's fashion)           |
| **Categories**        | Dynamically loaded category grid from API (lazy-loaded via `dynamic()`) |
| **Featured Products** | Grid of all products with ProductCard components                        |

---

### 🔐 Login Page — `/login`

| Feature                  | Description                                       |
| ------------------------ | ------------------------------------------------- |
| **Split Layout**         | Left: Hero image with stats. Right: Login form    |
| **Form Validation**      | Email regex + required fields via React Hook Form |
| **Authentication**       | Uses `signIn("credentials", ...)` from NextAuth   |
| **Password Toggle**      | Show/hide password button                         |
| **Social Login Buttons** | Google & Apple (UI only, not wired)               |
| **Notifications**        | Toast success/error on login result               |

---

### 📝 Register Page — `/register`

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **Registration Form** | Name, email, password, confirm password, phone       |
| **Server Action**     | Calls `userRegister()` which POSTs to the signup API |
| **Validation**        | React Hook Form with field-level validation          |

---

### 🏪 Shop Page — `/shop`

| Feature              | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| **Category Sidebar** | Left sidebar with all categories (links with active state)  |
| **Price Filter**     | Range slider (100–50,000 EGP) with Apply/Reset buttons      |
| **Product Search**   | Real-time client-side search bar filtering by product title |
| **Product Grid**     | Responsive grid (1–4 columns) of ProductCard components     |
| **URL Params**       | `?categoryId=xxx&maxPrice=yyy` for filtered results         |

---

### 🗂️ Categories Page — `/Categories`

| Feature           | Description                                       |
| ----------------- | ------------------------------------------------- |
| **Category Grid** | 6-column grid of circular category images         |
| **Hover Effects** | Grayscale-to-color transition, scale, shadow lift |
| **Links**         | Each card links to `/Categories/[id]`               |

---

### 📦 Category Detail — `/Categories/[id]`

| Feature            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| **Dynamic Route**  | Fetches specific category, renders products via FeaturedProduct |
| **Error Handling** | Shows "Category not found" fallback                             |

---

### 🔍 Product Details — `/productDetails/[id]`

| Feature             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| **Image Gallery**   | Main image + thumbnail slider (Swiper)                  |
| **Product Info**    | Title, brand, category, rating, reviews count           |
| **Pricing**         | Shows original price, discounted price, and % OFF badge |
| **Description**     | Full product description text                           |
| **Finish Selector** | Color/finish option buttons (UI only)                   |
| **Add to Cart**     | Button calling `addToCart` server action                |
| **Add to Wishlist** | Heart button calling `AddToWishlist` server action      |

---

### 🛒 Cart Page — `/cart`

| Feature               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| **Cart Items List**   | Product image, title, brand, category, rating, price  |
| **Quantity Controls** | +/− buttons using `UpdateCartFun` mutation            |
| **Delete Item**       | Trash icon per item using `DeleteCartFun` mutation    |
| **Empty Cart**        | Button to clear entire cart using `DeleteCart` action |
| **Order Summary**     | Sidebar with items count, subtotal, shipping, total   |
| **Checkout Link**     | Navigates to `/checkout/[cartId]`                     |
| **Continue Shopping** | Link back to home page                                |
| **Empty State**       | Shopping bag icon with "Your cart is empty" message   |
| **Error State**       | Alert icon with "Try Again" button                    |
| **Loading State**     | BeatLoader spinner                                    |

---

### ❤️ Wishlist Page — `/wishlist`

| Feature            | Description                                      |
| ------------------ | ------------------------------------------------ |
| **Wishlist Grid**  | 1–4 column responsive grid of wishlist products  |
| **Item Count**     | Displays total number of wishlist items          |
| **Remove Button**  | Heart button to remove item from wishlist        |
| **Add to Cart**    | Button on each card to add to cart               |
| **Discount Badge** | Shows % OFF for discounted products              |
| **Empty State**    | Heart icon with "Your wishlist is empty" message |

---

### 💳 Checkout Page — `/checkout/[CartID]`

| Feature             | Description                                               |
| ------------------- | --------------------------------------------------------- |
| **Shipping Form**   | Details, phone, city, postal code fields                  |
| **Payment Methods** | Cash on Delivery / Online Payment radio buttons           |
| **Order Summary**   | Right panel showing live shipping info + total price      |
| **Form Validation** | Submit button disabled until all fields filled            |
| **Cash Payment**    | Calls `PayCash` server action → redirects to home         |
| **Online Payment**  | Calls `PayOnline` server action → redirects to Stripe URL |
| **Notifications**   | Toast messages for all payment states                     |

---

### 🏷️ Brands Page — `/brands`

| Feature    | Description                                 |
| ---------- | ------------------------------------------- |
| **Status** | Placeholder page (just shows "Brands" text) |

---

### 🚫 404 Page — Not Found

| Feature        | Description                              |
| -------------- | ---------------------------------------- |
| **Icon**       | SearchX icon in circular gray background |
| **Error Code** | "Error 404"                              |
| **Message**    | "Page not found"                         |
| **Action**     | "Back to Shopping" link to home          |

---

## 🧩 Reusable Components

### `Navbar` — `_components/navbar/navbar.tsx`

- **Type:** Client Component (`"use client"`)
- **Features:**
  - Top announcement bar (free shipping, new arrivals, contact info)
  - VANTA logo with "Curated Commerce" subtitle
  - Search bar (rounded, full-width)
  - Navigation links: Home, Shop, Categories (with dropdown), Brands
  - Categories dropdown (fetched via TanStack Query)
  - When authenticated: Wishlist, Cart (with item count badge), Account, Sign Out
  - Cart count badge fetched via `/api/cart` proxy route using TanStack Query

### `Footer` — `_components/Footer/Footer.tsx`

- **Type:** Server Component
- **Status:** Placeholder (renders "Footer" text)

### `Slider` — `_components/Slider/Slider.tsx`

- **Type:** Client Component (`"use client"`)
- **Features:**
  - Swiper-based carousel with Navigation + Pagination modules
  - Custom pagination bullets (white rounded bars)
  - Previous/Next navigation buttons (rounded, blurred background)
  - Configurable `spaceBetween`, `slidesPerView`, and `PageList` props
  - Used on: Home page (hero), Product Details (thumbnail gallery)

### `ProductCard` — `_components/productCarde/productCarde.tsx`

- **Type:** Mixed (Server layout + Client buttons)
- **Features:**
  - Product image with hover scale effect
  - Discount badge (% OFF) when applicable
  - Wishlist heart button (WishListBtn)
  - Category name, title, star rating
  - Price display (with/without discount strikethrough)
  - Add to cart button (AddBtn with `+` icon)

### `FeaturedProduct` — `_components/FeaturedProduct/FeaturedProduct.tsx`

- **Type:** Server Component
- **Features:**
  - Fetches all products or category-specific products
  - Optional price filtering
  - "No products found" empty state
  - Renders ProductCard grid (1–4 columns)
  - Dynamic header text based on context

### `CartComponent` — `_components/CartCoponent/CartCoponent.tsx`

- **Type:** Client Component (`"use client"`)
- **Features:**
  - Fetches cart data via TanStack Query (`/api/cart`)
  - Loading, error, empty, and populated states
  - Quantity update/delete mutations via `useMutation`
  - Order summary sidebar with checkout link
  - Cache invalidation on every mutation success

### `AddBtn` — `_components/AddBtn/AddBtn.tsx`

- **Type:** Client Component (`"use client"`)
- **Props:** `prodId`, `cls` (Tailwind classes), `child` (ReactNode icon)
- **Behavior:** Calls `addToCart()` server action → shows toast → invalidates cart query

### `WishListBtn` — `_components/AddWishlistBtn/AddWishlistBtn.tsx`

- **Type:** Client Component (`"use client"`)
- **Props:** `prodId`, `className`
- **Behavior:** Calls `AddToWishlist()` server action → shows toast

### `RemoveWishlistBtn` — `_components/Api/actions/removeWishlistBtn.tsx`

- **Type:** Client Component (`"use client"`)
- **Props:** `prodId`
- **Behavior:** Calls `removeWishlistFun()` → toast → `router.refresh()`

### `ProductSearch` — `_components/ProductSearch/ProductSearch.tsx`

- **Type:** Client Component (`"use client"`)
- **Features:**
  - Search input with real-time filtering (`useMemo`)
  - Product count display
  - "No products found" empty state with clear button
  - Renders filtered ProductCard grid

### `PriceFilter` — `_components/PriceFilter/PriceFilter.jsx`

- **Type:** Client Component (`"use client"`)
- **Features:**
  - Range slider (100–50,000 EGP)
  - Apply/Reset filter buttons
  - Updates URL search params via `useRouter`

### `MyProvider` — `_components/MyProvider/MyProvider.tsx`

- **Type:** Client Component
- **Purpose:** Wraps the app with NextAuth's `SessionProvider`

### `TanstackProvider` — `_components/TanstackProvider/TanstackProvider.tsx`

- **Type:** Client Component
- **Purpose:** Wraps the app with TanStack Query's `QueryClientProvider`
- **Config:** `staleTime: 60,000ms` (1 minute)

---

## 🔌 API Layer

### Services (Data Fetching Functions)

| Function                    | File              | Method | Description                         |
| --------------------------- | ----------------- | ------ | ----------------------------------- |
| `getAllCards()`             | `ProductApi.tsx`  | GET    | Fetch all products                  |
| `getProductDetails(id)`     | `ProductApi.tsx`  | GET    | Fetch single product by ID          |
| `getProductsByCategory(id)` | `ProductApi.tsx`  | GET    | Fetch products filtered by category |
| `getShopCategories()`       | `catogeryApi.tsx` | GET    | Fetch all categories                |
| `getSpecificCategory(id)`   | `catogeryApi.tsx` | GET    | Fetch single category by ID         |

### Server Actions (`'use server'`)

| Function                         | File                           | Method | Auth | Description                    |
| -------------------------------- | ------------------------------ | ------ | ---- | ------------------------------ |
| `userRegister()`                 | `actions.ts`                   | POST   | ❌   | Register new user account      |
| `addToCart(prodId)`              | `addToCart/addToCart.ts`       | POST   | ✅   | Add product to cart            |
| `AddToWishlist(prodId)`          | `addToWishlist.ts`             | POST   | ✅   | Add product to wishlist        |
| `GetWishlist()`                  | `getWishlist.ts`               | GET    | ✅   | Get all wishlist items         |
| `removeWishlistFun(prodId)`      | `removeWishlistFun.ts`         | DELETE | ✅   | Remove product from wishlist   |
| `DeleteCartFun(prodId)`          | `DeletCartFun.ts`              | DELETE | ✅   | Delete specific item from cart |
| `UpdateCartFun({prodId, count})` | `UpdateCartFun.ts`             | PUT    | ✅   | Update item quantity in cart   |
| `DeleteCart()`                   | `DeleteCart.Action.ts`         | DELETE | ✅   | Clear entire cart              |
| `PayCash(cartId, data)`          | `Payments/payCash.Action.ts`   | POST   | ✅   | Place Cash on Delivery order   |
| `PayOnline(cartId, data)`        | `Payments/payOnline.Action.ts` | POST   | ✅   | Create Stripe checkout session |

### API Routes (Next.js Route Handlers)

| Route                     | Method | Description                                |
| ------------------------- | ------ | ------------------------------------------ |
| `/api/auth/[...nextauth]` | \*     | NextAuth.js authentication endpoints       |
| `/api/cart`               | GET    | Proxy to external cart API (authenticated) |

---

## 🔐 Authentication System

### Provider: NextAuth.js v4 (Credentials Provider)

```
Flow:
User submits email/password
  → NextAuth signIn("credentials", {...})
  → authorize() calls external API: POST /api/v1/auth/signin
  → Receives JWT token from API
  → Decodes JWT to extract user ID
  → Returns { id, name, email, token }
  → Token stored in NextAuth JWT session
  → Session available via useSession() hook
```

### Key Files

| File                              | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `src/next-auth/AuthOptions.ts`    | NextAuth configuration with Credentials provider |
| `src/uitilites/getTokenFun.ts`    | Server-side token extraction from session cookie |
| `src/app/api/auth/[...nextauth]/` | NextAuth API route handler                       |

### Token Flow

1. User logs in → external API returns a JWT token
2. Token is decoded via `jwt-decode` to extract the user `id`
3. Token is stored in the NextAuth JWT cookie (`next-auth.session-token`)
4. Server actions extract the token via `getTokenFun()`:
   - Reads the `next-auth.session-token` cookie
   - Decodes it using `next-auth/jwt` `decode()` with `NEXTAUTH_SECRET`
   - Returns the raw API token for authenticated requests

### Callbacks

- **`jwt` callback:** Injects `id` and `token` into the JWT payload
- **`session` callback:** Exposes `user.id` in the client session
- **Custom sign-in page:** Redirects to `/login`

---

## 🛡️ Middleware (Route Protection)

**File:** `src/proxy.ts`

| Condition                                           | Action                                |
| --------------------------------------------------- | ------------------------------------- |
| Not authenticated + visiting `/cart` or `/wishlist` | Redirect → `/login`                   |
| Authenticated + visiting `/login` or `/register`    | Redirect → `/` (home)                 |
| Otherwise                                           | Allow through (`NextResponse.next()`) |

**Matcher:** `/cart/:path*`, `/wishlist/:path*`, `/login/:path*`, `/register/:path*`

---

## 📊 State Management

| Layer            | Technology              | Usage                                      |
| ---------------- | ----------------------- | ------------------------------------------ |
| **Server State** | TanStack React Query    | Cart data, categories (cached 60s)         |
| **Auth State**   | NextAuth `useSession()` | User session, auth status                  |
| **Form State**   | React Hook Form         | Login, register, checkout forms            |
| **URL State**    | Next.js `searchParams`  | Category filter, price filter              |
| **Local State**  | `useState`              | Search term, price slider, password toggle |

### TanStack Query Keys

| Key              | Where Used                              | Description                |
| ---------------- | --------------------------------------- | -------------------------- |
| `['getcart']`    | Navbar, CartComponent, AddBtn, Checkout | Cart data & item count     |
| `['categories']` | Navbar                                  | Category list for dropdown |

---

## 📐 TypeScript Types

### `ProductType`

```typescript
{
  _id: string; title: string; slug: string; description: string;
  price: number; priceAfterDiscount?: number; quantity: number;
  sold: number; imageCover: string; images: string[];
  category: Category; brand: Brand; subcategory: Subcategory[];
  ratingsAverage: number; ratingsQuantity: number;
  availableColors?: any[]; createdAt: string; updatedAt: string;
}
```

### `CardResponseType` (Cart)

```typescript
{
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: {
      count: number;
      _id: string;
      product: Product2;
      price: number;
    }
    [];
    totalCartPrice: number;
    createdAt: string;
    updatedAt: string;
  }
}
```

### `Category`

```typescript
{
  _id: string;
  name: string;
  slug: string;
  image: string;
}
```

### `Brand`

```typescript
{
  _id: string;
  name: string;
  slug: string;
  image: string;
}
```

### `UserData`

```typescript
{ name: string; email: string; password: string; rePassword?: string; phone?: string; }
```

### `CheckoutFormData`

```typescript
{
  details: string;
  phone: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
}
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                   │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │  Navbar   │  │  Pages   │  │  TanStack Query   │  │
│  │useSession │  │          │  │  getcart           │  │
│  │useQuery   │  │          │  │  categories        │  │
│  └─────┬─────┘  └────┬─────┘  └────────┬──────────┘  │
│        │              │                 │             │
└────────┼──────────────┼─────────────────┼─────────────┘
         │              │                 │
    ┌────▼──────────────▼─────────────────▼────────┐
    │              NEXT.JS SERVER                    │
    │                                                │
    │  ┌─────────────┐  ┌───────────────────────┐   │
    │  │ API Routes   │  │   Server Actions      │   │
    │  │ /api/cart    │  │   addToCart            │   │
    │  │ /api/auth    │  │   AddToWishlist        │   │
    │  └──────┬───────┘  │   PayCash / PayOnline  │   │
    │         │          └───────────┬───────────┘   │
    │         │                     │                │
    │  ┌──────▼─────────────────────▼────────────┐   │
    │  │         getTokenFun() → Cookie          │   │
    │  └──────────────────┬──────────────────────┘   │
    └─────────────────────┼──────────────────────────┘
                          │
        ┌─────────────────▼─────────────────┐
        │     EXTERNAL API                    │
        │  ecommerce.routemisr.com           │
        │                                     │
        │  /products  /categories  /cart       │
        │  /wishlist  /orders  /auth           │
        └─────────────────────────────────────┘
```

---

## 🌐 External API Reference

**Base URL:** `https://ecommerce.routemisr.com/api/v1`

| Endpoint                                    | Method | Auth | Description                   |
| ------------------------------------------- | ------ | ---- | ----------------------------- |
| `/auth/signup`                              | POST   | ❌   | Register user                 |
| `/auth/signin`                              | POST   | ❌   | Login user                    |
| `/products`                                 | GET    | ❌   | Get all products              |
| `/products/:id`                             | GET    | ❌   | Get product details           |
| `/products?category=:id`                    | GET    | ❌   | Get products by category      |
| `/categories`                               | GET    | ❌   | Get all categories            |
| `/categories/:id`                           | GET    | ❌   | Get specific category         |
| `/cart` (v2)                                | GET    | ✅   | Get user cart                 |
| `/cart` (v2)                                | POST   | ✅   | Add to cart                   |
| `/cart/:productId`                          | PUT    | ✅   | Update cart item qty          |
| `/cart/:productId`                          | DELETE | ✅   | Remove cart item              |
| `/cart`                                     | DELETE | ✅   | Clear cart                    |
| `/wishlist`                                 | GET    | ✅   | Get wishlist                  |
| `/wishlist`                                 | POST   | ✅   | Add to wishlist               |
| `/wishlist/:productId`                      | DELETE | ✅   | Remove from wishlist          |
| `/orders/:cartId`                           | POST   | ✅   | Create cash order             |
| `/orders/checkout-session/:cartId?url=:url` | POST   | ✅   | Create online payment session |

> **Auth Header:** `token: <jwt_token>` (custom header, not Bearer)

---

## 🔐 Environment Variables

| Variable          | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `NEXTAUTH_SECRET` | Secret key for NextAuth JWT encryption                 |
| `NEXTAUTH_URL`    | Base URL of the app (used for online payment redirect) |

---

## 🚀 Getting Started

```bash
# 1. Navigate to the project
cd app1

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create .env file with NEXTAUTH_SECRET and NEXTAUTH_URL

# 4. Run development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

### Available Scripts

| Script  | Command      | Description              |
| ------- | ------------ | ------------------------ |
| `dev`   | `next dev`   | Start development server |
| `build` | `next build` | Build for production     |
| `start` | `next start` | Start production server  |
| `lint`  | `eslint`     | Run ESLint               |

---

## 📝 Design Notes

- **Color Scheme:** Minimalist black & white with warm neutrals (`#faf9f7`, `#f9f8f6`)
- **Typography:** Exo font family with serif accents for luxury branding
- **Design Language:** Clean, editorial, luxury e-commerce aesthetic
- **Responsive:** Mobile-first with breakpoints at `sm`, `md`, `lg`, `xl`
- **Currency:** Egyptian Pound (EGP)

---

> 📅 _Documentation generated on October 13, 2026_
