# Assignment 4: Authentication - Expo App 👋
Author: Sparshan Koirala
        Hoang Phuong Uyen Nguyen
        Julia Gesualdi Candotti

This is an [Expo](https://expo.dev) project implementing user authentication with Supabase, featuring sign-up, sign-in, and protected routes.

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ and npm installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

### Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy your Supabase credentials to `.env.local`:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
   ```

3. **Start the development server:**

   ```bash
   npx expo start
   ```

4. **Run the app:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for web
   - Or scan the QR code with Expo Go app (iPhone Camera or Android Expo Go)

## Supabase Project Setup

### Create a Supabase Project

- Go to [supabase.com](https://supabase.com)
- Create a new project (note your URL and anon key)
- Wait for the database to initialize

### Test Accounts

```
Email:    test@example.com
Password: Test1234!@
```

**Note:** The email confirmation has been temporarily disabled for SignUp testing purpose.

## 📋 Features Implemented

✅ **Sign-Up Screen**

- Email and password input fields
- Password strength validation (8+ chars, uppercase, lowercase, number, special char)
- Confirm password matching
- Password visibility toggle with eye icon
- Form validation using React Hook Form + Zod
- Loading state during submission

✅ **Sign-In Screen**

- Email and password input
- Form validation
- Error handling with user-friendly messages
- Loading indicators

✅ **Protected Routes**

- Session checking on app launch
- Automatic redirect to login if not authenticated
- Automatic redirect to main screen if already authenticated

✅ **Session Management**

- AsyncStorage persistence (remember me across app restarts)
- Automatic token refresh
- Sign-out functionality with proper cleanup

## 📦 Dependencies

- **expo**: React Native framework
- **expo-router**: File-based routing
- **@supabase/supabase-js**: Supabase client
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **@react-native-async-storage/async-storage**: Persistent storage
- **react-native-url-polyfill**: URL polyfill for React Native

## 📄 License

This is an assignment project for CPRG303C - Mobile App Development
