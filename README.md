# Next.js & Payload CMS Marketing Website Template

This template provides a solid foundation for building modern, CMS-driven marketing websites for small to medium-sized businesses. It leverages the power of Next.js for the frontend, Payload CMS for flexible content management, and Tailwind CSS for styling.

**Key Technologies:**
*   Next.js (App Router)
*   Payload CMS (v3)
*   Tailwind CSS
*   Shadcn/UI (for some UI components)
*   Docker & PostgreSQL (for local development)
*   Vercel Database & Vercel Blob Storage (ready for production on Vercel)

## Key Features

*   **CMS-Driven Content:** Easily manage website content through the intuitive Payload CMS admin panel.
*   **Responsive Design:** Ensures a great user experience across desktops, tablets, and mobile devices.
*   **Customizable Homepage:**
    *   Hero section (headline, subheadline, CTA)
    *   Introduction section (title, rich text content)
    *   Featured blog posts section
*   **Blog Functionality:** Create, manage, and categorize blog posts.
*   **Dynamic Pages:** Build custom pages like "About Us", "Services", or "Contact Us".
*   **SEO Friendly:**
    *   Metadata generation for pages and posts.
    *   SEO plugin integration with Payload CMS.
*   **Theme Customization:** Easily adapt colors, fonts, and more.
*   **Dark Mode Support:** Built-in dark mode toggle and theme.
*   **Vercel Ready:** Optimized for deployment on Vercel with integrated database and blob storage solutions.

## Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   pnpm (or npm/yarn if you prefer, but commands below use pnpm)
*   Docker (for running the local PostgreSQL database)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Set Up Environment Variables
*   Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
*   **Generate Secrets:**
    Open your `.env` file. You need to generate values for `PAYLOAD_SECRET` and `PREVIEW_SECRET`. You can use the following command in your terminal for each:
    ```bash
    openssl rand -base64 32
    ```
    Paste the generated strings into your `.env` file.
*   **Database URI (Local Development):**
    The `.env.example` file provides a `DATABASE_URI` for the local Docker setup:
    `DATABASE_URI="postgresql://postgres:testing@127.0.0.1:5432/dgtemplate"`
    Ensure the password (`testing` in this example) matches what you use when running the Docker container.

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Start the Local PostgreSQL Database (Docker)
If you don't have a PostgreSQL instance running, you can use the provided Docker command.
*   **Run the Docker container:**
    ```bash
    docker run --name dg-template-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=testing -e POSTGRES_DB=dgtemplate -p 5432:5432 -d postgres
    ```
    *   `--name dg-template-postgres`: Assigns a name to the container.
    *   `-e POSTGRES_USER=postgres`: Sets the PostgreSQL username.
    *   `-e POSTGRES_PASSWORD=testing`: Sets the PostgreSQL password (ensure this matches `DATABASE_URI`).
    *   `-e POSTGRES_DB=dgtemplate`: Creates a database named `dgtemplate`.
    *   `-p 5432:5432`: Maps port 5432 on your host to port 5432 in the container.
    *   `-d postgres`: Runs the latest PostgreSQL image in detached mode.

    If you choose a different password, username, or database name, update your `DATABASE_URI` in the `.env` file accordingly.

### 5. Run the Development Server
```bash
pnpm dev
```
*   The website frontend will typically be available at `http://localhost:3000`.
*   The Payload CMS admin panel will be available at `http://localhost:3000/admin`.

### 6. Access Payload Admin Panel
*   Navigate to `http://localhost:3000/admin`.
*   The first time you access it (or after clearing the database), you might be prompted to create an initial admin user.
*   **Default Admin User (Development):** If `process.env.NODE_ENV` is set to `development` (which it is by default with `pnpm dev`), the system may attempt to auto-login with:
    *   Email: `iam@email.com`
    *   Password: `Testing123!`
    (This is configured in `payload.config.ts` under `admin.autoLogin`.)

## Content Management (Payload CMS)

All website content can be managed through the Payload CMS admin panel.

### Homepage
The content for your homepage is managed via a "Global" called **Homepage**.
*   Navigate to **Globals > Homepage** in the admin panel.
*   You can edit the following sections:
    *   **Hero Section:** Update the `headline`, `subheadline`, `CTA Button Label`, and `CTA Button Link`.
    *   **Introduction Section:** Set the `title` and use the rich text editor for the main `content`.
    *   **Featured Posts Section:** Provide a `title for Featured Posts Section` and select which blog posts to highlight.

### Pages (e.g., About Us, Services, Contact)
You can create custom pages (like "About Us", "Services", etc.) using the **Pages** collection.
*   Navigate to **Collections > Pages**.
*   Click "Create New".
*   **Title:** The main title for your page.
*   **Slug:** The URL path for your page (e.g., `about-us` will result in `/about-us`).
*   **Content:** Use the rich text editor to add your page content. This can include text, images, videos, and custom blocks like "Call to Action" or "Media Block".
*   **SEO:** Configure SEO settings (meta title, description, image) under the "SEO" group.

