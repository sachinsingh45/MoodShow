# 🎬 MoodShow

MoodShow is a movie recommendation web app that uses AI to provide personalized movie suggestions based on user input. Built with React, Tailwind CSS, and Firebase, it offers a seamless user experience for browsing and discovering movies from TMDB, with features like AI-powered search, movie trailers, and detailed movie pages.

---

## 🚀 Features

- **Authentication:**
  - Sign In with Google using Firebase Authentication
  - Form validation for secure login and sign-up experiences

- **Movie Browsing:**
  - Fetch and display movies from the TMDB API (Now Playing, Popular, and more)
  - On clicking a movie, navigate to a detailed page with trailer autoplay and full movie details (description, title, etc.)

- **AI Movie Recommendations:**
  - AI-powered search functionality using Cohere AI
  - Movie suggestions based on user prompts, with results fetched from the TMDB API

- **State Management:**
  - Redux for managing user authentication and movie data
  - Custom hooks for fetching movie data (e.g., `useNowPlayingMovies`, `usePopularMovies`)

- **UI/UX:**
  - Clean, responsive design using Tailwind CSS
  - Dynamic navigation with React Router (Login, Browse, and Movie Detail pages)
  - Minimal and intuitive design for a seamless movie discovery experience


## 🖼️ Screenshots

Here are some screenshots of the MoodShow app:

### Home Page:
<img src="https://github.com/user-attachments/assets/7c36ecf2-18a6-4d7b-89a6-c508203faac1" alt="Home Page" width="600"/>

### Movie Details Page:
<img src="https://github.com/user-attachments/assets/c9501130-2f24-4aef-a03e-b80b9ccedd02" alt="Movie Details" width="600"/>

### AI Movie Recommendations:
<img src="https://github.com/user-attachments/assets/7f2a5172-908b-471b-9e96-6451e4892999" alt="AI Recommendations" width="600"/>


---
## 🛠️ Tech Stack

- **Frontend:**
  - React (with extensive use of Hooks like `useState`, `useEffect`)
  - Tailwind CSS for modern and responsive UI
  - React Router for client-side routing
  - Axios for making API requests to TMDB and Cohere AI

- **Backend:**
  - Firebase for Google Authentication
  - TMDB API for fetching movie details, trailers, and recommendations
  - Cohere AI for providing personalized movie suggestions based on user input

- **State Management:**
  - Redux for centralized state management (`userSlice`, `movieSlice`)
  - Custom Redux hooks for fetching and displaying movie data

---

## 📖 Key Features Breakdown

1. **User Authentication:**
   - Sign In with Google using Firebase Authentication
   - Form validation for both sign-in and sign-up experiences to ensure secure login

2. **Movie Data from TMDB:**
   - Fetch movie data such as Now Playing and Popular Movies using TMDB API
   - Render movie data dynamically in the app with image CDN support from TMDB

3. **AI Movie Recommendation:**
   - AI-based search using Cohere AI to recommend movies based on user input
   - Cohere AI provides a list of movie titles, which are then fetched from the TMDB API for display

4. **Movie Detail Page:**
   - Navigate to a detailed movie page after selecting a movie
   - Autoplay movie trailers from YouTube on the detail page
   - Display detailed information about the movie (title, description, etc.)

5. **Redux Integration:**
   - Centralized state management with Redux for user and movie data
   - Redux slices for handling authentication (`userSlice`) and movie data (`movieSlice`)
   
6. **Responsiveness & Modern Design:**
   - Tailwind CSS for building a beautiful and responsive user interface
   - Dark-themed, gradient-rich design with seamless page transitions

7. **GPT Search Page:**
   - Cohere AI-powered search bar to fetch movie recommendations based on prompts
   - Show movie results directly in the app with reusable components

---

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node Package Manager)
- Firebase account (for hosting and authentication)
- TMDB API key (for fetching movie data)
- Cohere AI API key (for AI-based movie recommendations)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/MoodShow.git
    cd MoodShow
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

### Set up your environment variables

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_API_KEY=your_cohere_ai_api_key
```
### Run the app
To start the app, run the following command:
 ```bash
    npm start
 ```


## 🌐 API Integrations
- TMDB API: For fetching movie data and trailers.
- Cohere AI API: For generating movie recommendations based on user input.
- Firebase Authentication: For user sign-in with Google.

## 💻 Key Components
- GptSearchBar: The AI-powered search bar that fetches recommendations from Cohere AI and TMDB.
- MovieList & MovieCard: Display movies in a grid layout with dynamic data from the TMDB API.
- MovieDetail: A detailed view of a selected movie that shows a trailer and additional information.

## 🚀 How It Works
### Authentication
- Users can sign in with Google through Firebase Authentication. Once signed in, they can browse and interact with the movie data.

### AI Movie Recommendations
- The GPT search bar allows users to type in a movie query. The app sends the query to Cohere AI, which returns a list of movie titles. These titles are then fetched from the TMDB API, and the results are displayed in the movie list.

### Movie Pages
- Each movie card leads to a detailed page where the trailer auto-plays, and additional movie information is displayed, such as the cast, crew, and description.

## 🧑‍💻 Contributors
- Sachin Singh - [GitHub](https://github.com/sachinsingh45)

## 🎉 Acknowledgements
A big thanks to the following for providing amazing APIs:
- [TMDB](https://www.themoviedb.org/)
- [Cohere AI](https://cohere.com/)

*Enjoy discovering movies with MoodShow!* 🍿🎬

