import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialIcons = ({ socialLinks }) => {
  const icons = [
    {
      link: "https://instagram.com",
      social: <FaInstagram key="instagram" />,
    },
    { link: "https://twitter.com", social: <FaTwitter key="twitter" /> },
    { link: "https://facebook.com", social: <FaFacebook key="facebook" /> },
    { link: "https://linkedin.com", social: <FaLinkedin key="linkedin" /> },
  ];

  return (
    <div>
      <p className="font-bold">Follow Us</p>
      <div className="flex my-4 flex-wrap gap-5">
        {icons?.map((item, i) => (
          <div key={i} className="text-3xl">
            <a href={item.link}>
              <p className="text-white">{item.social}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
