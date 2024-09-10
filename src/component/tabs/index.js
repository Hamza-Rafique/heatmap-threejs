import React  from "react";
import './style.css';

const Tabs = ({activeTab, setActiveTab, TESTAMENT_OPTIONS }) => {


  return (
    <>
    <p className="form-label">Testaments</p>
    <div className="tabs-container">
      {TESTAMENT_OPTIONS?.map((tab) => (
        <div
          key={tab.value}
          className={`tab ${activeTab === tab.value ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
    </>
  );
};

export default Tabs;
