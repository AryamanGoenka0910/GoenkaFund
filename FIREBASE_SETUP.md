# Firebase Authentication Setup

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "GoenkaFund"
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

## 3. Get Firebase Configuration

1. In Firebase Console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register app with name "GoenkaFund Web"
6. Copy the configuration object

## 4. Set Environment Variables

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 5. Install Firebase Dependencies

```bash
npm install firebase
```

## 6. Create Users (Optional)

You can create users manually in Firebase Console:

1. Go to "Authentication" > "Users"
2. Click "Add user"
3. Enter email and password
4. Users can also sign up through your app

## 7. Security Rules

For production, consider setting up Firestore security rules to restrict access to authenticated users only.

## 8. Testing

1. Start your development server: `npm run dev`
2. Navigate to `/auth/signup`
3. Try signing in with credentials
4. Test protected routes

## Security Features

- ✅ Server-side authentication with Firebase
- ✅ Secure password handling
- ✅ Protected routes
- ✅ Automatic session management
- ✅ Environment variable configuration
- ✅ Type-safe authentication context 