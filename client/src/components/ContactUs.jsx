import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <section
      id="contact-us"
      className="flex justify-center items-center min-h-[60vh] bg-gradient-to-t from-[#eaf6fd] via-white to-[#f4faff] py-20 px-4"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-[#49B9FF]/10 p-8 md:p-14 flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Left Side: Contact Info */}
        <div className="flex-1 flex flex-col gap-8 justify-center">
          <div>
            <h2 className="text-4xl font-extrabold font-playfair text-[#222] mb-2">
              Contact Us
            </h2>
            <div className="w-16 h-1 bg-[#49B9FF] rounded-full mb-4" />
            <p className="text-lg text-gray-500">
              We'd love to hear from you! Whether you have a question, feedback,
              or just want to say hello, our team is here to help you make your
              Stayyy unforgettable.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-[#49B9FF]" />
              <span className="text-gray-700 font-medium">
                +212 65-60-22-270
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-[#49B9FF]" />
              <span className="text-gray-700 font-medium">
                hello@stayyy.com
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-6 w-6 text-[#49B9FF] mt-1" />
              <span className="text-gray-700 font-medium">
                Al Akhawayn University <br /> Lab 8b
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <form className="flex-1 space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder="First Name"
                className="block w-full px-3 py-2 bg-white border border-[#49B9FF]/40 rounded-md shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 mb-1 sm:invisible"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                placeholder="Last Name"
                className="block w-full px-3 py-2 bg-white border border-[#49B9FF]/40 rounded-md shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] sm:text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@email.com"
              className="block w-full px-3 py-2 bg-white border border-[#49B9FF]/40 rounded-md shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] sm:text-sm"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone (optional)
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="(+212) XX-XX-XX-XX"
              className="block w-full px-3 py-2 bg-white border border-[#49B9FF]/40 rounded-md shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] sm:text-sm"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Type your message..."
              className="block w-full px-3 py-2 bg-white border border-[#49B9FF]/40 rounded-md shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#49B9FF] focus:border-[#49B9FF] sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-semibold rounded-full text-white bg-[#49B9FF] hover:bg-[#2386c8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#49B9FF] cursor-pointer transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
