// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./Home";
// import Recommenders from "./Recommenders";
// import Faq from "./Faq";
// import Navbar from "./Navbar";
// import RecommendationPage from "./RecommendationPage";
// import DummyTest from "./DummyTest";
// import LoginPage from "./Authentication/LoginPage";
// import Signup from "./Authentication/Signup";

// function App() {
//   return (
//     <div className="">
//       <Navbar />
//       <Routes>
//         <Route exact path="/" Component={Home} />
//         <Route exact path="/login" Component={LoginPage} />
//         <Route exact path="/signup" Component={Signup} />
//         <Route path="/recommenders" Component={Recommenders} />
//         <Route path="faq" Component={Faq} />
//         <Route path="/recommenders/:id" Component={RecommendationPage} />
//       </Routes>

//       {/* -------------- */}
//       {/* <DummyTest/> */}
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import LoginPage from "./Authentication/LoginPage";
import Signup from "./Authentication/Signup";
import Home from "./Home";
import Recommenders from "./Recommenders";
import Faq from "./Faq";
import RecommendationPage from "./RecommendationPage";


function App() {
  const [token, setToken] = useState(document.cookie.includes('token'));
  const [gClick,setGClick]=useState(false)
  function googleClicked(){
    setGClick(true)
  }
  console.log(gClick)

  return (
    <div className="">
      <Navbar token={token} setToken={setToken} click={gClick} />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/recommenders"
          element={token ? <Recommenders /> : <Navigate to="/login" />}
        />
         <Route
          path="/recommenders/:id"
          element={token ? <RecommendationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/faq"
          element={token ? <Faq /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage setToken={setToken} googleClick={googleClicked}/>}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
