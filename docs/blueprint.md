# **App Name**: StreamHub Leads

## Core Features:

- Multi-Language Support: Offers content in multiple languages (en, fr, pt, es, ja, nl, de) using URL-based routing and locale detection.
- No-JS Checkout Form Submission: A checkout form (lead capture) that works reliably even with JavaScript disabled, submitting data via standard POST requests.
- Google Sheets Integration: Automatically append checkout form submissions as new rows to a specified Google Sheets document, capturing all required fields and UTM parameters.
- Automatic Sitemap & Robots.txt Generation: Dynamically generate a sitemap.xml and robots.txt, including all locale-specific routes and SEO-friendly configurations.
- Dynamic FAQ Content: Generative AI is used as a tool to create relevant and helpful responses, for questions that do not already exist in the FAQ, improving user understanding of the application.
- Contact form with Spam Prevention: Fully functional contact form to handle any feedback/comments from the user, featuring both honeypot and rate-limiting to protect the inbox from bots or malicious users.
- Dynamic metadata and open graph data generation: Every time a page is loaded, open graph meta-data (including titles and descriptions) are programmatically populated with up-to-date information from the relevant locale.

## Style Guidelines:

- Primary color: A vibrant purple (#9D4EDD) to represent innovation and streaming content.
- Background color: A very light purple (#F5EEFF) to ensure legibility.
- Accent color: A deep blue-violet (#4361EE), for call-to-action elements, offering a clear visual distinction.
- Body and headline font: 'Inter', a sans-serif font that ensures modern, readable text and UI.
- Use clean, minimalist icons that correspond to content sections and actions; these will look good on multiple screen sizes.
- Implement a responsive grid layout that adapts to different screen sizes, maintaining content clarity and usability across devices.
- Use subtle transitions for page loads and form submissions, with no animations on key interactive UI elements, maintaining performance across devices.