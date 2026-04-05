import { useState } from "react";
import axios from "axios";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);




function Contact(){
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus((prev) => ({ ...prev, error: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      await axios.post('/api/contact/send', formData);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus({ loading: false, success: true, error: "" });
      setTimeout(() => setStatus((prev) => ({ ...prev, success: false })), 4000);
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Error sending message. Please try again.',
      });
    }
  };




    return(
        <>

        {/* CONTACT */}
        <section id="contact" className="py-24 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
            <div className="mb-14">
                <div className="section-line mb-4" />
                <h2 className="font-syne text-3xl font-700 text-white mb-2">Get in Touch</h2>
                <p className="text-slate-500 text-sm">Open to SWE roles, internships, and interesting collaborations</p>
            </div>

            <div className="grid md:grid-cols-2 gap-14 items-start">
                <div>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Whether you're looking for a software engineer, want to discuss competitive programming strategy, or have an interesting project — my inbox is always open.
                </p>
                <div>
                    {[
                    { label: "Email", val: "mezbah.sc@email.com", href: "mailto:mezbah.sc@email.com" },
                    { label: "GitHub", val: "github.com/MezbahUddin21", href: "https://github.com/MezbahUddin21" },
                    { label: "LinkedIn", val: "linkedin.com/in/mum_m00z", href: "https://linkedin.com/in/mum_m00z" },
                    { label: "Codeforces", val: "codeforces.com/profile/mumm00z", href: "https://codeforces.com/profile/mumm00z" },
                    ].map(item => (
                    <a key={item.label} target="_blank" href={item.href} className="contact-link group">
                        <span className="text-xs text-slate-600 w-20 shrink-0">{item.label}</span>
                        <span className="contact-val text-sm text-slate-400 transition-colors">{item.val}</span>
                        <span className="contact-arrow text-slate-700 ml-auto transition-colors"><ArrowIcon /></span>
                    </a>
                    ))}
                </div>
                </div>

                {/* mail box */}
                <div className="rounded-2xl border border-white/6 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
                <h3 className="text-sm font-semibold text-white mb-5">Send a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Name</label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1.5">Email</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5">Subject</label>
                    <input
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about the opportunity..."
                      className="input-field resize-none"
                      required
                    />
                  </div>
                  {status.error && <p className="text-red-400 text-sm">{status.error}</p>}
                  {status.success && <p className="text-green-400 text-sm">Message sent successfully!</p>}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.99] mt-1"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    disabled={status.loading}
                  >
                    {status.loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
                </div>
            </div>
            </div>
        </section>
        
        </>

    )



}


export default Contact;