import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import FirebaseContext from '../context/firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doesUsernameExists } from '../services/firebase';


export default function SignUp(){
    const navigate = useNavigate()
    const {firebase} = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setfullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password === ''|| emailAddress === '';

    const handleSignup = async(event) => {
        event.preventDefault();
        const usernameExists = await doesUsernameExists(username);
        if (!usernameExists.length){
        try{
            const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password)

            await createdUserResult.user.updateProfile({
               displayName: username 
            });

            await firebase.firestore().collection('users').add({
                userId: createdUserResult.user.uid,
                username: username.toLowerCase(),
                fullName,
                emailAddress: emailAddress.toLowerCase(),
                following: [],
                dateCreated: Date.now()
            })
            navigate(ROUTES.DASHBOARD)
        } catch(error) {
            setfullName('');
            setEmailAddress('');
            setPassword('');
            setError(error.message)

        }
    } else{
        setError('That username is already taken')
    }
    };
    useEffect(() => {
       document.title = 'Sign-Up - Instagram';
        
    }, []);

    return (
        <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
            <div className='flex w-3/5'>
            <img src='/images/iphone-with-profile.jpg' />
            </div>
            <div className='flex flex-col w-2/5'>
               <div className='flex flex-col'>
               <h1 className='flex justify-center w-full'>
                    <img src='/images/logo.png' className='mt-2 w-6/12 mb-4'/>
                </h1>
                {error&&<p className='mb-4 text-xs text-red-primary'>{error}</p>}
                

                <form onSubmit={handleSignup} method='POST'>
                <input
                    aria-label='Enter your username'
                    type='text'
                    placeholder='Username'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({target}) => setUsername(target.value)}
                    value={username}
                    />
                    <input
                    aria-label='Enter your full name'
                    type='text'
                    placeholder='Full name'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({target}) => setfullName(target.value)}
                    value={fullName}
                    />
                    <input
                    aria-label='Enter your email address'
                    type='text'
                    placeholder='Email address'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({target}) => setEmailAddress(target.value)}
                    value={emailAddress}
                    />
                    <input
                    aria-label='Enter your password'
                    type='password'
                    placeholder='Password'
                    className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
                    onChange={({target}) => setPassword(target.value)}
                    value={password}
                    />
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`bg-blue-medium text-black w-full rounded h-8 font-bold ${isInvalid &&'cursor-not-allowed opacity-50'}`
                }
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            <div className='flex fustify-center items-center flex-col w-full bg-white p-4 border border-gray-primary'>
                <p className='text-sm'>
                    Have an account ?
                </p>
                
                <Link to={ROUTES.LOGIN} className="font-bold">
                            Log in
                        </Link>
            </div>
               </div>
               
        </div>
        
        
    )
}

//text-red-primary 
//text-gray-base
//border-gray-primary