//@ts-nocheck

import { useEffect, useState } from "react";

const App = () => {
  const [fields, setFields] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchedFields = [
      {
        name: "pritinder",
        legend: "مدعي",
        repet: true,
        sub: [
          { name: "name", label: "اسم", type: "text" },
          { name: "id", label: "رقم قومي", type: "text" },
          {
            name: "gender",
            label: "جنس",
            type: "select",
            option: ["male", "female"],
          },
        ],
      },
      {
        name: "chort",
        legend: "محاكمه",
        repet: false,
        sub: [
          { name: "date", label: "تاريخ", type: "date" },
          { name: "room", label: "رقم", type: "number" },
        ],
      },
      {
        name: "lawyers",
        legend: "محامين",
        repet: true,
        sub: [
          { name: "name", label: "السيد المحامي", type: "text" },
          { name: "address", label: "محله المختار", type: "text" },
        ],
      },
    ];
    setFields(fetchedFields);
  }, []);

  useEffect(() => {
    if (!fields.length) return;
    let final = {};
    fields.forEach((item) => {
      let obj = {};
      item.sub.forEach((su) => {
        obj = { ...obj, [su.name]: "" };
      });
      final = { ...final, [item.name]: [obj] };
    });
    setData(final);
  }, [fields]);

  const handleChange = (e, item, val, idx) => {
    const { name, value } = e.target;
    setData((prev) => {
      const updatedArray = [...prev[item.name]];
      updatedArray[idx] = { ...val, [name]: value };
      return {
        ...prev,
        [item.name]: updatedArray,
      };
    });
  };

  const handleClickAddFields = (val, item) => {
    let newObject = {};
    const newKeys = Object.keys(val);
    newKeys.forEach((key) => {
      newObject = { ...newObject, [key]: "" };
    });
    setData((prev) => {
      const arrayCopy = [...prev[item.name]];
      arrayCopy.push(newObject);
      return {
        ...prev,
        [item.name]: arrayCopy,
      };
    });
  };

  const handleClickDeleteField = (item, idx) => {
    setData((prev) => {
      const newArr = prev[item.name].filter((_, i) => i !== idx);
      return {
        ...prev,
        [item.name]: newArr,
      };
    });
  };

  const handleSubmit = () => {
    const final = Object.entries(data).reduce((acc, [k, v]) => {
      const isArray = fields.find((item) => item.name === k)?.repet ?? true;
      acc[k] = isArray ? v : v[0];
      return acc;
    }, {});
    console.log(final);
  };

  return (
    <form>
      {fields.length === 0 && Object.entries(data).length === 0 && (
        <h1>...looding</h1>
      )}
      {fields.length > 0 &&
        Object.entries(data).length > 0 &&
        fields.map((item, i) => (
          <div key={i}>
            <div>
              <fieldset>
                <legend>{item.legend}</legend>
                {data[item.name].map((val, idx) => (
                  <div key={idx}>
                    <div>
                      {item.sub.map((su) => (
                        <label>
                          {su.label}
                          {su.type === "select" ? (
                            <select
                              name={su.name}
                              value={val[su.name]}
                              onChange={(e) => handleChange(e, item, val, idx)}
                              // required
                            >
                              <option value="" disabled hidden>
                                ----
                              </option>
                              {su.option.map((opt) => (
                                <option value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            // {pritinder: [{name: "", id: ""}]}
                            <input
                              name={su.name}
                              type={su.type}
                              value={val[su.name]}
                              onChange={(e) => handleChange(e, item, val, idx)}
                              // required
                            />
                          )}
                        </label>
                      ))}
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleClickDeleteField(item, idx)}
                        >
                          -
                        </button>
                      )}
                    </div>
                    {item.repet && idx === data[item.name].length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleClickAddFields(val, item)}
                      >
                        + اضف {item.legend} جديد
                      </button>
                    )}
                  </div>
                ))}
              </fieldset>
            </div>
          </div>
        ))}
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default App;
