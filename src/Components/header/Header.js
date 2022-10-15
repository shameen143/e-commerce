import { faBed, faCalendarDay, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useState } from "react";
import './header.css';
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Context/SearchContext";

import  {AuthContext}  from "../Context/AuthContext";

const Header = ({type}) => {
    const[destination,setDestination]=useState("")
    const [openDates, setOpenDates] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const {user} = useContext(AuthContext);


    const navigate=useNavigate();
    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === 'i' ? options[name] + 1 : options[name] - 1,
            };

        });
    };

    const {dispatch}=useContext(SearchContext)

    const handleSearch=()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
        navigate('/hotels' , {state:{destination,dates,options}});

    };
    return (
        <div className="header">
            <div className={type=== 'list' ? "headerContainer listMode":"headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attraction</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport Taxi</span>
                    </div>
                </div>
                {type !== "list"  && (
            <>
                <h1 className="headertitle">A lifetime discount?its a genius</h1>
                <p className="headerDesc">
                    Get Rewarded for your travels unlock instant saving of 10% or more with a free lamabooking account
                </p>
               {!user &&  <button className="headerBtn">Sign in /Register</button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon" />
                        <input type="text" 
                        placeholder="where are you going" 
                        className="headerSeacrhinput"  onChange={(e)=>setDestination(e.target.value)}>
                           

                        </input>
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDay} className="headerIcon" />
                        <span onClick={() => setOpenDates(!openDates)} className="headerSearchText">{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
                        {openDates && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date"
                        />
                        }
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={()=>setOpenOptions(!openOptions)}className="headerSearchText">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                        {openOptions && <div className="option">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.adult <= 1}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.children <= 0}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.room <= 1}
                                        className="optionCounterButton"
                                        onClick={() => handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                        </div>

                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                        </div>
                
                    </div>
</>
                    
                   )} 
        
            </div>
            
        </div>
                
    );
};
export default Header;