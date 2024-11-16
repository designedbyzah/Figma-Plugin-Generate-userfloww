import React, { useState, useEffect } from "react";
import RequirementsForm from "./components/RequirementsForm.jsx";
import { generateUserFlow } from "./utils/generatedUserFlow.js";

// Use lazy loading for UserFlowPreview
const UserFlowPreview = React.lazy(() => import("./components/UserFlowPreview"));

const App = () => {
  const [requirements, setRequirements] = useState([]);
  const [userFlowData, setUserFlowData] = useState("");

  const handleRequirementsSubmit = (newRequirements) => {
    setRequirements(newRequirements);
  };

  useEffect(() => {
    if (requirements.length > 0) {
      const flowData = generateUserFlow(requirements);

      setUserFlowData(flowData);
    }
  }, [requirements]);

  // const createFlow = () => {
  //   let staticData = "graph LR\n A[Start] --> B[End]";

  //   if (staticData) {
  //     console.log("Triggering createFlow message to Figma");

  //     parent.postMessage({ pluginMessage: { type: "create-flow", userFlowData: staticData } }, "*");
  //     console.log("User Flow Data being sent:", userFlowData);
  //   } else {
  //     console.log("User Flow Data is not ready yet.");
  //   }
  // };

  return (
    <div className="overall-container">
      <RequirementsForm onSubmit={handleRequirementsSubmit} />

      {userFlowData && <UserFlowPreview userFlowData={userFlowData} />}
    </div>
  );
};

export default App;
