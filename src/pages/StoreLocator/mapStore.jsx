import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import Hikstore from "../../assets/storeLocatorAssets/Hikstoremarket.png";
import MeUbi from "../../assets/storeLocatorAssets/MetMarket.png";
import ItemStore from "./itemStore.jsx";
import L from "leaflet";
import stores from './storeData.js';
import "leaflet/dist/leaflet.css";
import "./MapStore.css";

const HikIcon = L.icon({
  iconUrl: Hikstore,
  iconSize: [21, 29],
  iconAnchor: [10, 29],
  popupAnchor: [0, -29],
});


const userIcon = L.icon({
  iconUrl: MeUbi,
  iconSize: [27, 35],
  iconAnchor: [10, 35],
  popupAnchor: [0, -35],
});

const CustomZoomControl = () => {
  const map = useMap();
  useEffect(() => {
    if (!map.zoomControl) {
      L.control.zoom({ position: "topright" }).addTo(map);
    }
  }, [map]);
  return null;
};

const MapUpdater = ({ position, selectedStore }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedStore) {
      map.setView(selectedStore.position, 15);
    } else if (position) {
      map.setView(position, 13);
    }
  }, [position, selectedStore, map]);

  return null;
};

const MapStore = () => {
  const [position, setPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [searchAddress, setSearchAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isInstaller, setIsInstaller] = useState(false);
  const [isEndUser, setIsEndUser] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(0);
  const [storesInRange, setStoresInRange] = useState([]);
  const [tempIsInstaller, setTempIsInstaller] = useState(false);
  const [tempIsEndUser, setTempIsEndUser] = useState(false);
  const [tempSelectedDistance, setTempSelectedDistance] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setPosition([4.7110, -74.0721]);
        }
      );
    } else {
      setPosition([4.7110, -74.0721]);
    }
  }, []);

  const applyFilters = () => {
    setSelectedDistance(tempSelectedDistance);
    if (position) {
      const filteredStores = stores.filter(store => {
        const distance = L.latLng(position).distanceTo(L.latLng(store.position)) / 1000;
        return tempSelectedDistance === 0 || distance <= tempSelectedDistance;
      });
      setStoresInRange(filteredStores);
      setIsSidebarOpen(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=CO&q=${searchAddress}`);
    const data = await response.json();
    setIsLoading(false);
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
    } else {
      alert("Location not found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = async (e) => {
    setSearchAddress(e.target.value);
    if (e.target.value.length > 2) {
      setIsLoading(true);
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=CO&q=${e.target.value}`);
      const data = await response.json();
      const storeSuggestions = stores.filter(store => store.name.toLowerCase().includes(e.target.value.toLowerCase()));
      const combinedSuggestions = [...data, ...storeSuggestions];
      setSuggestions(combinedSuggestions);
      setIsLoading(false);
    } else {
      setSuggestions([]);
    }
  };

  const handleUserTypeSelection = () => {
    setShowUserTypeModal(false);
    setShowLocationModal(true);
  };

  const handleLocationPermission = (permission) => {
    if (!permission) {
      setPosition([4.7110, -74.0721]);
    }
    setShowLocationModal(false);
  };

  const handleDistanceChange = (distance) => {
    setTempSelectedDistance(tempSelectedDistance === distance ? 0 : distance);
  };

  const filteredStores = stores.filter(store =>
    (isInstaller && store.forInstaller) || (isEndUser && store.forEndUser)
  );

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setSelectedMarker(store.position);
  };

  const handleCloseStore = () => {
    setSelectedStore(null);
    setSelectedMarker(null);
  };

  return (
    <div className="map-container">
      {showUserTypeModal && (
        <div className="store-Modal">
          <div className="modal-card">
            <h3>Are you an installer or end user?</h3>
            <div className="checkbox-group">
              <label className="storeModal-checkbox">
                <input type="checkbox" onChange={() => setIsInstaller(!isInstaller)} />
                <span className="storeModal-slider"></span>
                Installer
              </label>
              <label className="storeModal-checkbox">
                <input type="checkbox" onChange={() => setIsEndUser(!isEndUser)} />
                <span className="storeModal-slider"></span>
                End User
              </label>
            </div>
            <div className="button-group">
              <button className="storeModal-cancel-btn" onClick={() => handleUserTypeSelection()}>Cancel</button>
              <button className="storeModal-accept-btn" onClick={() => handleUserTypeSelection()}>Accept</button>
            </div>
          </div>
        </div>
      )}
      {showLocationModal && (
        <div className="store-Modal">
          <div className="modal-card">
            <h3 className="p-0 m-0">Will you allow us to get your location?</h3>
            <p>We will use your location only to identify and show you the stores closest to you. Your information will be treated securely and will not be used for other purposes.</p>
            <div className="button-group">
              <button className="storeModal-cancel-btn" onClick={() => handleLocationPermission(false)}>No</button>
              <button className="storeModal-accept-btn" onClick={() => handleLocationPermission(true)}>Yes</button>
            </div>
          </div>
        </div>
      )}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between ps-4">
          <h3>Filters</h3>
          <i className="fa-solid fa-xmark fs-3 pb-4 cursor-pointer" onClick={toggleSidebar}></i>
        </div>
        <div className="sidebar-content">

          <div className="pb-3 store-BorderBottomGray">
            <h4 className="py-3">Nearby Location</h4>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                5 km
              </p>
              <input type="checkbox" checked={tempSelectedDistance === 5} onChange={() => setTempSelectedDistance(tempSelectedDistance === 5 ? 0 : 5)} />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                10 km
              </p>
              <input type="checkbox" checked={tempSelectedDistance === 10} onChange={() => setTempSelectedDistance(tempSelectedDistance === 10 ? 0 : 10)} />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                20 km
              </p>
              <input type="checkbox" checked={tempSelectedDistance === 20} onChange={() => setTempSelectedDistance(tempSelectedDistance === 20 ? 0 : 20)} />
            </label>
          </div>

          <div className="pb-3 store-BorderBottomGray">
            <h4 className="py-3">Opening Hours</h4>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Open now
              </p>
              <input type="checkbox" />
            </label>
          </div>

          <div className="pb-3 store-BorderBottomGray">
            <h4 className="py-3">Products</h4>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                PTZ
              </p>
              <input type="checkbox" />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Alarms
              </p>
              <input type="checkbox" />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Anticorrosion
              </p>
              <input type="checkbox" />
            </label>
          </div>

          <div className="pb-3 store-BorderBottomGray">
            <h4 className="py-3">Additional Services</h4>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Installation
              </p>
              <input type="checkbox" />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Technical Support
              </p>
              <input type="checkbox" />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Product demonstrations
              </p>
              <input type="checkbox" />
            </label>
          </div>

          <div className="pb-3 store-BorderBottomGray">
            <h4 className="py-3">Accessibility</h4>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Access for people with reduced mobility
              </p>
              <input type="checkbox" />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Available languages
              </p>
              <input type="checkbox" />
            </label>
          </div>

          <div className="pb-3 store-BorderBottomGray">
            <h4 className="py-3">Parking and Transportation</h4>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Parking availability
              </p>
              <input type="checkbox" />
            </label>
            <label className="d-flex justify-content-between align-items-center">
              <p className="text-secondary">
                Access to public transportation
              </p>
              <input type="checkbox" />
            </label>
          </div>
        </div>
        <div className="store-ControlSidebar">
          <div className="d-flex justify-content-between px-4 py-2">
            <button className="store-Button w-100" onClick={applyFilters}>Apply filters</button>
          </div>
        </div>
      </div>
      <div className="store-overlay-box store-BorderRadius bg-white p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="position-relative w-100">
            <input
              type="text"
              value={searchAddress}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for a location or store name"
              className="store-input"
            />
            <ul className={`position-absolute top-100 store-ListResults ${suggestions.length === 0 && !isLoading ? 'd-none' : ''}`}>
              {isLoading ? (
                <li>Loading...</li>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => setSearchAddress(suggestion.display_name || suggestion.name)}>
                    {suggestion.display_name || suggestion.name}
                  </li>
                ))
              ) : (
                <li>No data found</li>
              )}
            </ul>
          </div>
          <button className="store-Button ms-4 mb-1" onClick={toggleSidebar}>
            <i className="fa-solid fa-filter"></i>
          </button>
        </div>
        <div className="store-scrollable">
          {selectedStore ? (
            <>
              <div className="d-flex justify-content-end">
                <i className="fa-solid fa-xmark fs-3 px-4 py-3 cursor-pointer" onClick={handleCloseStore}></i>
              </div>
              <ItemStore
                name={selectedStore.name}
                position={selectedStore.position}
                address={selectedStore.address}
                hours={selectedStore.hours}
                phone={selectedStore.phone}
                website={selectedStore.website}
                images={selectedStore.images}
                userPosition={position}
              />
            </>
          ) : (
            storesInRange.map((store, index) => (
              <ItemStore
                key={index}
                name={store.name}
                position={store.position}
                address={store.address}
                hours={store.hours}
                phone={store.phone}
                website={store.website}
                images={store.images}
                userPosition={position}
              />
            ))
          )}
        </div>
      </div>
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="position-relative vh-100 w-100"
          zoomControl={false}
          whenCreated={setMap}
        >
          <MapUpdater position={position} selectedStore={selectedStore} />
          <CustomZoomControl />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position} icon={userIcon}>
            <Popup>
              You are here! <br /> This is your location.
            </Popup>
          </Marker>
          {selectedDistance > 0 && <Circle center={position} radius={selectedDistance * 1000} />}
          {filteredStores.map((store, index) => (
            <Marker
              key={index}
              position={store.position}
              icon={selectedMarker === store.position ? L.icon({ ...HikIcon.options, iconSize: [31.5, 43.5], iconAnchor: [15.75, 43.5], popupAnchor: [0, -43.5] }) : HikIcon}
              eventHandlers={{
                click: () => handleStoreClick(store),
                mouseover: (e) => {
                  setHoveredMarker(store.position);
                  e.target.openPopup();
                  e.target.setIcon(L.icon({
                    ...HikIcon.options,
                    iconSize: [31.5, 43.5],
                    iconAnchor: [15.75, 43.5],
                    popupAnchor: [0, -43.5]
                  }));
                },
                mouseout: (e) => {
                  if (selectedMarker !== store.position) {
                    setHoveredMarker(null);
                    e.target.closePopup();
                    e.target.setIcon(HikIcon);
                  }
                }
              }}
            >
              <Popup>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <div className="store-PopupImage">
                    <img src={store.images.image1} alt={store.name} />
                  </div>
                  <div>
                    <h4 className="p-0 m-0">{store.name}</h4>
                    <p className="p-0 m-0">
                      {store.address}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MapStore;