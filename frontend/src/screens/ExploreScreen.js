import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"

function ExploreScreen() {
  const INITIAL_FORM_STATE = {
    state: "",
    query: "",
    NPOnly: false,
    list: false
  }
  const [formState, setFormState] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null ? JSON.parse(localExploreFormData) : INITIAL_FORM_STATE
  })

  const [state, setState] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null ? JSON.parse(localExploreFormData).state : ""
  })
  const [searchQuery, setSearchQuery] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null ? JSON.parse(localExploreFormData).query : ""
  })
  const [filterNPOnly, setFilterNPOnly] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null ? JSON.parse(localExploreFormData).NPOnly : false
  })
  const [listView, setListView] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null ? JSON.parse(localExploreFormData).list : false
  })

  const [data, setData] = useState([])
  // const [state, setState] = useState("")
  // const [searchQuery, setSearchQuery] = useState("")
  // const [filterNPOnly, setFilterNPOnly] = useState(false)
  // const [listView, setListView] = useState(false)
  const [loaded, setLoaded] = useState(true)

  const stateCodes = [
    { code: 'AL', name: "Alabama"},{ code: 'AK', name: "Alaska"},{ code: 'AZ', name: "Arizona"},{ code: 'AR', name: "Arkansas"},
    { code: 'CA', name: "California"},{ code: 'CO', name: "Colorado"},{ code: 'CT', name: "Connecticut"},{ code: 'DE', name: "Delaware"},
    { code: 'DC', name: "District Of Columbia"},{ code: 'FL', name: "Florida"},{ code: 'GA', name: "Georgia"},{ code: 'HI', name: "Hawaii"},
    { code: 'ID', name: "Idaho"},{ code: 'IL', name: "Illinois"},{ code: 'IN', name: "Indiana"},{ code: 'IA', name: "Iowa"},{ code: 'KS', name: "Kansas"},
    { code: 'KY', name: "Kentucky"},{ code: 'LA', name: "Louisiana"},{ code: 'ME', name: "Maine"},{ code: 'MD', name: "Maryland"},
    { code: 'MA', name: "Massachusetts"},{ code: 'MI', name: "Michigan"},{ code: 'MS', name: "Minnesota"},{ code: 'MO', name: "Missouri"},
    { code: 'MT', name: "Montana"},{ code: 'NE', name: "Nebraska"},{ code: 'NV', name: "Nevada"},{ code: 'NH', name: "New Hampshire"},
    { code: 'NJ', name: "New Jersey"},{ code: 'NM', name: "New Mexico"},{ code: 'NY', name: "New York"},{ code: 'NC', name: "North Carolina"},
    { code: 'ND', name: "North Dakota"},{ code: 'OH', name: "Ohio"},{ code: 'OK', name: "Oklahoma"},{ code: 'OR', name: "Oregon"},{ code: 'PA', name: "Pennsylvania"},
    { code: 'RI', name: "Rhode Island"},{ code: 'SC', name: "South Carolina"},{ code: 'SD', name: "South Dakota"},{ code: 'TN', name: "Tennessee"},{ code: 'TX', name: "Texas"},
    { code: 'UT', name: "Utah"},{ code: 'VT', name: "Vermont"},{ code: 'VA', name: "Virginia"},{ code: 'WA', name: "Washington"},
    { code: 'WV', name: "West Virginia"},{ code: 'WI', name: "Wisconsin"},{ code: 'WY', name: "Wyoming"},
  ]

  const getData = async() => {
    setLoaded(false)
    const base_url = 'https://developer.nps.gov/api/v1'
    // var endpoint_url = ''
    if(searchQuery !== ""){
      var endpoint_url = '/parks?stateCode='+ state + '&limit=999' + '&q='+ searchQuery +'&api_key=' + process.env.REACT_APP_API_KEY
    }else {
      var endpoint_url = '/parks?stateCode='+ state + '&limit=999' +'&api_key=' + process.env.REACT_APP_API_KEY
    }
    var url = base_url + endpoint_url
    
    const res = await axios.get(url)
    var data = res.data.data

    if(filterNPOnly){
      var filteredData = []
      for(var i = 0; i < data.length; i++){
        if(data[i].designation === "National Park"){
          filteredData.push(data[i])
        }
      }
      data = filteredData
    }

    setData(data)
    setLoaded(true)
    console.log(data)
  }
  
  // const handleFilterNPOnly = () => {
  //   setFilterNPOnly(!filterNPOnly)
  // }

  // const handleListView = () => {
  //   setListView(!listView)
  // }

  const handleFormChange = (e) => {
    const optionName = e.target.name
    const value = e.target.value

    switch(optionName){
      case 'parkState':
        setState(value)
        setFormState((prevState) => ({
          ...prevState,
          state: value,
        }))
        break;

      case 'query':
        setSearchQuery(value)
        setFormState((prevState) => ({
          ...prevState,
          query: value,
        }))
        break;

      case 'NPOnly':
        setFilterNPOnly(!filterNPOnly)
        setFormState((prevState) => ({
          ...prevState,
          NPOnly: !filterNPOnly,
        }))
        break;

      case 'list':
        setListView(!listView)
        setFormState((prevState) => ({
          ...prevState,
          list: !listView,
        }))
        break;
    }
  }
  
  useEffect(() => {
    if(formState){
      localStorage.setItem("explore-form", JSON.stringify(formState))
    } else {
      localStorage.setItem("explore-form", JSON.stringify(INITIAL_FORM_STATE))
    }
  }, [formState])

  return (
    <section className="bg-explore-image bg-cover bg-center bg-fixed p-5 min-h-screen">
      <div className="py-16 max-w-xl mx-auto text-center">
          <h1 className="mt-4 text-6xl font-bold text-gray-900">Explore Parks</h1>
      </div>
      
      <div className="bg-gray-200 shadow p-4 flex flex-col lg:flex-row mb-15 rounded mx-2 md:mx-4 lg:mx-12 xl:mx-16 2xl:mx-56">
        <select className="border border-6 border-solid border-black rounded py-4 px-2 my-2 lg:py-4 lg:mr-8" name="parkState" onChange={(e) => {
          handleFormChange(e)
        }}>
          <option value="" className="">  Select State</option>
          { stateCodes.map((state) => (
            <option selected={state.code === formState.state ? true: false} value={state.code} className="text-md w-auto">{state.name}</option>
          ))}
        </select>
        
        <input className="w-full rounded border border-3 border-solid border-black py-4 px-2 my-2 lg:py-0" type="text" placeholder="Search term..." value={formState !== "" ? formState.query : null} name="query" onChange={(e) => {
          handleFormChange(e)
        }}/>
        <button className="bg-green-500 hover:bg-green-400 rounded text-black py-4 my-2 lg:py-0 lg:px-4" onClick={() => getData()}>
          <p className="font-semibold text-lg lg:flex lg:flex-row"><i className="fas fa-search lg:p-1"></i> Search</p>
        </button>
        
        <label className="inline-flex items-center justify-center py-2 lg:pl-4 lg:w-48">
          <input type="checkbox" checked={filterNPOnly} onChange={handleFormChange} name="NPOnly" className="appearance-none border border-gray-400 rounded-lg h-6 w-6 lg:w-6 lg:h-4 checked:bg-green-500 checked:border-transparent"/>
          <span className="pl-2 text-gray-900 font-medium lg:text-sm lg:font-normal">National Parks Only</span>
        </label>

        <label className="inline-flex items-center justify-center py-2 lg:pl-4 lg:w-48">
          <input type="checkbox" checked={listView} onChange={handleFormChange} name="list" className="appearance-none border border-gray-400 rounded-lg h-6 w-6 lg:w-6 lg:h-4 checked:bg-green-500 checked:border-transparent"/>
          <span className="pl-2 text-gray-900 font-medium lg:text-sm lg:font-normal">Simple List View</span>
        </label>
        
      </div>
      
      { loaded ? (
        <div>
          { listView ? (
            <div className="">
              { data.map((park) => (
                <div className="grid grid-cols-3 border-solid border-2 border-gray-900 text-center mx-4 my-4 lg:mx-12 xl:mx-16 2xl:mx-56 bg-gray-200 bg-opacity-70 rounded-md">
                  <div className="py-4 text-gray-900 text-xl font-bold">{park.name}</div>
                  <div className="py-4 text-gray-900 text-md font-semibold">{park.designation}</div>  
                  <Link className="btn bg-yellow-500 bg-opacity-90 transform hover:scale-105 duration-350 py-3 w-32 h-10 text-center text-sm m-auto" to={`/explore/${park.parkCode}`}>View</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-3 xl:px-14 2xl:px-64">
              { data.map((park) => (
                <div className="p-4 w-auto relative h-48 my-6 md:h-56 xl:h-64 2xl:h-80">
                  <Link className="" to={`/explore/${park.parkCode}`}>
                    <div className="group w-full h-48 md:h-56 xl:h-64 2xl:h-80">
                      <img className="popular-explore-card object-cover w-full h-48 md:h-56 xl:h-64 2xl:h-80 opacity-90" src={park.images[0].url}/>
                      <div className="popular-explore-card-text top-6 right-8">{park.name}</div>
                    </div>
                  </Link>   
                </div>
              ))}
            </div>
          )}
        </div> )
        
        : 
        <div className="w-full relative py-16">
            <div className="text-center">
              <ClipLoader color={"white"} size={150} />
            </div>
        </div>
      }
      
    </section>
  );
}

export default ExploreScreen;
