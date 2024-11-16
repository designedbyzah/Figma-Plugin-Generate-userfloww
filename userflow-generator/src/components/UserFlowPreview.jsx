import PropTypes from "prop-types";
import { useEffect } from "react";
import mermaid from "mermaid";
import "../styles/index.css";

const UserFlowPreview = ({ userFlowData }) => {
  useEffect(() => {
    if (userFlowData) {
      // Send the flow data to Figma plugin
      parent.postMessage(
        {
          pluginMessage: {
            type: "create-flow",
            userFlowData,
          },
        },
        "*"
      );

      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [userFlowData]);

  if (!userFlowData) {
    return <div className="preview-container">No user flow data available.</div>;
  }

  // return (
  //   <div className="preview-container">
  //     <div className="mermaid">{userFlowData}</div>
  //   </div>
  // );
};

// Prop validation
UserFlowPreview.propTypes = {
  userFlowData: PropTypes.string.isRequired,
};

export default UserFlowPreview;
