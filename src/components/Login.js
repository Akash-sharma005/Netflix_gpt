import { useState } from "react";
import Header from "./Header"

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div >
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="background-image" />
            </div>
            <form className="absolute left-0 right-0 w-3/12 p-12 mx-auto text-white bg-black rounded-lg my-36 bg-opacity-85">
                <h2
                    className="py-4 text-3xl font-bold">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h2>
                {!isSignInForm && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 my-4 text-sm bg-gray-700"
                    />)}
                <input
                    type="text"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 my-4 text-sm bg-gray-700"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 my-4 text-sm bg-gray-700"
                />
                <button
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