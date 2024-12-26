import React from 'react';

function About() {
  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About CineMate</h1>

      <p className="text-lg mb-4">
        Welcome to CineMate, your go-to platform for discovering movies and TV shows. Explore thousands of titles, check out ratings and reviews, watch trailers, and stay updated on the latest in the entertainment world.
      </p>

      <h2 className="text-3xl font-semibold mt-6">Key Features</h2>
      <ul className="list-disc pl-6 mt-4">
        <li>Comprehensive database of movies, TV shows, and actors</li>
        <li>Ratings, reviews, and personalized recommendations</li>
        <li>Watchlist and tracking features</li>
        <li>Trailers, clips, and more!</li>
        <li>Detailed information on cast, crew, and filming locations</li>
        <li>Trending movies and TV shows, curated based on popularity</li>
        <li>Advanced search and filtering options for easy browsing</li>
      </ul>

      <h2 className="text-3xl font-semibold mt-6">Our Mission</h2>
      <p className="text-lg mt-4">
        Our mission is to provide a user-friendly and comprehensive platform for movie lovers, critics, and casual viewers alike. We aim to create a space where users can explore, share, and discuss their favorite movies and TV shows.
      </p>

      <h2 className="text-3xl font-semibold mt-6">How We Gather Data</h2>
      <p className="text-lg mt-4">
        At [Your Website Name], we rely on trusted sources such as IMDb, Rotten Tomatoes, and other verified databases to provide accurate and up-to-date information about movies and TV shows. Our team continuously updates the site to ensure you have access to the latest content.
      </p>

      <h2 className="text-3xl font-semibold mt-6">Meet the Team</h2>
      <p className="text-lg mt-4">
        [Your Name] – Founder and Creator of Cinemate. A passionate movie enthusiast with a vision to bring the best of entertainment to everyone.
      </p>

      <h2 className="text-3xl font-semibold mt-6">Contact Us</h2>
      <p className="text-lg mt-4">
        For any questions, suggestions, or feedback, feel free to reach out to us at: <a href="mailto:contact@yourwebsite.com" className="text-blue-500">contact@yourwebsite.com</a>
      </p>

      <h2 className="text-3xl font-semibold mt-6">Legal</h2>
      <p className="text-lg mt-4">
        By using [Your Website Name], you agree to our <a href="/terms" className="text-blue-500">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-500">Privacy Policy</a>.
      </p>

      <h2 className="text-3xl font-semibold mt-6">FAQ</h2>
      <ul className="list-disc pl-6 mt-4">
        <li><strong>How often is the content updated?</strong> We update our content regularly, ensuring that the latest movies and TV shows are available.</li>
        <li><strong>Can I submit a review?</strong> Yes, you can submit reviews for movies and TV shows you’ve watched to help others make informed decisions.</li>
        <li><strong>Is there a mobile app?</strong> Currently, we don’t have a dedicated mobile app, but our site is fully responsive and works seamlessly on mobile devices.</li>
      </ul>

      <h2 className="text-3xl font-semibold mt-6">Our History</h2>
      <p className="text-lg mt-4">
        Cinemate was founded in 2024 by Aryan with the goal of making it easier for people to find and discover the movies and TV shows they love. Over the years, we’ve expanded our offerings and continue to strive for the best user experience.
      </p>

      <h2 className="text-3xl font-semibold mt-6">Why Choose Us?</h2>
      <p className="text-lg mt-4">
        Unlike other platforms, we focus on delivering an intuitive experience, focusing on clean design, rich movie information, and advanced filtering options. We also give you personalized recommendations based on your viewing history and ratings.
      </p>
    </section>
  );
}

export default About;
