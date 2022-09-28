import React from "react";
import Header from "../../Components/header/Header";
import Navbar from "../../Components/navbar/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
import { DateRange } from "react-date-range";
import './list.css';
import SearchItem from "../../Components/Searchitem/SearchItem";


const List=()=>{
   const location=useLocation();
    const[destination,setDestination]=useState(location.state.destination);
    const[date,setDate]=useState(location.state.date);
    const[options,setOptions]=useState(location.state.options);
    const[openDate,setOpenDate]=useState(false)


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
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate &&(
              <DateRange onChange={(item)=>setDate([item.selection])}
              minDate={new Date()}
              ranges={date}>
              
              </DateRange>
)}
            </div>
            <div className="IsItem">
                <label>options</label>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                        Min Price<small>per Night</small>
                    </span>
                    <input type="number" className="IsOptionInput"></input>
                </div>
                <div className="IsOptionItem">
                    <span className="IsOptionText">
                        Max Price<small>per Night</small>
                    </span>
                    <input type="number" className="IsOptionInput"></input>
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
            <button>Search</button>
            </div>
            
    
        <div className="ListResult">
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            </div>

        </div>

</div>
        </div>
    );
};
export default List;
