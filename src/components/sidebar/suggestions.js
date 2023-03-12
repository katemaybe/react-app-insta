import { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggestedprofile";
export default function Suggestions({userId, following, loggedInUserDocId}){
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
     async function suggestedProfiles(){
         const response = await getSuggestedProfiles(userId, following)
         setProfiles(response)
     }
     if(userId){
         suggestedProfiles()
        }
}, [userId]);

    return !profiles?(
    <Skeleton count={1} height={150} className="mt-5"/>
    ) : profiles.length>0?(
        <div className="rounded flex flex-col">
         <p className="font-bold text-gray-base">Suggestions for you</p>
         <div className="mt-4 grid gap-5">
            {profiles.map((profile) => (
                <SuggestedProfile
                key={profile.docId}
                profileDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
                loggedInUserDocId={loggedInUserDocId}

                />
            ))}
         </div>
        </div>
    
    ):null
}
Suggestions.propTypes = {
    useId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string

}