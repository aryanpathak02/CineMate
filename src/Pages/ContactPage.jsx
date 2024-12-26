import React, { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // For showing success/error message

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill out all required fields.");
      return;
    }

    // Add your form submission logic here (e.g., API call)
    // For now, we'll just simulate success
    setStatus("Thank you for reaching out! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-us-container max-w-xl mx-auto p-4 mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-semibold">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-lg font-semibold">Subject (Optional)</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-semibold">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded-md"
            required
          ></textarea>
        </div>

        {status && <p className="text-center text-lg font-semibold">{status}</p>}

        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
