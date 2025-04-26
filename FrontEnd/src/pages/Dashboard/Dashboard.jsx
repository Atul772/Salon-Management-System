import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import { FaClock, FaMoneyBillWave, FaCalendarAlt, FaUser, FaCalendarCheck } from 'react-icons/fa';

const Dashboard = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', 
    '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  // Service categories
  const categories = [
    { id: 'hair', name: 'Hair Services' },
    { id: 'facial', name: 'Facial Treatments' },
    { id: 'massage', name: 'Massage Therapy' },
    { id: 'all', name: 'All Services' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');

  // Service data
  const services = [
    { 
      service_id: 0, 
      name: 'Schedule Your Appointment', 
      description: 'Quick appointment scheduling for any service you need', 
      duration: '5 min', 
      price: '0',
      category: 'all',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 1, 
      name: 'Haircuts', 
      description: 'Professional haircuts for all hair types', 
      duration: '30 min', 
      price: '500',
      category: 'hair',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 2, 
      name: 'Beard Trim', 
      description: 'Expert beard trimming and shaping', 
      duration: '20 min', 
      price: '300',
      category: 'hair',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 3, 
      name: 'Shaving', 
      description: 'Clean shave service with hot towel', 
      duration: '25 min', 
      price: '400',
      category: 'hair',
      image: 'https://images.unsplash.com/photo-1589810635657-232948472d98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 4, 
      name: 'Shampoo', 
      description: 'Hair wash and premium shampoo treatment', 
      duration: '15 min', 
      price: '250',
      category: 'hair',
      image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 5, 
      name: 'Hair Coloring', 
      description: 'Custom hair coloring using premium products', 
      duration: '60 min', 
      price: '1500',
      category: 'hair',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 6, 
      name: 'Waxing', 
      description: 'Full body waxing services', 
      duration: '45 min', 
      price: '800',
      category: 'facial',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 7, 
      name: 'Facial', 
      description: 'Rejuvenating facial treatment', 
      duration: '40 min', 
      price: '700',
      category: 'facial',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 8, 
      name: 'Face Massage', 
      description: 'Relaxing face massage and treatment', 
      duration: '30 min', 
      price: '500',
      category: 'massage',
      image: 'https://images.unsplash.com/photo-1630327728701-817e5c90fe60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    { 
      service_id: 9, 
      name: 'Body Massage', 
      description: 'Full body massage therapy', 
      duration: '60 min', 
      price: '1200',
      category: 'massage',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  useEffect(() => {
    // Check if the user is arriving from the services page
    if (location.state && location.state.fromServices) {
      // Auto-scroll to the services section
      const servicesSection = document.getElementById('services-section');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Set minimum date as today
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, [location]);

  // Calculate total price and duration whenever selected services change
  useEffect(() => {
    let price = 0;
    let durationInMinutes = 0;

    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.service_id === serviceId);
      if (service) {
        price += parseInt(service.price);
        const duration = service.duration.includes('hour') 
          ? parseInt(service.duration) * 60 
          : parseInt(service.duration);
        durationInMinutes += duration;
      }
    });

    setTotalPrice(price);
    setTotalDuration(durationInMinutes);
  }, [selectedServices]);

  const handleServiceSelection = (service_id) => {
    if (selectedServices.includes(service_id)) {
      setSelectedServices(selectedServices.filter(id => id !== service_id));
    } else {
      setSelectedServices([...selectedServices, service_id]);
    }
  };

  const handleAppointmentBooking = () => {
    if (selectedServices.length === 0) {
      alert("Please select at least one service before booking an appointment.");
      return;
    }

    if (!selectedDate) {
      alert("Please select a date for your appointment.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time for your appointment.");
      return;
    }

    // Collect selected service details for payment page
    const selectedServiceDetails = services.filter(service => 
      selectedServices.includes(service.service_id)
    );

    navigate('/payment', { 
      state: { 
        selectedServices, 
        services: selectedServiceDetails,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        totalPrice,
        totalDuration
      } 
    });
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} hr ${remainingMinutes} min` 
        : `${hours} hr`;
    }
  };

  // Handle time slot selection with validation for past times
  const handleTimeSelection = (time) => {
    // If selecting time for today, check if the time is in the past
    if (selectedDate === new Date().toISOString().split('T')[0]) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      
      // Parse selected time
      const [timeValue, modifier] = time.split(' ');
      let [hours, minutes] = timeValue.split(':').map(Number);
      
      // Convert to 24-hour format for comparison
      if (modifier === 'PM' && hours < 12) {
        hours += 12;
      } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }
      
      // Compare with current time
      if (hours < currentHour || (hours === currentHour && minutes <= currentMinutes)) {
        alert("Cannot select time slots in the past. Please choose a future time.");
        return;
      }
    }
    
    setSelectedTime(time);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <div className="dashboard-main">
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome to Your Dashboard</h1>
            <p>Book your appointment and discover our premium salon services</p>
          </div>
        </div>
        
        <div className="appointment-summary-panel">
          <div className="summary-card">
            <div className="summary-icon">
              <FaCalendarAlt />
            </div>
            <div className="summary-content">
              <h3>Appointment Date</h3>
              <p>{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <FaClock />
            </div>
            <div className="summary-content">
              <h3>Appointment Time</h3>
              <p>{selectedTime || 'Select a time'}</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <FaUser />
            </div>
            <div className="summary-content">
              <h3>Selected Services</h3>
              <p>{selectedServices.length} service(s) selected</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <FaMoneyBillWave />
            </div>
            <div className="summary-content">
              <h3>Total Price</h3>
              <p>₹{totalPrice}</p>
            </div>
          </div>
        </div>

        {/* Schedule Your Appointment Section - Displayed Above Services */}
        <div className="booking-container">
          <div className="booking-panel-wrapper">
            <div className="booking-panel">
              <h2>Schedule Your Appointment</h2>
              
              <div className="form-group">
                <label>Select Date</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    // Clear selected time when date changes
                    if (e.target.value !== selectedDate) {
                      setSelectedTime('');
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="date-input"
                />
              </div>
              
              <div className="form-group">
                <label>Select Time</label>
                <div className="time-slots">
                  {timeSlots.map(time => {
                    // Determine if this time slot should be disabled (in the past)
                    let isDisabled = false;
                    if (selectedDate === new Date().toISOString().split('T')[0]) {
                      const now = new Date();
                      const currentHour = now.getHours();
                      const currentMinutes = now.getMinutes();
                      
                      // Parse time slot
                      const [timeValue, modifier] = time.split(' ');
                      let [hours, minutes] = timeValue.split(':').map(Number);
                      
                      if (modifier === 'PM' && hours < 12) {
                        hours += 12;
                      } else if (modifier === 'AM' && hours === 12) {
                        hours = 0;
                      }
                      
                      isDisabled = hours < currentHour || (hours === currentHour && minutes <= currentMinutes);
                    }
                    
                    return (
                      <div 
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                        onClick={() => !isDisabled && handleTimeSelection(time)}
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="form-group appointment-summary">
                <h3>Appointment Summary</h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Services:</span>
                    <span>{selectedServices.length} selected</span>
                  </div>
                  <div className="summary-row">
                    <span>Duration:</span>
                    <span>{formatDuration(totalDuration)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Price:</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
                
                <button 
                  className="book-appointment-btn"
                  onClick={handleAppointmentBooking}
                  disabled={selectedServices.length === 0 || !selectedDate || !selectedTime}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section - Displayed Below Schedule Your Appointment */}
        <div className="services-container">
          <div id="services-section" className="services-panel">
            <h2>Select Services</h2>
            
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              
              <div className="category-tabs">
                {categories.map(category => (
                  <div 
                    key={category.id}
                    className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="services-grid">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <div 
                    key={service.service_id}
                    data-id={service.service_id}
                    className={`service-card ${selectedServices.includes(service.service_id) ? 'selected' : ''}`}
                    onClick={() => handleServiceSelection(service.service_id)}
                  >
                    <div className="service-img" style={{ backgroundImage: `url(${service.image})` }}>
                      {selectedServices.includes(service.service_id) && (
                        <div className="selected-badge">✓</div>
                      )}
                    </div>
                    <div className="service-details">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                      <div className="service-meta">
                        <span><FaClock /> {service.duration}</span>
                        <span><FaMoneyBillWave /> ₹{service.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-services">No services found matching your search.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
