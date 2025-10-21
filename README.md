# MoodMate: Mobile-First Mental Health Mood Tracking App

![MoodMate](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## Overview

MoodMate is a production-ready mobile-first mental health mood tracking application built with React Native (Expo) and Node.js/Express/MongoDB backend. The app features AI-powered insights using the Grok API to provide empathetic, Jungian-inspired guidance for mental wellness.

**⚠️ Important Disclaimer:** MoodMate is for self-reflection only, not medical advice. Consult professionals for health concerns.

## Key Features

- 📱 **Native Mobile Experience** - Built with React Native and Expo for iOS and Android
- 🤖 **AI-Powered Insights** - Grok API integration with empathetic Jungian therapist persona
- 🔐 **Secure Authentication** - JWT-based auth with token expiration handling
- 📊 **Mood Visualization** - Interactive charts showing mood trends over time
- 📝 **Mood Logging** - Track 15 different mood states with optional notes
- 🔒 **Privacy-First** - Secure token storage using Expo SecureStore
- ⚡ **Real-time Updates** - Instant mood logging and insights

## Tech Stack

### Frontend (Mobile)
- React Native 0.74.5
- Expo ^51.0.28
- @react-navigation/native ^6.1.6
- expo-secure-store ^13.0.2
- react-native-chart-kit ^6.11.0
- axios ^1.3.4

### Backend
- Node.js v18+
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Axios for Grok API integration

### Deployment
- **Backend:** Render.com or Heroku
- **Mobile:** Expo EAS for app stores
- **Database:** MongoDB Atlas

## Project Structure

```
moodmate/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── insightsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Mood.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── moods.js
│   │   └── insights.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── mobile/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── MoodForm.js
│   │   └── MoodChart.js
│   ├── assets/
│   ├── App.js
│   ├── api.js
│   ├── app.json
│   ├── .gitignore
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v18 or higher
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- MongoDB Atlas account (free tier available)
- Grok API key from [https://x.ai/api](https://x.ai/api)

For mobile development:
- iOS: Xcode (Mac only) or Expo Go app
- Android: Android Studio or Expo Go app

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd moodmate
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/moodmate?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
GROK_API_KEY=your_grok_api_key_from_https://x.ai/api
```

**Important:** 
- Replace `MONGO_URI` with your MongoDB Atlas connection string
- Generate a strong random string for `JWT_SECRET`
- Get your `GROK_API_KEY` from [https://x.ai/api](https://x.ai/api)

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`

### 3. Mobile App Setup

```bash
cd ../mobile
npm install
```

Update the API URL in `api.js` if deploying to production:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your production URL
});
```

Start the Expo development server:

```bash
expo start
```

Scan the QR code with:
- **iOS:** Camera app (opens Expo Go)
- **Android:** Expo Go app

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Mobile Development

```bash
cd mobile
expo start
```

Press:
- `i` - Open iOS simulator
- `a` - Open Android emulator
- `w` - Open web browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user (protected)

### Moods
- `GET /api/moods` - Get all moods for user (protected)
- `POST /api/moods` - Create new mood entry (protected)
- `GET /api/moods/:id` - Get specific mood (protected)
- `PUT /api/moods/:id` - Update mood (protected)
- `DELETE /api/moods/:id` - Delete mood (protected)

### AI Insights
- `POST /api/insights` - Get AI insights for mood (protected)

## Supported Moods

The app supports tracking 15 different mood states:

- 😊 Happy
- 😢 Sad
- 😰 Anxious
- 😫 Stressed
- 😌 Calm
- ⚡ Energetic
- 😔 Depressed
- 😠 Angry
- 🤩 Excited
- 😴 Tired
- 😊 Content
- 😤 Frustrated
- 🌟 Hopeful
- 😵 Overwhelmed
- ☮️ Peaceful

## Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Configure environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GROK_API_KEY`
   - `PORT` (optional, defaults to 5000)
4. Deploy!

### Backend Deployment (Heroku)

```bash
cd backend
heroku create moodmate-api
heroku config:set MONGO_URI="your_mongo_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set GROK_API_KEY="your_grok_key"
git push heroku main
```

### Mobile Deployment (Expo EAS)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure EAS:
```bash
cd mobile
eas build:configure
```

4. Build for production:

**iOS:**
```bash
eas build --platform ios --profile production
```

**Android:**
```bash
eas build --platform android --profile production
```

5. Submit to app stores:

**iOS:**
```bash
eas submit --platform ios
```

**Android:**
```bash
eas submit --platform android
```

## AI Integration Details

### Grok API Configuration

The app uses the Grok API with a carefully crafted system prompt:

```
You are an empathetic Jungian therapist with a high-level understanding of 
neurology and cognitive functioning. You are a good listener. Offer advice 
in a non-direct manner, such as "I wonder if exploring..." or "Studies have 
shown that those who...". This indirectly implies this is not medical advice 
while assisting the person with pathways toward increased health.
```

### API Call Flow

1. User logs a mood with optional notes
2. App sends mood + notes to `/api/insights` endpoint
3. Backend calls Grok API with system prompt + user data
4. AI generates empathetic, indirect guidance
5. Insight displayed to user with disclaimer

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Token expiration handling
- ✅ Secure token storage (Expo SecureStore)
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Environment variable protection

## Testing

### Backend Testing

Test the API endpoints using curl or Postman:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create mood (use token from login)
curl -X POST http://localhost:5000/api/moods \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_TOKEN_HERE" \
  -d '{"mood":"happy","notes":"Feeling great today!"}'
```

### Mobile Testing

1. Test on iOS Simulator (Mac only)
2. Test on Android Emulator
3. Test on physical devices via Expo Go
4. Use Expo's built-in debugging tools

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

**Grok API Errors:**
- Verify API key is correct
- Check API rate limits
- Review error messages in console

### Mobile Issues

**Expo Start Fails:**
```bash
expo start -c  # Clear cache
```

**Network Request Failed:**
- Check backend is running
- Verify API URL in `api.js`
- For physical devices, use your computer's IP address instead of localhost

**iOS Build Issues:**
- Ensure Xcode is up to date
- Check Apple Developer account status

**Android Build Issues:**
- Verify Android SDK is installed
- Check Java version compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built by the xAI team
- Powered by Grok AI
- Inspired by Jungian psychology and neuroscience

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Roadmap

- [ ] Add mood patterns analysis
- [ ] Implement mood reminders/notifications
- [ ] Add data export functionality
- [ ] Support for multiple languages
- [ ] Dark mode support
- [ ] Social features (optional sharing)
- [ ] Integration with health apps
- [ ] Advanced analytics dashboard

---

**Remember:** MoodMate is a tool for self-reflection and awareness. For professional mental health support, please consult qualified healthcare providers.

