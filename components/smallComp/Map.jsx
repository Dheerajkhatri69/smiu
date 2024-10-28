
import React from 'react';
import { Cover } from '../ui/cover';

const Map = () => {
  return (
    <div className="flex flex-col items-center mx-auto container px-4 py-6">
      <div className="w-full"> {/* Removed max-w-4xl to allow full width */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.3950407621915!2d67.00308607598193!3d24.850353945660586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e03e02fabc1%3A0x96c129db3ee25a57!2sSindh%20Madressatul%20Islam%20University%2C%20City%20Campus%2C%20Karachi!5e0!3m2!1sen!2s!4v1728541978119!5m2!1sen!2s"
          className="h-96 border-0 rounded-lg w-full shadow-lg" // w-full ensures it takes full width
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex flex-col items-center mt-4 space-y-2">
        <h3 className="text-lg font-semibold"><Cover>Contact us</Cover></h3>
        <p>(021) 111-11-1885</p>
        <p>Hasrat Mohani Road, Karachi-74000, Pakistan.</p>
        <p>info@smiu.edu.pk</p>
      </div>
      
    </div>
  );
}

export default Map;
