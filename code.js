figma.showUI(__html__, { width: 600, height: 500 });
figma.ui.onmessage = async (msg) => {
  if (msg.type === "create-flow") {
    const flowData = msg.userFlowData;

    const lines = flowData
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("graph"));

    const nodes = new Map();
    const connections = [];

    for (const line of lines) {
      const match = line.match(/(\w+)\[(.*?)\]\s*-->\s*(\w+)\[(.*?)\]/);

      if (match) {
        const [_, fromId, fromLabel, toId, toLabel] = match;

        for (const [id, label] of [
          [fromId, fromLabel],
          [toId, toLabel],
        ]) {
          if (!nodes.has(id)) {
            const node = figma.createFrame();
            node.name = label;
            node.resize(160, 80);
            node.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
            node.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
            node.strokeWeight = 1;
            node.strokeAlign = "OUTSIDE";
            node.cornerRadius = 8;

            const text = figma.createText();
            await figma.loadFontAsync({ family: "Inter", style: "Regular" });
            text.characters = label;
            text.fontSize = 24;
            text.textAlignHorizontal = "CENTER";
            text.textAlignVertical = "CENTER";

            node.appendChild(text);
            text.x = (node.width - text.width) / 2;
            text.y = (node.height - text.height) / 2;
            nodes.set(id, node);
          }
        }
        connections.push([fromId, toId]);
      }
    }

    let xOffset = 100;
    for (const node of nodes.values()) {
      node.x = xOffset;
      node.y = 100;
      xOffset += node.width + 100;
      figma.currentPage.appendChild(node);
    }

    // ARROW CONFIGURATION - You can adjust these values
    const ARROW_HEAD_SIZE = 12; // Size of the arrow head
    const ARROW_HEAD_OFFSET = 6; // How far from the end of the line
    const LINE_THICKNESS = 2; // Thickness of the line

    for (const [fromId, toId] of connections) {
      const fromNode = nodes.get(fromId);
      const toNode = nodes.get(toId);

      // Create arrow shaft
      const connector = figma.createLine();
      connector.strokeWeight = LINE_THICKNESS;
      connector.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];

      // Calculate positions
      const startX = fromNode.x + fromNode.width;
      const startY = fromNode.y + fromNode.height / 2;
      const endX = toNode.x;
      const endY = startY;

      // Position and size connector
      connector.x = startX;
      connector.y = startY;
      connector.resize(endX - startX - ARROW_HEAD_OFFSET, 0); // Subtract offset to prevent overlap

      // Create arrow head
      const arrowHead = figma.createPolygon();
      arrowHead.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
      arrowHead.resize(ARROW_HEAD_SIZE, ARROW_HEAD_SIZE);
      arrowHead.rotation = -90;

      // Position arrow head at end of line
      arrowHead.x = endX - ARROW_HEAD_SIZE / 6; // Adjust horizontal position
      arrowHead.y = endY - ARROW_HEAD_SIZE / 1.8; // Center vertically

      figma.currentPage.appendChild(connector);
      figma.currentPage.appendChild(arrowHead);
    }

    const allElements = [...nodes.values()];
    figma.currentPage.selection = allElements;
    figma.viewport.scrollAndZoomIntoView(allElements);
  }
};
