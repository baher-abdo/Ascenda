import logo from "../../assets/logo/Logo.png";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";

const footerContent: Array<{ column: { [key: string]: string | string[] } }> = [
  {
    column: {
      title: "About Us",
      links: ["Company Overview", "Our Mission & Values", "Careers", "Blog", "Press Releases"],
    },
  },
  {
    column: {
      title: "Customer Service",
      links: ["Contact Us", "FAQs", "Live Chat", "Cancellation Policy", "Booking Policies"],
    },
  },
  {
    column: {
      title: "Explore",
      links: ["Destinations", "Special Offers", "Last-Minute Deals", "Travel Guides", "Blog & Travel Tips"],
    },
  },
  {
    column: {
      title: "Support",
      links: ["Privacy Policy", "Terms & Conditions", "Accessibillity", "Feedback & Suggestions", "Sitemap"],
    },
  },
  {
    column: {
      title: "Membership",
      links: ["Loyalty Program", "Unlock Exclusive Offers", "Rewards & Benefits"],
    },
  },
];

export default function Footer() {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className="bg-main-color text-white">
      <div className="container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 py-6 border-b space-y-12 xl:space-y-0">
          <div className="mb-12 md:mb-0">
            <a href="/" draggable="false">
              <img src={logo} alt="Logo" draggable="false" className="h-6 w-auto" />
            </a>
          </div>

          {footerContent.map((col, index) => {
            return (
              <div className="mb-2 items-start" key={index}>
                <h3 className="h4 mb-2 xl:mb-6">{col.column.title}</h3>
                <ul>
                  {Array.isArray(col.column.links) &&
                    col.column.links.map((text: string) => {
                      return (
                        <li key={text} className="font-light mb-2 text-sm hover:font-medium transition-all duration-500 cursor-pointer">
                          <a href="#">{text}</a>
                        </li>
                      );
                    })}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="pt-6 grid md:grid-cols-2">
          <p className="font-light">&copy;{`${currentYear} `}Ascenda. All rights reserved.</p>
          <div className="flex gap-x-3 mt-3 md:mt-0 justify-start md:justify-end">
            <a href="#">
              <FaTwitter size={24} />
            </a>
            <a href="#">
              <FaLinkedin size={24} />
            </a>
            <a href="#">
              <IoLogoWhatsapp size={24} />
            </a>
            <a href="#">
              <FaFacebookF size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
