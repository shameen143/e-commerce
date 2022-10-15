import React from "react";
import Header from "../../Components/header/Header";
import Navbar from "../../Components/navbar/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
import { DateRange } from "react-date-range";
import './list.css';
import SearchItem from "../../Components/Searchitem/SearchItem";
import useFetch from "../../Hooks/useFetch";


const List=()=>{
   const location=useLocation();
    const[destination,setDestination]=useState(location.state.destination);
    const[dates,setDates]=useState(location.state.dates);
    const[options,setOptions]=useState(location.state.options);
    const[openDate,setOpenDate]=useState(false);
    const[min,setMin]=useState(undefined);
    const[max,setMax]=useState(undefined);
    const{data,loading,error,reFetch}=useFetch(`http://localhost:5000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

const handleClick=()=>{
    reFetch();
};
    return(
        <div>
<Navbar/>
<Header type="list"/>
<div className="ListContainer">
    <div className="ListWrapper">
        <div className="ListSearch">
            <h1 className="Istitle">Search</h1>
            <div className="IsItem">
                <label>Destination</label>
                <div className="IsOption">
                <input type="text" placeholder={destination} ></input>
            </div>
            <div className="IsItem">
                <label>Check-In Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate &&(
              <DateRange onChange={(item)=>setDates([item.selection])}
              minDate={new Date()}
              ranges={dates}>
              
              </DateRange>
)}
            </div>
            <div className="IsItem">
                <label>options</label>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                        Min Price<small>per Night</small>
                    </span>
                    <input type="number"  onChange={(e)=>setMin(e.target.value)} className="IsOptionInput"></input>
                </div>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                        Max Price<small>per Night</small>
                    </span>
                    <input type="number" onChange={(e)=>setMax(e.target.value)} className="IsOptionInput"></input>
                </div>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                        Adult
                    </span>
                    <input type="number" min={1}className="IsOptionInput" placeholder={options.adult}></input>
                </div>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                        Children
                    </span>
                    <input type="number" min={0} className="IsOptionInput" placeholder={options.childre}></input>
                </div>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                    Room
                    </span>
                    <input type="number" min={1} className="IsOptionInput" placeholder={options.room}></input>
                </div>
            </div>
            </div>
            <button onClick={handleClick}>Search</button>
            </div>
            
    
        <div className="ListResult">
            {loading ? ("loading" 
            ): (
            <>
            {data.map((item)=>(
              <SearchItem  item={item} key={item._id}/>
            ))}
               
                </>)}
            </div>

        </div>

</div>
        </div>
    );
};
export default List;
