export default function ContactPage() {
  return (
    <main className="p-6 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-tight">
          Get In <span className="text-orange-500">Touch</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Have a question about your order or our menu?
        </p>
      </header>

      {/* Contact Cards */}
      <div className="space-y-4">
        {/* Phone / WhatsApp */}
        <a 
          href="tel:+233XXXXXXXXX" 
          className="flex items-center p-4 bg-white border-2 border-orange-500 rounded-2xl shadow-sm hover:bg-orange-50 transition-colors"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl mr-4">
            📞
          </div>
          <div>
            <h3 className="font-bold text-gray-800 uppercase">Call Us Directly</h3>
            <p className="text-orange-600 font-semibold">+233 XX XXX XXXX</p>
          </div>
        </a>

        {/* Physical Location */}
        <div className="flex items-center p-4 bg-white card-shadow rounded-2xl border border-gray-100">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
            📍
          </div>
          <div>
            <h3 className="font-bold text-gray-800 uppercase">Our Stall</h3>
            <p className="text-gray-500 text-sm">Main Market, Near the Central Gate, Accra</p>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center p-4 bg-white card-shadow rounded-2xl border border-gray-100">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
            ⏰
          </div>
          <div>
            <h3 className="font-bold text-gray-800 uppercase">We are Open</h3>
            <p className="text-gray-500 text-sm">Mon - Sat: 8:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      {/* Simple Map Placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-2xl overflow-hidden flex items-center justify-center text-gray-400 font-bold uppercase italic">
        Map View Coming Soon
      </div>

      <p className="text-center text-xs text-gray-400 uppercase tracking-widest">
        Mom's Stall — Freshly Cooked Every Day
      </p>
    </main>
  )
}