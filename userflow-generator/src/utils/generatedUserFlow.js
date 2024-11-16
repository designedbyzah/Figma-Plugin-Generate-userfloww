export const generateUserFlow = (requirements) => {
  // Validate that requirements is an array and contains at least two elements
  if (!Array.isArray(requirements) || requirements.length < 2) {
    throw new Error("At least two requirements are needed to generate a user flow.");
  }

  // Start constructing the Mermaid flow diagram (Horizontal Flow)
  let flowDiagram = "graph LR\n"; // Change TD (top-down) to LR (left-right)

  // Loop through requirements and build the diagram
  requirements.forEach((requirement, index) => {
    const nextIndex = index + 1;
    const currentRequirement = `R${index + 1}[${requirement}]`;

    if (nextIndex < requirements.length) {
      const nextRequirement = `R${nextIndex + 1}[${requirements[nextIndex]}]`;
      flowDiagram += `  ${currentRequirement} --> ${nextRequirement}\n`; // Create left-to-right connections
    }
  });

  return flowDiagram;
};
