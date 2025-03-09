import { useState, useEffect } from "react";
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
            {
              name: "Yüksək Gərginlik Xətləri",
              children: [
                { name: "500 kV Xətləri" },
                { name: "220 kV Xətləri" },
                { name: "110 kV Xətləri" },
              ],
            },
            {
              name: "Dağıtım Şəbəkələri",
              children: [
                { name: "Şəhər Dağıtım Xətləri" },
                { name: "Kənd Dağıtım Xətləri" },
                { name: "Transformator Stansiyaları" },
              ],
            },
          ],
        },
        {
          name: "Neft və Qaz Infrastruktur",
          children: [
            {
              name: "Boru Kəmərləri",
              children: [
                { name: "Xam Neft Kəmərləri" },
                { name: "Təmizlənmiş Yanacaq Kəmərləri" },
                { name: "Qaz Dağıtım Şəbəkəsi" },
              ],
            },
            {
              name: "Emal Zavodları",
              children: [
                { name: "Xam Neft Emalı Zavodu" },
                { name: "Kimyəvi Emal Zavodu" },
                { name: "Maye Qaz Emal Zavodu" },
              ],
            },
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
            {
              name: "Mərkəzi Bank",
              children: [
                { name: "Pul Emissiya Departamenti" },
                { name: "Maliyyə Nəzarət Bölməsi" },
                { name: "Dövlət Ehtiyatları Departamenti" },
              ],
            },
            {
              name: "Kommersiya Bankları",
              children: [
                { name: "Milli Banklar" },
                { name: "Beynəlxalq Banklar" },
                { name: "Onlayn Bankçılıq Xidmətləri" },
              ],
            },
          ],
        },
        {
          name: "Ödəniş Sistemləri",
          children: [
            {
              name: "Kart Şəbəkələri",
              children: [
                { name: "VISA" },
                { name: "MasterCard" },
                { name: "Milli Kart Sistemləri" },
              ],
            },
            {
              name: "Onlayn Ödəniş Xidmətləri",
              children: [
                { name: "Mobil Ödəniş Sistemləri" },
                { name: "Elektron Pul Cüzdanları" },
                { name: "Kripto Ödəniş Platformaları" },
              ],
            },
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
            {
              name: "Hava Limanları",
              children: [
                { name: "Beynəlxalq Hava Limanları" },
                { name: "Daxili Hava Limanları" },
                { name: "Yük Terminalı Xidmətləri" },
              ],
            },
            {
              name: "Aviasiya Nəzarət Mərkəzləri",
              children: [
                { name: "Hava Hərəkəti Nəzarət Sistemi" },
                { name: "Radar Müşahidə Mərkəzləri" },
                { name: "Aviasiya Təhlükəsizlik Xidməti" },
              ],
            },
          ],
        },
        {
          name: "Dəmiryolu Sistemi",
          children: [
            {
              name: "Mərkəzi Stansiyalar",
              children: [
                { name: "Sərnişin Stansiyaları" },
                { name: "Yük Daşıma Stansiyaları" },
                { name: "Logistika Mərkəzləri" },
              ],
            },
            {
              name: "Yük Daşıma Xətləri",
              children: [
                { name: "Sənaye Yük Xətləri" },
                { name: "Beynəlxalq Yük Xətləri" },
                { name: "Daxili Yük Xətləri" },
              ],
            },
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
            {
              name: "Dövlət Xəstəxanaları",
              children: [
                { name: "Mərkəzi Klinika" },
                { name: "İxtisaslaşmış Xəstəxanalar" },
                { name: "Rayon Xəstəxanaları" },
              ],
            },
            {
              name: "Özəl Xəstəxanalar",
              children: [
                { name: "Şəxsi Klinika Şəbəkələri" },
                { name: "Mütəxəssis Tibb Mərkəzləri" },
                { name: "Tibbi Tədqiqat Xəstəxanaları" },
              ],
            },
          ],
        },
        {
          name: "Təcili Yardım Xidməti",
          children: [
            {
              name: "Təcili Tibbi Yardım",
              children: [
                { name: "Ambulans Xidmətləri" },
                { name: "Helikopter Təcili Yardımı" },
                { name: "Mobil Səhra Xəstəxanaları" },
              ],
            },
            {
              name: "Xilasetmə Xidməti",
              children: [
                { name: "Yanğınsöndürmə və Xilasetmə" },
                { name: "Dağ-Xilasetmə Xidmətləri" },
                { name: "Dəniz-Xilasetmə Xidmətləri" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g onClick={toggleNode} style={{ cursor: "pointer" }}>
    <rect
      width="200"
      height="40"
      x="-90"
      y="-20"
      fill={`${
        nodeDatum.__rd3t.collapsed && nodeDatum.children ? "gray" : "green"
      }`}
      stroke="#000"
      rx="5"
    />
    <text
      fill="black"
      x="0"
      y="5"
      textAnchor="middle"
      alignmentBaseline="middle"
      style={{ fontSize: "14px", fontWeight: "bold" }}
    >
      {nodeDatum.name}
    </text>
  </g>
);

export default function V2() {
  const [orientation, setOrientation] = useState("vertical");
  const [pathFunc, setPathFunc] = useState("diagonal");
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTranslate({ x: window.innerWidth / 2, y: window.innerHeight / 4 });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="nav"
        style={{
          position: "absolute",
          padding: "20px",
          top: 0,
          left: 0,
          zIndex: 5,
          width: "100%",
        }}
      >
        <button
          style={{ marginRight: "20px", padding: "10px" ,height:"42px",cursor:"pointer" ,marginBottom:"10px"}}
          onClick={() =>
            setOrientation(
              orientation === "vertical" ? "horizontal" : "vertical"
            )
          }
        >
          Düzülüşü Dəyiş
        </button>

        <select
          style={{ padding: "10px", marginRight: "20px", height:"42px",cursor:"pointer" ,marginBottom:"10px" }}
          onChange={(e) => setPathFunc(e.target.value)}
          value={pathFunc}
        >
          <option  value="diagonal">Diagonal</option>
          <option value="elbow">Düz</option>
          <option value="straight">Maili</option>
        </select>
        <button
          style={{ marginRight: "20px", padding: "10px" ,height:"42px",cursor:"pointer" ,marginBottom:"10px"}}
          onClick={() => window.location.reload()}
        >
          Yenilə
        </button>
      </div>

      <Tree
        data={initialTreeData}
        orientation={orientation}
        pathFunc={pathFunc}
        collapsible={true}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        separation={{ siblings: 1.1, nonSiblings: 1 }}
        nodeSize={{ x: 220, y: 80 }}
        initialDepth={1}
      />
    </div>
  );
}