#### Creating a Contact Page
1.  **Navigate to Pages:** In the Payload CMS admin panel, go to the "Pages" collection.
2.  **Create New Page:** Click on "Create New".
    *   Set the **Title** to something like "Contact Us" or "Get in Touch".
    *   Set the **Slug** to `contact`. This will make the page accessible at `/contact` on your website.
3.  **Add Contact Information:** In the "Content" field (which is a rich text editor):
    *   You can type your email address, phone number, physical address, and any other relevant contact details.
    *   Use the editor's formatting options (bold, lists, links) as needed to present the information clearly.
    *   For example, to make an email address clickable, select the email text and use the link icon in the editor toolbar to add a `mailto:` link (e.g., `mailto:yourname@example.com`).
4.  **Save and Publish:** Save your changes and publish the page.

### Blog Posts
Manage your blog content via the **Posts** collection.
*   Navigate to **Collections > Posts**.
*   Click "Create New".
*   **Title:** The title of your blog post.
*   **Slug:** The URL path for the post.
*   **Content:** Write your blog post content using the rich text editor.
*   **Categories:** Assign categories to your posts.
*   **Author(s):** Assign authors.
*   **SEO:** Configure SEO settings.

### Site Navigation
The main website navigation (typically in the header) is managed via the **Links** global.
*   Navigate to **Globals > Links**.
*   Under the `navLinks` field, you can add, remove, or reorder navigation items.
*   Each link can be:
    *   **Custom URL:** Manually enter an internal path (e.g., `/about-us`) or an external URL (e.g., `https://example.com`).
    *   **Page:** Link directly to a page created in the "Pages" collection. The system will use the page's slug for the URL.
    *   **Label:** The text that will be displayed for the link in the navigation.

#### Adding the Contact Page to Navigation
1.  **Navigate to Globals:** In the Payload CMS admin panel, find the "Globals" section in the sidebar.
2.  **Edit Links:** Click on "Links".
3.  **Add New Link:**
    *   In the `navLinks` field, click "Add Row".
    *   **Label:** Enter "Contact".
    *   **Type:** Select "Custom URL".
    *   **URL:** Enter `/contact`.
4.  **Save Changes:** Save the changes to the Links global. Your contact page should now appear in the site navigation.

### Social Media Links
Manage the social media icons and links (typically in the footer) via the **SocialMediaLinks** global.
*   Navigate to **Globals > SocialMediaLinks**.
*   You can add, remove, or reorder social media links.
*   For each link:
    *   **Type:** Select the social media platform (e.g., Facebook, Twitter, LinkedIn). The correct icon will be displayed automatically.
    *   **URL:** Enter the full URL to your social media profile page.

## Theme Customization

This project uses Tailwind CSS for styling and provides several ways to customize the look and feel to match your brand.

### 1. Changing Colors

The primary method for changing colors is by modifying the CSS custom properties (variables) defined in `app/(frontend)/globals.css`.

*   **Open the file:** `app/(frontend)/globals.css`
*   **Locate the `:root` section:** This section defines colors for the default (light) theme.
*   **Locate the `[data-theme="dark"]` section:** This section defines colors for the dark theme.

**Key Color Variables to Modify:**

*   **Brand Colors:**
    *   `--primary`: The main brand color (e.g., for buttons, links, highlights).
    *   `--primary-foreground`: Text color used on top of `--primary` backgrounds.
    *   `--secondary`: A secondary brand color.
    *   `--secondary-foreground`: Text color used on top of `--secondary` backgrounds.
*   **Background and Text:**
    *   `--background`: The main page background color.
    *   `--foreground`: The default text color.
    *   `--muted`: A subtle background color (e.g., for cards, sections).
    *   `--muted-foreground`: Text color for muted elements or secondary text.
*   **Card and Popover:**
    *   `--card`: Background color for card elements.
    *   `--card-foreground`: Text color for card elements.
*   **Borders and Rings:**
    *   `--border`: Default border color.
    *   `--ring`: Color for focus rings (accessibility).

**Example: Changing Primary Color**

To change the primary color to a shade of blue:

```css
/* In :root */
--primary: hsl(210, 90%, 50%); /* A nice blue */
--primary-foreground: hsl(0, 0%, 100%); /* White text on blue */

/* In [data-theme="dark"] (adjust for dark mode) */
--primary: hsl(210, 80%, 60%); /* A lighter blue for dark mode */
--primary-foreground: hsl(210, 25%, 15%); /* Dark text on light blue */
```

Remember to adjust both light and dark theme versions for consistency. You can use HSL, RGB, or hex color values.

### 2. Changing Fonts

