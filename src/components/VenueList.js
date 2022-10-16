import React from 'react'
import { useEffect, useState } from 'react';
import './VenuesList.css'

const VenueList = () => {
    const url = "https://sis.materdeicollege.com/api/venues";
    const [venues, setVenues] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectVenue, setSelectVenue] = useState(null);
    const [selection, setSelection] = useState(true);
    const [error, setError] = useState(null);

    //fetch data from api then display in on cards
    useEffect(() => {
        fetch(url)
        .then( res => {
            return res.json();
        })
        .then(data => {
            setVenues(data.venues)
            console.log(data)
            setLoading(false)
        })
        .catch(err => {
            setError(err.error)
        })
    }, [])

    
    const showSchedule = (id) => {
        fetch(url + '/' + id)
        .then(
            res => {
                if(!res.ok){
                    throw Error('Resource unavailable.')
                }
                return res.json()
            }
        )
        .then(
            data => {
                setSelectVenue(data)
                console.log(data)
            }
        )
        .catch(err => {
            setError(err.error)
        })
    }
  
  return (
    <div className='VenueList'> 
    <div className='row'>
        {loading && <h4>Loading...</h4>}
            {/* Venues List on the side */}
            <div className='col col-md-2 mx-3'>
                <h2 className='my-3'>Venues List</h2>
                <hr/>
                {venues && (
                    <div className='venues-list'>
                        {venues.map(venue => (
                            <div className='card my-2'>
                                <div className='card-header'> <strong>{venue.name}</strong></div>
                                <div className='card-body'>
                                    <div className='card-text'>{venue.building}</div>
                                    <div className='card-text'>{venue.capacity}</div>
                                    <button className='btn btn-primary float-end' onClick={() => showSchedule(venue.id)}>Schedule</button>
                                </div>
                            
                            </div>
                        ))}
                    </div>
                    
                )}
            </div>
            {/* schedule display - trigger when button on venues list clicked */}
            <div className='col col-md-8 my-3'  >
                <h2>Schedule</h2>
                <hr/>
                {selectVenue && (
                    <div className='cards' id='sched-cards'>
                            {selectVenue.schedules.map(sched => (
                                <div className='sched-cards'>
                                    <div class="card">
                                    <div className='card-header'> <strong>{sched.course_no}</strong></div>
                                        <ul class="list-group list-group-flush">
                                        <li class="list-group-item">{sched.description}</li>
                                        <li class="list-group-item">{sched.teacher}</li>
                                        <li class="list-group-item">{sched.schedule}</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                
                            ))}
                        
                    </div>
                )}
                
            </div>
    </div>
    
        
    </div>
  )
}

export default VenueList