import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'mezbah.sc@gmail.com',
      link: 'mailto:mezbah.sc@gmail.com',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'View Profile',
      link: 'https://linkedin.com',
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'View Repository',
      link: 'https://github.com',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/contact/send', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark">
      {/* Hero Section */}
      <section
        className="py-20 bg-gradient-to-br from-secondary to-accent text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 400\"><defs><pattern id=\"grid\" width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\"><path d=\"M 40 0 L 0 0 0 40\" fill=\"none\" stroke=\"rgba(255,255,255,.1)\" stroke-width=\"1\"/></pattern></defs><rect width=\"1200\" height=\"400\" fill=\"url(%23grid)\" /></svg>')",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 animate-slideInDown">
            Let&apos;s Work Together
          </h1>
          <p className="text-lg opacity-90 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Have a project in mind? Get in touch and let&apos;s create something amazing together
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-dark">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-primary border border-secondary rounded-xl p-8 text-center shadow transition-transform transform hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{info.title}</h3>
                <p className="text-secondary text-opacity-70 mb-2">{info.value}</p>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section & FAQ */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-dark border border-secondary p-10 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">Send Me a Message</h2>
              <p className="text-primary text-opacity-70 text-sm">
                Fill in the form below and I&apos;ll get back to you as soon as possible
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-secondary mb-1" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-primary bg-opacity-50 text-white placeholder-primary placeholder-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-secondary mb-1" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-primary bg-opacity-50 text-white placeholder-primary placeholder-opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-secondary mb-1" htmlFor="subject">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-primary bg-opacity-50 text-white placeholder-primary placeholder-opacity-50"
                />
              </div>
              <div className="relative">
                <label className="block text-secondary mb-1" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  rows="6"
                  required
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary bg-primary bg-opacity-50 text-white placeholder-primary placeholder-opacity-50 resize-vertical"
                ></textarea>
                <span className="absolute right-3 bottom-3 text-xs text-primary text-opacity-70">
                  {formData.message.length}/1000
                </span>
              </div>
              {error && <p className="text-accent bg-accent bg-opacity-20 p-3 rounded">❌ {error}</p>}
              {submitted && <p className="text-secondary bg-secondary bg-opacity-20 p-3 rounded">✅ Message sent successfully! I&apos;ll get back to you soon.</p>}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-secondary to-accent text-white px-6 py-3 rounded-md hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading || submitted}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : submitted ? (
                  '✅ Message Sent'
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-dark border border-secondary p-10 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-secondary">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-primary bg-opacity-30 border border-secondary rounded-lg hover:bg-opacity-50 transition">
                <h4 className="font-semibold mb-1 text-secondary">How quickly will you respond?</h4>
                <p className="text-primary text-opacity-70">I typically respond to inquiries within 24-48 hours.</p>
              </div>
              <div className="p-4 bg-primary bg-opacity-30 border border-secondary rounded-lg hover:bg-opacity-50 transition">
                <h4 className="font-semibold mb-1 text-secondary">What services do you offer?</h4>
                <p className="text-primary text-opacity-70">Full-stack development, web design, API development, and custom solutions.</p>
              </div>
              <div className="p-4 bg-primary bg-opacity-30 border border-secondary rounded-lg hover:bg-opacity-50 transition">
                <h4 className="font-semibold mb-1 text-secondary">Do you work on contract basis?</h4>
                <p className="text-primary text-opacity-70">Yes, I work on both contract and full-time project basis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
