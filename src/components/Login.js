import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidity } from '../utils/Validate';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, updateProfile, provider } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import md5 from 'md5';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);

  const toggleAuthMode = () => {
    setIsSignUp((prevMode) => !prevMode);
  };

  const handleButtonClick = () => {
    const message = checkValidity(email.current.value, password.current.value);
    if (message) {
      toast.error(message);
      return;
    }

    if (isSignUp) {
      if (password.current.value !== confirmPassword.current.value) {
        toast.error('Passwords do not match.');
        return;
      }

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const emailHash = md5(user.email.trim().toLowerCase());
          const photoURL = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL,
          })
            .then(() => {
              const { uid, email, displayName } = user;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              toast.success('Sign-up successful!');
              navigate('/browse');
            })
            .catch((error) => {
              toast.error(`Error updating profile: ${error.message}`);
            });
        })
        .catch((error) => {
          toast.error(`${error.code}: ${error.message}`);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          const emailHash = md5(user.email.trim().toLowerCase());
          const photoURL = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
          dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL }));
          toast.success('Sign-in successful!');
          navigate('/browse');
        })
        .catch((error) => {
          toast.error(`${error.code}: ${error.message}`);
        });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if photoURL is valid or fallback to a default
      const emailHash = md5(user.email.trim().toLowerCase());
      const defaultPhotoURL = 'path/to/default/avatar.png'; // Replace with your default avatar path
      const photoURL = user.photoURL ? user.photoURL : defaultPhotoURL; // Use default if photoURL is invalid

      // Validate the URL before using it
      const isValidUrl = await validateImageUrl(photoURL);
      const finalPhotoURL = isValidUrl ? photoURL : defaultPhotoURL;

      dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: finalPhotoURL }));
      toast.success('Google sign-in successful!');
      navigate('/browse');
    } catch (error) {
      toast.error(`${error.code}: ${error.message}`);
    }
  };

  // Function to validate if an image URL exists
  const validateImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="relative h-screen w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('bg.jpg')" }}>
        <Header />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-6 mt-10 rounded-lg max-w-md w-full text-white backdrop-blur">
            <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <input
                  ref={email}
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="mb-4">
                <input
                  ref={password}
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {isSignUp && (
                <>
                  <div className="mb-4">
                    <input
                      ref={confirmPassword}
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full p-2 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      ref={name}
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-2 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                onClick={handleButtonClick}
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
            {!isSignUp && (
              <button
                onClick={handleGoogleSignIn}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-red-600 py-2 rounded-lg font-semibold mt-4 flex items-center justify-center"
              >
                <FaGoogle className="mr-2" /> Sign In with Google
              </button>
            )}
            <div className="mt-4 text-center">
              {isSignUp ? (
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <button onClick={toggleAuthMode} className="text-white hover:underline">
                    Sign In
                  </button>
                </p>
              ) : (
                <p className="text-gray-400">
                  New to MoodShow?{' '}
                  <button onClick={toggleAuthMode} className="text-white hover:underline">
                    Sign Up now
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
