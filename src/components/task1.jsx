import React, { useState } from "react";
import Tree from "react-d3-tree";

const initialTreeData = {
  name: "Kritik İnformasiya İnfrastrukturları",
  children: [
    {
      name: "Enerji",
      children: [
        { name: "Elektrik Şəbəkəsi", children: [
          { name: "Yüksək Gərginlik Xətləri" },
          { name: "Dağıtım Şəbəkələri" }
        ]},
        { name: "Neft və Qaz Infrastruktur", children: [
          { name: "Boru Kəmərləri" },
          { name: "Emal Zavodları" }
        ]}
      ]
    },
    {
      name: "Maliyyə",
      children: [
        { name: "Banklar", children: [
          { name: "Mərkəzi Bank" },
          { name: "Kommersiya Bankları" }
        ]},
        { name: "Ödəniş Sistemləri", children: [
          { name: "Kart Şəbəkələri" },
          { name: "Onlayn Ödəniş Xidmətləri" }
        ]}
      ]
    },
    {
      name: "Nəqliyyat",
      children: [
        { name: "Hava Yolları", children: [
          { name: "Hava Limanları" },
          { name: "Aviasiya Nəzarət Mərkəzləri" }
        ]},
        { name: "Dəmiryolu Sistemi", children: [
          { name: "Mərkəzi Stansiyalar" },
          { name: "Yük Daşıma Xətləri" }
        ]}
      ]
    },
    {
      name: "Səhiyyə",
      children: [
        { name: "Xəstəxanalar", children: [
          { name: "Dövlət Xəstəxanaları" },
          { name: "Özəl Xəstəxanalar" }
        ]},
        { name: "Təcili Yardım Xidməti", children: [
          { name: "Təcili Tibbi Yardım" },
          { name: "Xilasetmə Xidməti" }
        ]}
      ]
    }
  ]
};

const TreeView = () => {
  const [translate, setTranslate] = useState({ x: 600, y: 50 });
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunction, setPathFunction] = useState("diagonal");
  const [treeData, setTreeData] = useState(initialTreeData);
  const nodeSize = { x: 200, y: 60 };
  const separation = { siblings: 1, nonSiblings: 1.2 };

  const toggleNode = (nodeDatum, node) => {
    if (node.name === nodeDatum.name) {
      if (node.children) {
        node._children = node.children;
        node.children = null;
      } else {
        node.children = node._children;
        node._children = null;
      }
    } else if (node.children) {
      node.children.forEach((child) => toggleNode(nodeDatum, child));
    }
  };

  const handleToggle = (nodeDatum) => {
    setTreeData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      toggleNode(nodeDatum, newData);
      return newData;
    });
  };

  const renderSvgNode = ({ nodeDatum ,toggleNode}) => (
    <g onClick={toggleNode} style={{ cursor: "pointer" }}>
      <rect width="180" height="40" x="-90" y="-20" fill="#007acc" stroke="#000" rx="5" />
      <text fill="white" x="0" y="5" textAnchor="middle" alignmentBaseline="middle" style={{ fontSize: "14px", fontWeight: "bold" }}>
        {nodeDatum.name}
      </text>
    </g>
  );
  
  return (
    <div style={{ width: "100vw", height: "100vh", textAlign: "center" }}>
      <h1 className="text-base font-bold text-center p-2">Kritik İnformasiya İnfrastrukturları</h1>
      <div className="mb-4">
        <button
          className="p-2 m-2 bg-blue-500 text-white rounded"
          onClick={() => setOrientation("horizontal")}
        >Horizontal</button>
        <button
          className="p-2 m-2 bg-green-500 text-white rounded"
          onClick={() => setOrientation("vertical")}
        >Vertical</button>
        <select
          className="p-2 m-2 border rounded"
          value={pathFunction}
          onChange={(e) => setPathFunction(e.target.value)}
        >
          <option value="diagonal">Diagonal</option>
          <option value="elbow">Elbow</option>
          <option value="straight">Straight</option>
        </select>
      </div>
      <div style={{ width: "100%", height: "80vh" }}>
        <Tree 
          data={treeData} 
          translate={translate} 
          orientation={orientation} 
          pathFunc={pathFunction}
          nodeSize={nodeSize} 
          separation={separation} 
          initialDepth={1} 
          renderCustomNodeElement={renderSvgNode} 
        />
      </div>
    </div>
  );
};

export default TreeView;