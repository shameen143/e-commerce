import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../../Components/header/Header";
import Navbar from "../../Components/navbar/Navbar";
import { faArrowLeft, faArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import './hotel.css';
import MailList from "../../Components/mailList/MailList";
import Footer from "../../Components/footer/Footer";
import useFetch from "../../Hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../Components/Context/SearchContext";
import { AuthContext } from "../../Components/Context/AuthContext";
import Reserve from "../../Components/reserve/Reserve";




const Hotel=()=>{
  const location=useLocation();
  const id=location.pathname.split('/')[2];
  const[slideNumber,setSlideNumber]=useState(0);
  const[open,setOpen]=useState(false);
  const[openModel,setOpenModel]=useState(false);

  const{data,loading,error}=useFetch(`http://localhost:5000/api/hotels/find/${id}`);
  const{user}=useContext(AuthContext)
  const navigate=useNavigate()

  const {dates,options}=useContext(SearchContext);
  const MILLLESECONDS_PER_DAY=1000 * 60 *60 *24;

  function dayDifference(date1,date2){
    const timeDiff= Math.abs(date2.getTime()-date1.getTime());
    const diffDays=Math.ceil(timeDiff/MILLLESECONDS_PER_DAY);
    return diffDays;
  }
  const days=dayDifference(dates[0].endDate,dates[0].startDate);


      const handleOpen=(i)=>{
        setSlideNumber(i);
        setOpen(true);

      };
      const handleMove=(direction)=>{
        let newSlideNumber;
        if(direction==='l'){
          newSlideNumber=slideNumber===0 ? 5:slideNumber-1
        }else{
          newSlideNumber=slideNumber===5 ? 0:slideNumber+1
        }
        setSlideNumber(newSlideNumber)
      }
const handleClick=()=>{
  if(user){setOpenModel(true);

  }else{
    navigate('/login')
  }

}

    return(
        <div>
            <Navbar/>
            <Header type="list"/>
            {loading ? (
              "loading" 
              ):(
              <div className="hotelContainer">
              {open && (
                <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
                <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
                <div className="sliderWrapper">
                  <img src={data.photos[slideNumber]} alt="" className="sliderImg"></img>
                  </div>
                <FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>


              </div>
              )}
                <div className="hotelWrapper">
                  <button className="bookNow">Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span>{data.address}</span>
                        </div>
                        <span className="hotelDistance">Excellent location- {data.distance}m from center</span>
                        <span className="hotelPriceHighLight">
                            Book a stay over ${data.cheapestPrice} at this property and get a free airport texi
                        </span>
                        <div className="hotelImages">
                          {data.photos?.map((photo,i)=>(
                            <div className="hotelImgWrapper">
                              <img onClick={()=>handleOpen(i)} 
                              src={photo} alt="" 
                              className="hotelImg">

                              </img>
                              </div>

))}
                        </div>
                        <div className="hotelDetails">
                          <div className="hotelDetailsTexts">
                          <h1 className="hotelTitle">{data.title}</h1>
                          <p className="hotelDesc">Hotel description
                        {data.desc}
                          </p>
                          </div>
                          <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-nights stay!</h1>
                            <span>
                            Located in the real heart of Krakow, this property has an
                             excellent location score of 9.8!
                            </span>
                            <h2>
                              <b>${days * data.cheapestPrice * options.room}</b>({days} nights)
                            </h2>
                            <button onClick={handleClick}>Reserve or Book now!</button>
                              
                            </div>
                          </div>
                        </div>
                        <MailList/>
                        <Footer/>
                    </div>)}

                    {openModel && <Reserve setOpen={setOpenModel} hotelId={id}/>}
                </div>
            

  
    );
};
export default Hotel;