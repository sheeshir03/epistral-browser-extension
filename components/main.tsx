import { useEffect,useState } from "react"
import Cookies from "./cookies";

function Main() {
    const [currentUrl, setCurrentUrl] = useState("")


    async function getCurrentUrl() {
      let queryOptions = { active: true, lastFocusedWindow: true };
      // `tab` will either be a `tabs.Tab` instance or `undefined`.
      let [tab] = await chrome.tabs.query(queryOptions);
      setCurrentUrl(tab.url)
    }
  
    useEffect(()=>{
      getCurrentUrl();
    },[currentUrl])
  
    return (
      <Cookies></Cookies>
    )
  }

export default Main