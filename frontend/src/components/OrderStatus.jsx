import React from 'react';
import './OrderStatus.css';

const OrderStatus = ({ status }) => {
  const steps = [
    { label: "Order received", time: "09:10 AM" },
    { label: "On the way", time: "09:15 AM" },
    { label: "Delivered", time: "Finish time in 3 min" },
  ];

  return (
    <div className="order-status-container">
      <h3>Order Status</h3>
      <p>INVOICE : 12A394</p>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className={`step ${index <= status ? 'active' : ''}`}>
            <div className="dot" />
            <div className="details">
              <h4>{step.label}</h4>
              <p>{step.time}</p>
              {index === 1 && status === 1 && (
                <span className="tracking-badge">Tracking</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="confirm-btn">Confirm Delivery</button>
    </div>
  );
};

export default OrderStatus;
