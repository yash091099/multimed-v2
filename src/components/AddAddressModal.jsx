  import React, { useEffect, useRef, useState } from "react";
  import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
  import { useMemo } from "react";
  import AddressInput from "../components/AddressInput";
  import PrimaryButton from "../components/PrimaryButton";
  import Cross from "../assets/crossIcon.svg";
  import HomeIcon from "../assets/newAddress/homeIcon.svg";
  import ActiveHomeIcon from "../assets/newAddress/activeHomeIcon.svg";
  import WorkIcon from "../assets/newAddress/workIcon.svg";
  import ActiveWorkIcon from "../assets/newAddress/activeWorkIcon.svg";
  import { gql, useMutation, useQuery } from "@apollo/client";
  import {  toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import Loader from "./loader";
  const google = window.google;

  const CREATE_ADDRESS = gql`
    mutation createAddress(
      $houseNumber: String!
      $aptOrBuildingName: String!
      $streetOrAreaName: String!
      $city: String!
      $state: String!
      $pincode: String!
      $label: String
        ) {
      createAddress(
        input: {
          houseNumber: $houseNumber
          aptOrBuildingName: $aptOrBuildingName
          streetOrAreaName: $streetOrAreaName
          city: $city
          state: $state
          pincode: $pincode
          label: $label
        }
      ) {
        status
        message
      }
    }
  `;
  const UPDATE_ADDRESS = gql`
    mutation updateAddress(
      $houseNumber: String!
      $aptOrBuildingName: String!
      $streetOrAreaName: String!
      $city: String!
      $state: String!
      $pincode: String!
      $addressId: String!
      $label: String
    ) {
      updateAddress(
        input: {
          houseNumber: $houseNumber
          aptOrBuildingName: $aptOrBuildingName
          streetOrAreaName: $streetOrAreaName
          city: $city
          state: $state
          pincode: $pincode
          addressId: $addressId
          label: $label
        }
      ) {
        status
        message
      }
    }
  `;

  const GET_STATES = gql`
    query {
      getStates {
        status
        message
        states {
          id
          name
          iso2
        }
      }
    }
  `;

  const GET_CITIES_BY_STATE = gql`
    query GetCitiesByState($stateInput: String!) {
      getCitiesByState(input: $stateInput) {
        status
        message
        cities {
          id
          name
        }
      }
    }
  `;
  const AddAddressModal = ({ ref, address, setIsAddAddress, referctAdderss }) => {
    const [errors, setErrors] = useState({
      houseNumber: "",
      aptOrBuildingName: "",
      streetOrAreaName: "",
      pincode: "",
      city: "",
      state: "",
      label: "", // Assuming you need validation for label as well
    });
    const [houseNumber, setHouseNumber] = useState("");
    const [aptOrBuildingName, setBuildingName] = useState("");
    const [streetOrAreaName, setAreaName] = useState("");
    const [pincode, setPincode] = useState("");
    const [loadingg, setLoading] = useState(true);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState(Number());
    const [log, setLog] = useState(Number());
    const [other, setOtherValue] = useState("");
    const [label, setLabel] = useState(""); // New state for label

    const [selectedState, setSelectedState] = useState("");

    const { data: statesData, loading: statesLoading } = useQuery(GET_STATES,{
      onCompleted: (data) => {
        setLoading(false);
      },
      onError: (err) => {
        setLoading(false)
      }
    });
    const { data: citiesData, refetch } = useQuery(GET_CITIES_BY_STATE, {
      variables: { 
        stateInput: selectedState ? statesData.getStates.states.find(state => state.name === selectedState)?.iso2 : null 
      },
      skip: !selectedState, 
      onCompleted: (data) => {
        setLoading(false)
      },
      onError: (err) => {
        setLoading(false)
      }
    });
    

    const handleStateChange = (event) => {
      console.log(event.target.value)
      setSelectedState(event.target.value);
      setState(event.target.value)
      if(event.target.value){
        errors.state=false
      }
      setLoading(true);
      setCity(""); 
    };

    const [createAddress, { loading: createAddressLoading }] = useMutation(
      CREATE_ADDRESS,
      {
        variables: {
          houseNumber: houseNumber,
          aptOrBuildingName: aptOrBuildingName,
          streetOrAreaName: streetOrAreaName,
          city: city,
          state: state,
          pincode: pincode,
          label:label
        },
        onCompleted: (data) => {
          if (data.createAddress.status === "SUCCESS") {
            setLoading(false);

            toast.success("Address added successfully.");
            setIsAddAddress(false);
            referctAdderss();
            setHouseNumber("");
            setBuildingName("");
            setAreaName("");
            setPincode("");
            setCity("");
            setState("");
            setLabel("");
          } else {
            setLoading(false);

            toast.error("Error : Add Address ");
          }
        },
        onError: (err) => {
          setLoading(false);

          toast.error("Error : " + err?.message);

          // setBtnDisable(false)
          // setLoading(false)
        },
      }
    );
    const [updateAddress, { loading: updateAddressLoading }] = useMutation(
      UPDATE_ADDRESS,
      {
        variables: {
          houseNumber: houseNumber,
          aptOrBuildingName: aptOrBuildingName,
          streetOrAreaName: streetOrAreaName,
          city: city,
          state: state,
          pincode: pincode,
          addressId: address?.id,
          label:label
        },
        onCompleted: (data) => {
          if (data.updateAddress.status === "SUCCESS") {
            setLoading(false);

            toast.success("Address updated successfully.");
            setIsAddAddress(false);
            referctAdderss();
            format();
          } else {
            // format()
            setLoading(false);

            // setIsAddAddress(false);
            toast.error("Error : Add Address ");
          }
        },
        onError: (err) => {
          setLoading(false);

          // setIsAddAddress(false);
          toast.error("Error : " + err?.message);
          // format()
          // setBtnDisable(false)
          // setLoading(false)
        },
      }
    );

    const format = () => {
      setHouseNumber("");
      setBuildingName("");
      setAreaName("");
      setPincode("");
      setCity("");
      setState("");
      setLabel("");

    };

    useEffect(() => {
      if (address) {
        setHouseNumber(address.houseNumber || "");
        setBuildingName(address.aptOrBuildingName || "");
        setAreaName(address.streetOrAreaName || "");
        setPincode(address.pincode || "");
        setCity(address.city || "");
        setState(address.state || "");

        // Set the label and active state based on the existing address label
        if (address.label === 'home' || address.label === 'work') {
          setLabel(address.label);
          setActive(workAddressButtons.find(item => item.name === address.label).id);
        } else {
          setLabel(address.label);
          setActive(3); // Assuming '3' is the ID for 'Other'
          setOtherValue(address.label); // Set 'Other' input field if the label is not 'home' or 'work'
        }
      }
    }, [address]);
    function getCurrentLocation() {
      return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              resolve({ latitude, longitude });
            },
            (error) => {
              reject(error.message);
            }
          );
        } else {
          reject("Geolocation is not supported by this browser.");
        }
      });
    }

    function getAddressDetails(lat, lng) {
      console.log(lat, lng);
      return new Promise((resolve, reject) => {
        const apiKey = "AIzaSyAPQet3EZDhETQWpi-q_NWnQEm4zLEuwog";
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

        fetch(geocodingUrl)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "OK" && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              let city = "";
              let state = "";

              for (const component of addressComponents) {
                if (component.types.includes("locality")) {
                  city = component.long_name;
                } else if (
                  component.types.includes("administrative_area_level_1")
                ) {
                  state = component.long_name;
                }
              }

              if (city && state) {
                console.log(`City: ${city}, State: ${state}`);
                resolve({ city, state });
              } else {
                console.log(`City:`);
                reject("City or State not found");
              }
            } else {
              reject("No results found");
            }
          })
          .catch((error) => {
            reject(`Error fetching address details: ${error}`);
          });
      });
    }
    useEffect(() => {
      if (address && statesData) {
        const stateIso2 = statesData.getStates.states.find(s => s.name === address.state)?.iso2;
        if (stateIso2) {
          console.log(stateIso2)
          setSelectedState(address.state);
          setState(address.state);
        }
      }
    }, [address, statesData]);

    useEffect(() => {
      console.log(selectedState,'++++++++++++++====++++==+++===++++==++++==++++==+++===+++===+++===+++==+++===++')
      if (selectedState) {
        refetch()
      }
    }, [selectedState]);

    useEffect(() => {
      getCurrentLocation()
        .then((location) => {
          setLat(location.latitude);
          setLog(location.longitude);
          console.log("Latitude:", location.latitude);
          console.log("Longitude:", location.longitude);

          // getAddressDetails(location.latitude,location.longitude)
          getAddressDetails(location.latitude, location.longitude)
            .then((addressDetails) => {
              console.log("Address Details:", addressDetails);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error("Error getting location:", error);
        });
    }, []);
    const [active, setActive] = useState(0);
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyAPQet3EZDhETQWpi-q_NWnQEm4zLEuwog",
    });
    const center = useMemo(() => ({ lat: lat, lng: log }), []);
    const [markerPosition, setMarkerPosition] = useState(center);

    const workAddressButtons = [
      { id: 1, name: "home", icon: HomeIcon, activeIcon: ActiveHomeIcon },
      { id: 2, name: "work", icon: WorkIcon, activeIcon: ActiveWorkIcon },
    ];

    const otherButtons = [{ id: 3, name: "other", icon: null, activeIcon: null }];

    let modalRef = useRef();

    useEffect(() => {
      let handler = (e) => {
        if (!modalRef.current.contains(e.target)) {
          setIsAddAddress(false);
        }
      };

      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }, [setIsAddAddress]);

    if (loadError) {
      return <div>Error loading Google Maps</div>;
    }

    // saveAddress(){
    //   console.log()
    // }

    const handleProfileInputChange = (inputValue, type) => {
      if (type === "label") {
        setOtherValue(inputValue); // Correctly update 'other' state
      }
      console.log(`Input value changed: ${inputValue}, ${type}`);
      if (type === "houseNumber") {
        if (inputValue?.trim()) {
          errors.houseNumber = false;
        } else {
          errors.houseNumber = true;
        }
        setHouseNumber(inputValue);
      }
      if (type === "label") {
        setLabel(inputValue);
      }
      if (type === "aptOrBuildingName") {
        if (inputValue?.trim()) {
          errors.aptOrBuildingName = false;
        } else {
          errors.aptOrBuildingName = true;
        }
        setBuildingName(inputValue);
      }
      if (type === "streetOrAreaName") {
        if (inputValue?.trim()) {
          errors.streetOrAreaName = false;
        } else {
          errors.streetOrAreaName = true;
        }
        setAreaName(inputValue);
      }
      if (type === "pincode") {
        if (inputValue?.trim()) {
          errors.pincode = false;
        } else {
          errors.pincode = true;
        }
        setPincode(inputValue);
      }
      if (type === "city") {
        if (inputValue?.trim()) {
          errors.city = false;
        } else {
          errors.city = true;
        }
        setCity(inputValue);
      }
      if (type === "state") {
        if (inputValue?.trim()) {

          errors.state = false;
        } else {
          errors.state = true;
        }
        setState(inputValue);
      }
    };
    const validateForm = () => {
      const newErrors = {};
      let isValid = true;

      if (!houseNumber.trim()) {
        newErrors.houseNumber = true;
        isValid = false;
      }
      if (!aptOrBuildingName.trim() ) {
        newErrors.aptOrBuildingName = true;
        isValid = false;
      }
      if (!streetOrAreaName.trim()) {
        newErrors.streetOrAreaName = true;
        isValid = false;
      }
      if (!pincode.trim() || !/^\d{6}$/.test(pincode)) {
        // Checks for exactly 6 digits
        newErrors.pincode = true;
        isValid = false;
      }
      if (!city.trim() ) {
        newErrors.city = true;
        isValid = false;
      }
      if (!state.trim() ) {
        newErrors.state = true;
        isValid = false;
      }
      if (active === 3 && !other.trim()) {
        // Validate 'other' field when 'Other' is selected
        isValid = false;
      }
      setErrors(newErrors);
      return isValid;
    };


    const saveInputs = () => {
      let responseObj = {
        houseNumber: houseNumber,
        aptOrBuildingName: aptOrBuildingName,
        streetOrAreaName: streetOrAreaName,
        pincode: pincode,
        city: city,
        state: selectedState,
        label: label, // Include label in the response object
      };
      console.log(
        responseObj,
        active,
        "++++++++++++=====++++===+++====+++====+++==========+++====+++====++====++=="
      );
      if (!validateForm() || (active === 3 && !other.trim())) {
        toast.error("Please fill all the required fields.");
        return;
      }
      // Proceed with creating address
      console.log(responseObj, "Address response object");
      const finalLabel = active === 3 ? other : label;


      if (address) {
        setLoading(true);
        updateAddress({
          variables: {
            // ... Other variables
            label: finalLabel,
          },
        });
      } else {
        setLoading(true);
        createAddress({
          variables: {
            // ... Other variables
            label: finalLabel,
          },
        });
      }
    
      console.log(
        responseObj,
        active,
        "++++++++++++=====++++===+++====+++====+++==========+++====+++====++====++=="
      );
    };

    return (
      <div
        ref={ref}
        className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
      >
        {loadingg && <Loader />}
        <div
          ref={modalRef}
          className="w-[45.25rem] h-[45.25rem] border border-[#CBD5E1] flex flex-col justify-center max-w-[54.5rem] rounded-xl p-4 gap-3 bg-white shadow-login"
        >
          <div className="w-full py-2 px-4 flex justify-between items-center gap-2">
            <h1 className="font-HelveticaNeueMedium">
              {!address ? "Add a New" : "Update"} Address
            </h1>
            <button
              onClick={() => {
                format();
                setIsAddAddress(false);
              }}
            >
              <img src={Cross} alt="cross icon" className="h-6 w-6" />
            </button>
          </div>
          <div className="maps">
            {isLoaded ? (
              <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
                onLoad={(map) => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      };
                      // setLat(position.coords.latitude)
                      // setLog(position.coords.longitude)
                      console.log("Initial Position: ", pos);

                      // Set initial marker position
                      setMarkerPosition(pos);

                      // Create the marker inside the geolocation callback
                      const marker = new window.google.maps.Marker({
                        position: pos,
                        map: map,
                        draggable: true,
                        title: "Drag to specify your address",
                      });

                      // Add a listener for the dragend event
                      marker.addListener("dragend", (event) => {
                        const newPos = {
                          lat: event.latLng.lat(),
                          lng: event.latLng.lng(),
                        };
                        // setLat(event.latLng.lat())
                        // setLog(event.latLng.lng())
                        console.log("Marker Position: ", newPos);

                        // Update marker position state
                        setMarkerPosition(newPos);
                      });
                    });
                  }
                }}
              />
            ) : (
              <h1>Loading...</h1>
            )}
          </div>

          <div className="flex gap-2">{/* State Dropdown */}</div>

          <div className="flex gap-2">
            <AddressInput
              values={houseNumber}
              big
              isError={errors.houseNumber}
              onInputChange={(input) => {
                handleProfileInputChange(input, "houseNumber");
              }}
              title="house number"
            />
            <AddressInput
              values={aptOrBuildingName}
              big
              isError={errors.aptOrBuildingName}
              onInputChange={(input) => {
                handleProfileInputChange(input, "aptOrBuildingName");
              }}
              title="Apartment/Building Name"
            />
          </div>

          <AddressInput
            values={streetOrAreaName}
            big
            isError={errors.streetOrAreaName}
            onInputChange={(input) => {
              handleProfileInputChange(input, "streetOrAreaName");
            }}
            title="Street/Area Name"
          />

          <div className="flex gap-2">
            <AddressInput
              values={pincode}
              big
              isError={errors.pincode}
              onInputChange={(input) => {
                handleProfileInputChange(input, "pincode");
              }}
              title="pincode"
            />
            {/* <AddressInput values={state}  big isError={errors.state} onInputChange={(input)=>{handleProfileInputChange(input,'state')}} title="state" />
            <AddressInput values={city}  big isError={errors.city} onInputChange={(input)=>{handleProfileInputChange(input,'city')}} title="city" /> */}

  <div className="relative w-full">
  <label
          className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B] capitalize"
          htmlFor={'State'}
        >
          {'State'}
        </label>
      <select
        value={selectedState}
        onChange={handleStateChange}
        className="w-full border border-[#CBD5E1] rounded-md py-2 px-3 bg-white shadow appearance-none focus:outline-none focus:ring-2 focus:ring-[#FBA79B] focus:border-transparent"
      >
        <option value="" disabled>Select State</option>
        {statesData && statesData.getStates.states &&
          statesData.getStates.states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
      </select>
      <div   className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.59 7L10 11.41 14.41 7 16 8.41l-6 6-6-6z" />
        </svg>
      </div>
      {errors.state && <p style={{marginTop:"12px"}} className="text-[#EF4444] text-xs">Error: Invalid State</p>}

    </div>

    {/* City Dropdown */}
    <div className="relative w-full">
    <label
          className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B] capitalize"
          htmlFor={'City'}
        >
          {'City'}
        </label>
      <select
        value={city}
        onChange={(e) =>{ errors.city=false; setCity(e.target.value)}}
        className="w-full border border-[#CBD5E1] rounded-md py-2 px-3 bg-white shadow appearance-none focus:outline-none focus:ring-2 focus:ring-[#FBA79B] focus:border-transparent"
      >
        <option value="" disabled>Select City</option>
        {citiesData && citiesData.getCitiesByState.cities &&
          citiesData.getCitiesByState.cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.59 7L10 11.41 14.41 7 16 8.41l-6 6-6-6z" />
        </svg>
      </div>
      {errors.city && <p style={{marginTop:"12px"}} className="text-[#EF4444] text-xs">Error: Invalid City</p>}
    </div>


          </div>

          <div className="flex flex-col gap-1 py-2">
            <h1 className="text-[0.625rem] font-HelveticaNeueItalic">
              Select a Label :
            </h1>

            <div className="flex gap-4">
              {active !== 3 ? (
                <div className="flex gap-4">
                  {workAddressButtons.map((item, idx) => {
                    return (
                      <button
                      onClick={() => {
                        setActive(item.id);
                        setLabel(item.name); // Set label when a predefined label is selected
                      }}
                        className={`${
                          active !== item.id ? " bg-white" : "bg-[#FBA79B]"
                        } flex justify-center items-center gap-1 w-[8.25rem] rounded-full border border-[#FBA79B] py-2 px-1`}
                      >
                        {item.icon !== null ? (
                          <img
                            src={active === item.id ? item.activeIcon : item.icon}
                            alt="icon"
                            className="h-4 w-4"
                          />
                        ) : null}

                        <h1
                          className={`${
                            active === item.id ? " text-white" : "text-[#FBA79B]"
                          } text-[0.875rem] font-HelveticaNeueMedium capitalize`}
                        >
                          {item.name}
                        </h1>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <div>
                <button
                  onClick={() => {
                    setActive(active === 3 ? 0 : 3);
                  }}
                  className={`${
                    active !== 3 ? " bg-white" : "bg-[#FBA79B]"
                  } flex justify-center items-center gap-1 w-[8.25rem] rounded-full border border-[#FBA79B] py-2 px-1`}
                >
                  <h1
                    className={`${
                      active === 3 ? " text-white" : "text-[#FBA79B]"
                    } text-[0.875rem] font-HelveticaNeueMedium capitalize`}
                  >
                    Other
                  </h1>
                </button>
              </div>
              {active === 3 && (
      <input
        type="text"
        name="other"
        id="other"
        value={other}
        onInput={(e) => handleProfileInputChange(e.target.value, "label")}
        placeholder="Add name"
        className="w-full outline-none text-[0.875rem] font-HelveticaNeueLight placeholder:text-[#64748B] capitalize"
        required={active === 3} // Make input required when Other is selected
      />
    )}
            </div>
          </div>

          <PrimaryButton
            handleClick={saveInputs}
            title={!address ? "SAVE" : "UPDATE"}
          />
        </div>
      </div>
    );
  };

  export default AddAddressModal;
