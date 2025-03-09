import React, { useState } from "react";
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

const nodeStyles = {
  shape: "rect",
  shapeProps: {
    width: 200,
    height: 50,
    fill: "#007bff",
    stroke: "none",
  },
  textLayout: { x: -90, y: 0, transform: "translate(100,25)", textAnchor: "middle", fill: "white" },
};

export default function CriticalInfraTree() {
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunc, setPathFunc] = useState("diagonal");

  return (
    <div style={containerStyles}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
        <button onClick={() => setOrientation(orientation === "vertical" ? "horizontal" : "vertical")}>
          Düzülüşü Dəyiş
        </button>
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
        translate={{ x: window.innerWidth / 2, y: 100 }}
        nodeSvgShape={nodeStyles}
        separation={{ siblings: 1, nonSiblings: 1 }}
      />
    </div>
  );
}