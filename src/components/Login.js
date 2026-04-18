import { useRef, useState } from "react";
import Header from "./Header"
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null)
    const password = useRef(null)

    const handleButtonClick = () => {
        //validate the form data 
        const msg = checkValidData(email.current?.value, password.current?.value);
        setErrorMessage(msg);
        if (msg) return;

        //SignIn/SignUp User logic
        if (!isSignInForm) {
            //Sign Up logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current?.value,
                        photoURL:USER_AVATAR
                    }).then(async() => {
                        await user.reload()
                        const updatedUser=auth.currentUser
                        const { uid, email, displayName, photoURL } = updatedUser
                        // Profile updated!
                        dispatch(
                            addUser({
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL
                            }))
                        // navigate("/browse")
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                    });

                    // navigate("/browse")

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage)
                });
        }
        else {
            //Sign In logic 
            // const auth = getAuth();
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage)
                });
        }

    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div >
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background-image" />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute left-0 right-0 w-3/12 p-12 mx-auto text-white bg-black rounded-lg my-36 bg-opacity-85">
                <h2
                    className="py-4 text-3xl font-bold">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h2>
                {!isSignInForm && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 my-4 text-sm bg-gray-700"
                    />)}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 my-4 text-sm bg-gray-700"
                />

                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 my-4 text-sm bg-gray-700"
                />
                <p className="py-2 text-lg font-bold text-red-600">
                    {errorMessage}
                </p>
                <button
                    onClick={handleButtonClick}
                    className="w-full p-3 my-6 text-sm bg-red-700 rounded-lg">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4 cursor-pointer"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm ?
                        "New to netflix?  Sign Up" :
                        "Already registered? Sign In Now."}
                </p>

            </form>
        </div>
    )
}
export default Login