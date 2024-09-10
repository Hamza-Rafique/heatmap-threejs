import React, { useState } from "react";
import "./Ao.css";
import Select from "./component/select";
import Tabs from "./component/tabs";

const Ao = () => {
  // State to toggle the sidebar
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState({
    testament: "Old Testament",
    section: "",
    book: "Genesis",
    view: "Verse",
  });

  const onChangeView = (newValue, field) => {};
  // Function to handle the opening and closing of the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const TESTAMENT_OPTIONS = [
    { value: "Old Testament", label: "Old Testament" },
    { value: "New Testament", label: "New Testament" },
  ];

  const VIEW_OPTIONS = [
    { value: "Sections", label: "Sections" },
    { value: "Books", label: "Books" },
    { value: "Chapters", label: "Chapters" },
    { value: "Verse", label: "Verse" },
  ];
  const [activeTab, setActiveTab] = useState(TESTAMENT_OPTIONS[0].value);
  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header-main">
          <div className="sidebar-header">
            <button className="filter-btn">B</button>
            <span className="sidebar-title">Filters </span>
          </div>

          <button className="close-btn hide" onClick={toggleSidebar}>
            Hide
          </button>
        </div>
        <hr />
        <nav>
          <div>
            <Select
              value={view.view}
              onChangeListener={(value) => {
                onChangeView(value, "view");
              }}
              name="View By"
              options={VIEW_OPTIONS}
            />
            <hr />
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              TESTAMENT_OPTIONS={TESTAMENT_OPTIONS}
            />
            <hr />

            <Select
              value={view.view}
              onChangeListener={(value) => {
                onChangeView(value, "view");
              }}
              name="View By"
              options={VIEW_OPTIONS}
            />
            <hr />
          </div>
        </nav>
      </div>

      {/* Main content with push effect */}
      <div className={`main-content ${isOpen ? "shifted" : ""}`}>
        <button className="open-btn" onClick={toggleSidebar}>
          &#9776; Open Sidebar
        </button>
        <div className="content">
          <h1>Welcome to the Main Content Area</h1>
          <p>This is where your main content will go.</p>
        </div>
      </div>
    </>
  );
};

export default Ao;
