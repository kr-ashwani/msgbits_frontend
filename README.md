# Real-Time Chat Application

A modern real-time messaging platform built with Next.js and TypeScript, featuring secure communication, file sharing, comprehensive chat management, and native WebRTC-powered audio/video calls.

## Table of Contents

- [Features](#features)
  - [Real-Time Communication](#real-time-communication)
  - [Authentication & Security](#authentication--security)
  - [Group Chat Features](#group-chat-features)
  - [User Experience](#user-experience)
- [Demo](#-demo)
- [Screenshots](#-screenshots)
- [Routes](#routes)
- [Tech Stack](#tech-stack)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [WebRTC Implementation Details](#webrtc-implementation-details)
- [State Management](#state-management)
- [Performance Optimization](#performance-optimization)
- [Security Measures](#security-measures)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

### Real-Time Communication

- **Chat Features**
  - Real-time messaging using Socket.IO
  - Support for both private and group chats
  - Real-time online status tracking for users
  - Custom profile picture upload
  - File sharing (images, videos, PDFs, documents)
  - Interactive image viewer with pan and zoom functionality
  - Encrypted messages and files with chunk-by-chunk decryption
- **Audio/Video Calls**
  - Native WebRTC implementation for high-quality calls
  - Support for both audio and video calls
  - Custom STUN/TURN server implementation for reliable connectivity
  - Maximum 4 participants per call room
  - Auto-reconnection on network issues
  - Join ongoing calls feature
  - Missed call notifications

### Authentication & Security

- Multiple authentication methods:
  - Traditional email/password login with OTP verification
  - OAuth integration (Google, Facebook, GitHub)
- Secure password reset functionality via email
- Runtime validation using Zod
- End-to-end message encryption
- Encrypted file storage and streaming

### Group Chat Features

- Advanced admin controls
  - User management (add/remove members)
  - Admin promotion capabilities
- Shared media gallery in chat description
- Comprehensive media viewing section

### User Experience

- Four customizable color themes
- Intuitive settings panel
- Responsive design
- Persistent state management using Redux
- Seamless call management and notifications

## 🚀 Demo

Experience the application live at: [Live Demo](https://msgbits.com)

## 📷 Screenshots

### Landing Page

![Landing Page](/screenshots/landing.png)
_Clean, modern landing page showcasing key features and user benefits_

### Authentication

![Login Interface](/screenshots/login.png)
_Secure login interface with multiple authentication options and OTP verification_

### Chat Interface

![Chat Interface](/screenshots/chat.png)
_Feature-rich chat interface with intuitive navigation and real-time status updates_

### Video Call

![Video Call](/screenshots/video-call.png)
_High-quality video conferencing with up to 4 participants and easy-to-use controls_

### File Sharing

![File Sharing](/screenshots/file-sharing.png)
_Comprehensive file sharing interface with image preview, shared media gallery, and chat room details panel_

### Group Chat Administration

![Group Admin](/screenshots/group-admin.png)
_Advanced group management interface with member controls and admin privileges_

### Group Chat Interface

![Group](/screenshots/group.png)
_Real-time group chat interface with member list and shared media gallery_

### Theme Customization

![Themes](/screenshots/themes.png)
_Four distinct theme options for personalized user experience_

## Routes

- `/` - Landing page
- `/login` - User login
- `/signup` - New user registration
- `/forgotpassword` - Password recovery
- `/chat` - Main chat interface

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **State Management:** Redux
- **Real-time Communication:**
  - Socket.IO for chat
  - WebRTC for audio/video calls
- **Form Validation:** Zod
- **Authentication:** Custom email/password + OAuth
- **Server Infrastructure:**
  - Custom STUN/TURN servers
  - WebRTC signaling server

## System Requirements

### Prerequisites

```bash
Node.js >= 14.0.0
npm >= 6.14.0
```

### Recommended Hardware

- Modern web browser with WebRTC support
- Webcam and microphone for video calls
- Stable internet connection (recommended: 1Mbps+ upload/download)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kr-ashwani/msgbits_frontend.git
cd chat-app-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add necessary environment variables:

```env
NEXT_PUBLIC_SERVER_URL = server_url
NEXT_PUBLIC_SELF_URL = frontend_url
NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID = google_client_id
NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_SECRET = google_client_secret
NEXT_PUBLIC_OAUTH_GITHUB_CLIENT_ID = github_client_id
NEXT_PUBLIC_OAUTH_FACEBOOK_APP_ID = facebook_app_id
NEXT_PUBLIC_MAX_FILE_SIZE_MB = max_file_upload_size
NEXT_PUBLIC_STUN_URLS = custom_stun_server
NEXT_PUBLIC_TURN_URLS = custom_turn_server
NEXT_PUBLIC_TURN_USERNAME = turn_server_username
NEXT_PUBLIC_TURN_PASSWORD = turn_server_password
```

4. Run the development server:

```bash
npm run dev
```

Your app should now be running on `http://localhost:3000`

## Development

### Code Style

- We use ESLint for code linting
- Prettier for code formatting
- TypeScript strict mode enabled

### Best Practices

- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling
- Write meaningful commit messages
- Follow the project's file/folder structure

## Build

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## WebRTC Implementation Details

The application implements a custom WebRTC solution for audio/video calls with the following features:

- Direct peer-to-peer connections using native WebRTC API
- Fallback to TURN server when direct connection fails
- Automatic connection recovery on network issues
- Support for late-joining participants
- Room-based call management
- Call state persistence across page refreshes

### Troubleshooting Common WebRTC Issues

- Ensure your browser allows camera/microphone access
- Check if you're behind a restrictive firewall
- Verify STUN/TURN server configurations
- Monitor browser console for connection errors
- Check network connectivity and stability

## State Management

Redux is used to manage complex client-side state, handling:

- User authentication state
- Chat room data
- Active calls information
- Theme preferences
- File transfer status
- Connection states

## Performance Optimization

- Lazy loading of components
- Image optimization
- Chunk-based file transfer
- Efficient WebRTC connection handling
- Redux state optimization

## Security Measures

- End-to-end encryption for messages
- Secure file transfer
- JWT authentication
- OAuth2.0 implementation
- Rate limiting
- Input sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

For support, email support@msgbits.com or join our [Discord community](https://discord.gg/msgbits).
