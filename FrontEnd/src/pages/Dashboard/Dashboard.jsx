import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { service_id: 1, name: 'Haircuts', description: 'Professional haircuts', duration: '30 min', price: '500' },
    { service_id: 2, name: 'Beard Trim', description: 'Expert beard trimming', duration: '20 min', price: '300' },
    { service_id: 3, name: 'Shaving', description: 'Clean shave service', duration: '25 min', price: '400' },
    { service_id: 4, name: 'Shampoo', description: 'Hair wash and shampoo', duration: '15 min', price: '250' },
    { service_id: 5, name: 'Hair Coloring', description: 'Custom hair coloring', duration: '1 hour', price: '1500' },
    { service_id: 6, name: 'Waxing', description: 'Full body waxing', duration: '45 min', price: '800' },
    { service_id: 7, name: 'Facial', description: 'Facial treatment', duration: '40 min', price: '700' },
    { service_id: 8, name: 'Face Massage', description: 'Relaxing face massage', duration: '30 min', price: '500' },
    { service_id: 9, name: 'Body Massage', description: 'Full body massage', duration: '1 hour', price: '1200' }
  ];

  const navigate = useNavigate();

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

    navigate('/payment', { state: { selectedServices, services } });
  };

  return (
    <div>
      <DashboardHeader />
      <div className="dashboard-body">
        <table className="service-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Service ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.service_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.service_id)}
                    onChange={() => handleServiceSelection(service.service_id)}
                  />
                </td>
                <td>{service.service_id}</td>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.duration}</td>
                <td>{service.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="book-appointment-btn" onClick={handleAppointmentBooking}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
