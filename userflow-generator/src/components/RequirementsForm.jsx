import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/index.css";
import { MdAdd } from "react-icons/md";
import { MdDeleteOutline, MdArrowRightAlt } from "react-icons/md";
import logo from "../assets/logo.png";

const RequirementsForm = ({ onSubmit }) => {
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");

  const handleInputChange = (e) => {
    setNewRequirement(e.target.value);
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      setRequirements((prevRequirements) => [...prevRequirements, newRequirement.trim()]);

      setNewRequirement("");
    }
  };

  const handleSubmit = () => {
    onSubmit(requirements);
  };

  // Delete Requirement Func

  const handleDelete = (index) => {
    setRequirements((prevRequirements) => prevRequirements.filter((_, i) => i !== index));
  };

  return (
    <div className="form-container">
      <div className="plugin-title-logo-container">
        <div className="plugin-logo">
          <img src={logo} alt="Logo" />.
        </div>
        <h2>Userflow Generator</h2>
      </div>
      <div className="form-input">
        <div className="input-group">
          <input
            id="form"
            type="text"
            value={newRequirement}
            onChange={handleInputChange}
            placeholder="Enter a requirement"
          />
        </div>
        <button type="button" className="add-btn" onClick={handleAddRequirement}>
          <MdAdd className="add-btn-icon" />
          Add
        </button>
      </div>
      {requirements.length > 0 && (
        <div className="requirements-list">
          {requirements.map((req, index) => (
            <div key={index} className="requirement">
              <p>{req}</p>
              <button
                className="remove-btn"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <MdDeleteOutline className="remove-btn-icon" />
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        className="submit-btn"
        type="button"
        onClick={handleSubmit}
        disabled={requirements.length < 2}
      >
        Generate User Flow
        <MdArrowRightAlt className="generate-icon" />
      </button>
    </div>
  );
};

// Prop validation
RequirementsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // createFlow: PropTypes.func.isRequired,
};

export default RequirementsForm;
