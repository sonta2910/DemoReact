import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomeTour from "./tour/HomeTour";
import TourDetail from "./tour/TourDetail";
import FormCreate from "./tour/FormCreate";
import FormUpdate from "./tour/FormUpdate";
import DeleteTour from "./tour/DeleteTour"; // Import component từ file khác

function App() {

  return (
   <>
       <Routes>
           <Route path={"/create-tour"} element={<FormCreate/>}></Route>
           <Route path={"/update-tour/:id"} element={<FormUpdate/>}></Route>
           <Route path={"/delete-tour/:id"} element={<DeleteTour/>}></Route>
           <Route path={"/detail/:id"} element={<TourDetail/>}></Route>
           <Route path={"/"} element={<HomeTour/>}></Route>
       </Routes>
   </>
  );

}

export default App;