Font families are also defined as CSS custom properties in `app/(frontend)/globals.css` within the `@theme inline` block. The actual font loading (e.g., `@import` in CSS or font components in `app/(frontend)/layout.tsx`) determines which fonts are available.

*   **Open the file:** `app/(frontend)/globals.css`
*   **Locate the `@theme inline` section:**
    *   `--font-sans`: Defines the sans-serif font stack.
    *   `--font-serif`: Defines the serif font stack (if used).

**To change the default sans-serif font:**

1.  **Ensure the font is loaded:**
    *   If using a Google Font, update the font import link in your main layout file (likely `app/(frontend)/layout.tsx`).
    *   If using local font files, ensure you have the `@font-face` rules set up, typically in `app/(frontend)/globals.css`.
2.  **Update the CSS variable:**
    Modify `--font-sans` in `app/(frontend)/globals.css`:
    ```css
    @theme inline {
        --font-sans: "Your New Sans Font", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        /* ... other variables */
    }
    ```
    Replace `"Your New Sans Font"` with the actual name of the font you've loaded.

### 3. Adjusting Border Radius

The global border radius is controlled by the `--radius` variable in `app/(frontend)/globals.css`.

*   **Open the file:** `app/(frontend)/globals.css`
*   **Modify `--radius`:**
    ```css
    :root {
        --radius: 0.75rem; /* Example: increase from 0.5rem */
        /* ... other variables */
    }
    ```
    Other radius variables (`--radius-sm`, `--radius-md`, etc.) are derived from this, so changing `--radius` will proportionally affect all rounded corners.

### 4. Tailwind Configuration (Advanced)

If you need to make more advanced Tailwind CSS customizations (e.g., adding custom spacing, breakpoints, or deeply modifying the theme beyond colors/fonts/radius defined in `globals.css`), you would typically edit a `tailwind.config.js` (or `tailwind.config.ts`) file.

**This file was not found in the project during the last review.** If you wish to use it, create `tailwind.config.js` at the root of your project. A typical minimal configuration looks like this:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'], // Matches globals.css
  theme: {
    extend: {
      // Add your custom Tailwind theme extensions here
      // e.g., colors, fontFamily, spacing, borderRadius
      // These will MERGE with Tailwind's defaults.
      // Example:
      // colors: {
      //   'brand-custom': '#FF00FF',
      // },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add other Tailwind plugins here
  ],
}
```
**Note on Customization Priority:** The current setup heavily relies on CSS variables in `globals.css` for primary theming.

## Important Manual Fixes Required

Due to limitations with the automated tools used during parts of this project's setup, a manual fix is required for optimal display of blog post content.

*   **File to Edit:** `app/(frontend)/(web)/blog/[slug]/page.tsx`
*   **Issue:** The RichText content for blog posts is not currently styled with Tailwind's typography plugin (`prose` classes).
*   **Recommended Fix:**
    Locate the component that renders the blog post's main content (likely a `<RichText />` component or a `div` wrapping it). Add the following Tailwind classes to that wrapping element:
    ```
    className="prose dark:prose-invert max-w-prose mx-auto py-8"
    ```
    For example, if your code looks like:
    ```jsx
    <div> {/* Or some other wrapper */}
      <RichText content={post.content} />
    </div>
    ```
    Change it to:
    ```jsx
    <div className="prose dark:prose-invert max-w-prose mx-auto py-8">
      <RichText content={post.content} />
    </div>
    ```
    This will ensure your blog posts have consistent and readable typography.

## Deployment

This template is optimized for deployment on **Vercel**, as it utilizes:
*   Vercel Postgres for the database in production (`@payloadcms/db-vercel-postgres`).
*   Vercel Blob for media storage in production (`@payloadcms/storage-vercel-blob`).

**General Vercel Deployment Steps:**

1.  **Push to Git:** Ensure your project is pushed to a Git repository (GitHub, GitLab, Bitbucket).
2.  **Import Project on Vercel:** Log in to your Vercel account and import the Git repository.
3.  **Configure Environment Variables:**
    *   In your Vercel project settings, add all the environment variables from your `.env` file. This includes `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `DATABASE_URI` (for Vercel Postgres), `BLOB_READ_WRITE_TOKEN` (for Vercel Blob), etc.
    *   Vercel will provide connection strings for its Postgres and Blob services when you set them up.
4.  **Set Up Vercel Postgres & Blob:**
    *   Add Vercel Postgres integration to your project and connect it.
    *   Add Vercel Blob integration to your project and connect it.
5.  **Build Command:** Vercel usually auto-detects Next.js projects. The build command is typically `pnpm build` (or `next build`).
6.  **Output Directory:** This is usually `.next` for Next.js projects.
7.  **Deploy!**

Refer to the official Vercel and Payload CMS documentation for the most up-to-date and detailed deployment instructions.

---
*Previous content from README regarding specific secret generation and Docker commands has been integrated into the "Getting Started" section.*
