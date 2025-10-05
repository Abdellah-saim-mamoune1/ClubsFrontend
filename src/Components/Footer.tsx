export function Footer(){

    return (    
        <footer className="bg-gray-900 text-gray-300 mt-10 w-full py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">About Us</h4>
            <p>
              We connect students through clubs, events, and activities to
              encourage collaboration and innovation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <p>Email: contact@university.com</p>
            <p>Phone: +213 555 123 456</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
               <li>
                <a href="/home" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/clubs" className="hover:text-white transition">
                  Clubs
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-white transition">
                  Events
                </a>
              </li>
              <li>
                
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} University Clubs. All rights reserved.
        </div>
      </footer>
    )
}