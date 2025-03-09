import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

const initialTreeData = {
  name: "Kritik İnformasiya İnfrastrukturları",
  children: [
    {
      name: "Enerji",
      children: [
        {
          name: "Elektrik Şəbəkəsi",
          children: [
            { name: "Yüksək Gərginlik Xətləri" },
            { name: "Dağıtım Şəbəkələri" },
          ],
        },
        {
          name: "Neft və Qaz Infrastruktur",
          children: [
            { name: "Boru Kəmərləri" },
            { name: "Emal Zavodları" },
          ],
        },
      ],
    },
    {
      name: "Maliyyə",
      children: [
        {
          name: "Banklar",
          children: [
            { name: "Mərkəzi Bank" },
            { name: "Kommersiya Bankları" },
          ],
        },
        {
          name: "Ödəniş Sistemləri",
          children: [
            { name: "Kart Şəbəkələri" },
            { name: "Onlayn Ödəniş Xidmətləri" },
          ],
        },
      ],
    },
    {
      name: "Nəqliyyat",
      children: [
        {
          name: "Hava Yolları",
          children: [
            { name: "Hava Limanları" },
            { name: "Aviasiya Nəzarət Mərkəzləri" },
          ],
        },
        {
          name: "Dəmiryolu Sistemi",
          children: [
            { name: "Mərkəzi Stansiyalar" },
            { name: "Yük Daşıma Xətləri" },
          ],
        },
      ],
    },
    {
      name: "Səhiyyə",
      children: [
        {
          name: "Xəstəxanalar",
          children: [
            { name: "Dövlət Xəstəxanaları" },
            { name: "Özəl Xəstəxanalar" },
          ],
        },
        {
          name: "Təcili Yardım Xidməti",
          children: [
            { name: "Təcili Tibbi Yardım" },
            { name: "Xilasetmə Xidməti" },
          ],
        },
      ],
    },
  ],
};

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
//   <g  onClick={toggleNode}>
//     <rect width={200} height={50}  fill="#007bff" stroke="none" rx={5} ry={5} />
//     <text x={100} y={25} textAnchor="middle" fill="white" fontSize={14} dy={5}>
//       {nodeDatum.name}
//     </text>
//   </g>
      <g onClick={toggleNode} style={{ cursor: "pointer" }}>
      <rect width="180" height="40" x="-90" y="-20" fill="#007acc" stroke="#000" rx="5" />
      <text fill="white" x="0" y="5" textAnchor="middle" alignmentBaseline="middle" style={{ fontSize: "14px", fontWeight: "bold" }}>
        {nodeDatum.name}
      </text>
    </g>
  
);

export default function Ozum() {
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunc, setPathFunc] = useState("diagonal");
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTranslate({ x: window.innerWidth / 2, y: window.innerHeight / 4 });
  }, []);

  return (
    <div style={containerStyles}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
        <button onClick={() => setOrientation(orientation === "vertical" ? "horizontal" : "vertical")}>Düzülüşü Dəyiş</button>
        <select onChange={(e) => setPathFunc(e.target.value)} value={pathFunc}>
          <option value="diagonal">Diagonal</option>
          <option value="elbow">Elbow</option>
          <option value="straight">Straight</option>
        </select>
      </div>
      
      <Tree
        data={initialTreeData}
        orientation={orientation}
        pathFunc={pathFunc}
        collapsible={true}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        nodeSize={{ x: 220, y: 80 }}
      />
    </div>
  );
}
