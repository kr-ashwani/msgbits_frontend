import IconVideo from "/public/icons/Video.svg";
import IconTimer from "/public/icons/Timer.svg";
import IconShare from "/public/icons/FileShare.png";
import IconDeviceSync from "/public/icons/DeviceSync.png";
import IconWifi from "/public/icons/Wifi.svg";
import IconGroupChat from "/public/icons/GroupChat.png";
import Facebook from "/public/icons/Facebook.svg";
import Instagram from "/public/icons/Instagram.svg";
import Twitter from "/public/icons/Twitter.svg";

export const featuresContent = [
  {
    logo: IconVideo,
    heading: "Video Messaging",
    desc: "Provides real-time face-to-face interaction, for effective conversations.",
  },
  {
    logo: IconShare,
    heading: "File Sharing",
    desc: "Simplifies the process of exchanging documents, images, videos and other files.",
  },
  {
    logo: IconDeviceSync,
    heading: "Multi-Device Sync",
    desc: "Ensures messages and notifications are synchronized across all devices.",
  },
  {
    logo: IconWifi,
    heading: "Keep Safe & Private",
    desc: "Ensures that only the communicating users can read the messages.",
  },
  {
    logo: IconGroupChat,
    heading: "Group Chats and Channels",
    desc: " Facilitates collaboration by allowing users to create and manage groups.",
  },
  {
    logo: IconTimer,
    heading: "Save Your Time",
    desc: "Advanced search capabilities enable users to quickly locate specific resources.",
  },
];

export const footerLinks = [
  {
    title: "Features",
    links: [
      { name: "Video Messaging", link: "#feature" },
      { name: "File Sharing", link: "#feature" },
      { name: "Multi-Device Sync", link: "#feature" },
      { name: "Keep Secure", link: "#feature" },
      { name: "Group Chats", link: "#feature" },
      { name: "Save Your Time", link: "#feature" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "#" },
      { name: "FAQs", link: "#" },
      { name: "Privacy policy", link: "#" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "customer@msgbits.com", link: "mailto:customer@msgbits.com" },
      { name: "+919123456789", link: "tel:+92554862354" },
    ],
  },
];

export const socialMedia = [
  { src: Facebook, alt: "facebook logo", link: "#" },
  { src: Twitter, alt: "twitter logo", link: "#" },
  { src: Instagram, alt: "instagram logo", link: "#" },
];
