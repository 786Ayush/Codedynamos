import React, { useState } from "react";

const CheckboxBar = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const data = [
    { id: 1, name: "John Doe", questions: 1, loc: false, lor: false, swags: false },
    { id: 2, name: "Jane Smith", questions: 2, loc: false, lor: false, swags: false },
    { id: 3, name: "Alice Johnson", questions: 3, loc: false, lor: false, swags: false },
  ];

  const handleCheckboxAndSelectChange = (rowData, checkboxName) => {
    const numQuestions = rowData.questions;
  
    let updatedCheckboxState = {
      ...checkboxes,
      [rowData.id]: {
        ...checkboxes[rowData.id],
        [checkboxName]: !checkboxes[rowData.id]?.[checkboxName],
      },
    };
  
    let updatedSelectedData;
  
    if (checkboxName === 'select') {
      const selected = !checkboxes[rowData.id]?.[checkboxName];
      updatedSelectedData = selected
        ? [...selectedData, rowData]
        : selectedData.filter((item) => item.id !== rowData.id);
    }
  
    if (numQuestions === 2 || numQuestions >= 3) {
      updatedCheckboxState = {
        ...updatedCheckboxState,
        [rowData.id]: {
          ...updatedCheckboxState[rowData.id],
          loc: true,
        },
      };
    }
  
    if (numQuestions >= 3) {
      updatedCheckboxState = {
        ...updatedCheckboxState,
        [rowData.id]: {
          ...updatedCheckboxState[rowData.id],
          lor: true,
        },
      };
    }
  
    setCheckboxes(updatedCheckboxState);
    setSelectedData(updatedSelectedData || selectedData);
    console.log(data);
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="border border-gray-300 rounded p-4 mb-4 w-full">
        <thead>
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Number of questions</th>
            <th className="p-4">Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((rowData) => (
            <tr key={rowData.id}>
              <td className="p-4 text-center">{rowData.name}</td>
              <td className="p-4 text-center">{rowData.questions}</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 mr-2"
                  checked={checkboxes[rowData.id]?.select || false}
                  onChange={() => handleCheckboxAndSelectChange(rowData, "select")}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="p-4 text-center">
              Selected Data: {selectedData.map((item) => item.name).join(", ")}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CheckboxBar;
