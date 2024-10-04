import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidity } from '../utils/Validate';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, updateProfile } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleAuthMode = () => {
    setIsSignUp((prevMode) => !prevMode);
    setErrorMessage(''); // Clear error message on mode switch
  };

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidity(email.current.value, password.current.value);

    if (message) {
      // Set error message if validation fails
      setErrorMessage(message);
      return; // Return early if there is a validation error
    }

    // Sign-in or sign-up
    if (isSignUp) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name?.current?.value,
          photoURL: USER_AVATAR,
        })
        .then(() => {
          const { uid, email, displayName, photoURL } = user;
          dispatch(addUser({ uid, email, displayName, photoURL }));
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          setErrorMessage(error.message);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", error);
        setErrorMessage(`${errorCode}: ${errorMessage}`);
      });

    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    }
  };

  return (
    <div className="z-50relative h-screen w-full bg-cover bg-center " style={{ backgroundImage: "url('bg.jpg')" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
      <Header />
      <div className="z-0 absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 p-8 mt-10 rounded-lg max-w-md w-full text-white backdrop-blur">
          <h2 className="text-3xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <input
                ref={email}
                type="email"
                placeholder="Email or phone number"
                className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-4">
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {isSignUp && (
              <div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg bg-gray-700 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 text-red-500 font-semibold">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
              onClick={handleButtonClick}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8">
            {isSignUp ? (
              <p className="text-gray-400">
                Already have an account?{' '}
                <button onClick={toggleAuthMode} className="text-white hover:underline">
                  Sign In
                </button>.
              </p>
            ) : (
              <p className="text-gray-400">
                New to MoodShow?{' '}
                <button onClick={toggleAuthMode} className="text-white hover:underline">
                  Sign Up now
                </button>.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
