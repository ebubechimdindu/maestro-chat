import { useSSO } from "@clerk/expo";
import { useState } from "react";

export default function useSocialAuth() {
    const { startSSOFlow } = useSSO()
     const [loadingStrategy, setLoadingStrategy] = useState<boolean>(false);


    const handleGoogleAuth = async () => {
        if(loadingStrategy) return
        setLoadingStrategy(true)
        try {
            const { createdSessionId, setActive,authSessionResult } = await startSSOFlow({
                strategy: 'oauth_google',
                redirectUrl: "maestrochat://(tabs)"
            })

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
            }
        } catch (err) {
            console.log(err)
        }finally{
            setLoadingStrategy(false)
        }
    }

    const handleAppleAuth = async () => {
        if(loadingStrategy) return
        setLoadingStrategy(true)
        try {
            const { createdSessionId, setActive } = await startSSOFlow({
                strategy: 'oauth_apple',
                 redirectUrl: "maestrochat://(tabs)"
            })

            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
            }
        } catch (err) {
            console.log(err)
        }finally{
            setLoadingStrategy(false)
        }
    }

    return {
        handleGoogleAuth,
        handleAppleAuth,
        loadingStrategy
    }
}