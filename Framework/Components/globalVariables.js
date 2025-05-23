import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
    const [doc, setDoc] = useState("");
    const [docID, setDocID] = useState("");
    const [userUID, setUserUID] = useState("");
    const [preloader, setPreloader] = useState(false);
    const [userInfo, setUserInfo] = useState({ image: "https://randomuser.me/api/portraits/men/16.jpg", firstname: "John", lastname: "Wick", email: "john@gmail.com" });
    const [PostData, setPostData] = useState({});


    return (
        <AppContext.Provider value={{
            doc, setDoc,
            docID, setDocID,
            userUID, setUserUID,
            userInfo, setUserInfo,
            preloader, setPreloader,
            PostData, setPostData,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider }