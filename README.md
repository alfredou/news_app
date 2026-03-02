# PCInfo News

PCInfo News is a high-performance, modern news application designed to deliver the latest technological insights with a premium user experience. Built with **Next.js 14**, it leverages server-side rendering and static generation for optimal speed and SEO.

## 🚀 Technologies Used

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and [PostCSS](https://postcss.org/).
- **Data Fetching & Backend**:
  - [GraphQL](https://graphql.org/) via `graphql-request` for efficient data querying.
  - [Hygraph (formerly GraphCMS)](https://hygraph.com/) as the Headless CMS.
- **Email Service**: [EmailJS](https://www.emailjs.com/) for newsletter subscriptions.
- **Utilities**:
  - `date-fns` for date formatting.
  - `html-react-parser` for rendering rich text content from the CMS.
  - `axios` for API requests.
- **Testing**:
  - [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and integration tests.

## 📁 Project Structure

- `app/`: Contains the application routes, including the main landing page, category-specific pages, and individual post details.
- `components/`: Modular UI components such as `Navbar`, `Footer`, `PostCard`, `CategorySection`, and `Newsletter`.
- `services/`: API interaction logic and GraphQL queries.
- `public/`: Static assets like icons and images.
- `types.d.ts`: Global TypeScript definitions for robust type safety.

## ✨ Key Features

- **Dynamic Routing**: Automatic page generation for categories and news articles using Next.js App Router.
- **Seamless Performance**: Optimized image loading and minimal client-side JavaScript.
- **Interactive Comments**: Users can leave replies and comments on specific posts.
- **Newsletter Subscription**: Direct integration with EmailJS to capture and manage subscriptions.
- **Responsive Design**: Mobile-first approach ensuring a premium experience on all devices.

## ⚠️ Limitations

- **API Limits**: The application relies on Hygraph's free tier, which may have rate limits and storage constraints for high-traffic scenarios.
- **Client-Side Storage**: User preferences (like name/email for comments) are stored in `localStorage`, which is specific to the browser and device.
- **Static Revalidation**: Some data is cached for 20 seconds (`next: {revalidate: 20}`) meaning updates in the CMS might not be instantaneous for users.
- **Interactive State**: Currently, some UI states like search functionality and theme switching are prepared but might require further backend integration for persistence.

---

*This project was developed with a focus on code quality, performance, and modern web standards.*
