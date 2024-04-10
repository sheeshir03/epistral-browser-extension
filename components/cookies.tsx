import { url } from "inspector";
import React, { useEffect, useState } from "react";

function Cookies() {
  const [cookies, setCookies] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [metaDescription, setMetaDescription] = useState("")
  const [history, setHistory] = useState([]);

  async function getCurrentCookies(url: string) {
    console.log(url);
    let details = { url }; // Simplified object literal
    let cookieDetails = await chrome.cookies.getAll(details);
    console.log(cookieDetails);
    setCookies(cookieDetails);
  }

  async function getCurrentUrl() {
    let queryOptions = {"url": "https://music.youtube.com/"};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    setCurrentUrl(tab.url);
    await getCurrentCookies(tab.url);
    console.log(tab.id)
    await getMetaTagDetails(tab.id)
    let visits = await chrome.history.getVisits({url:tab.url})
    console.log(visits);
    setHistory(visits)
  }

  async function getMetaTagDetails(tabId: number) {
    let metaDetails = await chrome.tabs.sendMessage(tabId, "getPageContent")
    console.log(metaDetails)
    setMetaDescription(metaDetails)
  }

  useEffect(() => {
    getCurrentUrl();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h1>------------------Website Details-----------------------</h1>
      <h2> Website Name {currentUrl}</h2>
      <h1>------------------Cookie Details------------------------</h1>
      {/* Iterate through cookies array and render h1 tags */}
      {cookies.map((cookie) => (
        <h3 key={cookie.name}>
          {cookie.name}: {cookie.value}
        </h3>
      ))}
      <h1>------------------visits----------------------</h1>
      <h3>
        visits: {history}
      </h3>
    </div>
  );
}

export default Cookies;
