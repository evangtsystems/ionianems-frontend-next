import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaWhatsapp, FaLink } from "react-icons/fa6";

const ShareButtons = ({ url, text }) => {
  const pageUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(text);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "16px",
  };

  return (
    <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#1877F2" }}
      >
        <FaFacebookF />
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#1DA1F2" }}
      >
        <FaXTwitter />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#0077B5" }}
      >
        <FaLinkedinIn />
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${shareText}%20${pageUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...buttonStyle, backgroundColor: "#25D366" }}
      >
        <FaWhatsapp />
      </a>

      <button
        onClick={copyToClipboard}
        style={{ ...buttonStyle, backgroundColor: "#333", border: "none", cursor: "pointer" }}
      >
        <FaLink />
      </button>
    </div>
  );
};

export default ShareButtons;
