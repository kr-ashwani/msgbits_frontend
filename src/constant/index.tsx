import IconShare from "/public/icons/FileShare.png";
import IconDeviceSync from "/public/icons/DeviceSync.png";
import IconGroupChat from "/public/icons/GroupChat.png";
import Svg from "@/components/svg";
import { SafeImage } from "@/components/utility/SafeImage";

export const featuresContent = [
  {
    logo: Svg("Video", { width: "26" }),
    heading: "Video Messaging",
    desc: "Provides real-time face-to-face interaction, for effective conversations.",
  },
  {
    logo: <SafeImage width={26} src={IconShare} alt="video icon"></SafeImage>,
    heading: "File Sharing",
    desc: "Simplifies the process of exchanging documents, images, videos and other files.",
  },
  {
    logo: (
      <SafeImage width={26} src={IconDeviceSync} alt="video icon"></SafeImage>
    ),
    heading: "Multi-Device Sync",
    desc: "Ensures messages and notifications are synchronized across all devices.",
  },
  {
    logo: Svg("Wifi", { width: "26" }),
    heading: "Keep Safe & Private",
    desc: "Ensures that only the communicating users can read the messages.",
  },
  {
    logo: (
      <SafeImage width={26} src={IconGroupChat} alt="video icon"></SafeImage>
    ),
    heading: "Group Chats and Channels",
    desc: " Facilitates collaboration by allowing users to create and manage groups.",
  },
  {
    logo: Svg("Timer", { width: "26" }),
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
  { src: Svg("Facebook", { width: "30" }), alt: "facebook logo", link: "#" },
  { src: Svg("Twitter", { width: "30" }), alt: "twitter logo", link: "#" },
  { src: Svg("Instagram", { width: "30" }), alt: "instagram logo", link: "#" },
];
