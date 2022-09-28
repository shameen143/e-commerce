import React from "react";
import Featured from "../../Components/featured/Featured";
import FeaturedProperties from "../../Components/FeaturedProperties/FeaturedProperties";
import Header from "../../Components/header/Header";
import MailList from "../../Components/mailList/MailList";
import Navbar from "../../Components/navbar/Navbar";
import PropertyList from "../../Components/propertyList/PropertyList";
import Footer from "../../Components/footer/Footer";
import './home.css';


const Home=()=>{
    return(
        <div>
<Navbar/>
<Header/>
<div className="homeContainer">
    <Featured/>
    <h1 className="homeTitles">
        Browse By Property Type
    </h1>
    <PropertyList/>
    <h1 className="homeTitles">
        Home guests Love
    </h1>
    <FeaturedProperties/>
    <MailList/>
    <Footer/>
</div>
        </div>
    );
};
export default Home;