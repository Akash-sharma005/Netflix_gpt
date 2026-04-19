import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import GptSearch from "./GptSearch";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
        }).catch((error) => {
            // An error happened.
            navigate("/error")
        });
    }

    const handleGptSearchClick = () => {
        //Toggle GPT Search 
        dispatch(toggleGptSearchView())
    }
    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                }))
                navigate("/browse")

            } else {
                dispatch(removeUser)
                navigate('/')
            }
        });
        //subscribe when component unmounts
        return () => unsubscribe()

    }, [])

    return (
        <div className="absolute z-10 flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black">
            <img
                className="w-44 "
                src={LOGO}
                alt="logo" />

            {user && (
                <div className="flex p-2">
                    {showGptSearch && (
                        <select className="p-2 m-2 text-white bg-gray-900"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) =>
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>)}
                        </select>)
                    }
                    <button
                        onClick={handleGptSearchClick}
                        className="px-4 py-2 mx-4 my-3 text-white bg-purple-700 rounded-lg">
                        {showGptSearch ? "Homepage" : "GPT Search"}
                    </button>

                    <img
                        className="w-12 h-12"
                        alt="usericon"
                        src={user.photoURL}
                    />
                    <button
                        onClick={handleSignOut}
                        className="font-bold text-white"
                    >(Sign Out)</button>
                </div>
            )}
        </div >
    )
}
export default Header;