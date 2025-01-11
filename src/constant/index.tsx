import Svg from "@/components/svg";
import { SafeImage } from "@/components/utility/SafeImage";

interface Icons {
  IconShare: string;
  IconDeviceSync: string;
  IconGroupChat: string;
}

const icons: Icons = {
  IconShare: "/icons/DeviceSync.png",
  IconDeviceSync: "/icons/FileShare.png",
  IconGroupChat: "/icons/GroupChat.png",
};

export const featuresContent = [
  {
    logo: Svg("Video", { width: "26" }),
    heading: "Video Messaging",
    desc: "Provides real-time face-to-face interaction, for effective conversations.",
  },
  {
    logo: (
      <SafeImage
        width={26}
        height={26}
        src={icons.IconShare}
        alt="video icon"
      ></SafeImage>
    ),
    heading: "File Sharing",
    desc: "Simplifies the process of exchanging documents, images, videos and other files.",
  },
  {
    logo: (
      <SafeImage
        width={26}
        height={26}
        src={icons.IconDeviceSync}
        alt="video icon"
      ></SafeImage>
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
      <SafeImage
        width={26}
        height={26}
        src={icons.IconGroupChat}
        alt="video icon"
      ></SafeImage>
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
      { name: "+919123456789", link: "tel:+919123456789" },
    ],
  },
];

export const socialMedia = [
  {
    src: Svg("AuthGithub", { width: "28", height: "28" }),
    alt: "Github logo",
    link: "https://github.com/kr-ashwani",
  },
  {
    src: Svg("linkedin", { width: "28", height: "28" }),
    alt: "Linkedin logo",
    link: "https://www.linkedin.com/in/kr-ashwani",
  },
  {
    src: Svg("Instagram", { width: "30", height: "30" }),
    alt: "instagram logo",
    link: "https://www.instagram.com/i_m_ashwani.kr/",
  },
];
