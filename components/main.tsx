import { useEffect,useState } from "react"

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
      <div
        style={{
          padding: 16
        }}>
        <h2>
          You are currently at {currentUrl}
        </h2>
      </div>
    )
  }

export default Main