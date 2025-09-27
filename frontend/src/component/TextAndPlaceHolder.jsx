import { useTemp } from "../context/TemplateContext";

export default function TextAndPlaceHolder() {
  const { templateData, setTemplateData } = useTemp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTemplateData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFocus = (e) => {
    const {name} = e.target;
    setTemplateData((prev) => ({...prev, focus: name}));
  }

  const handleSelect = (e) => {
    setTemplateData((prev) => ({...prev, cursorPostion: e.target.selectionStart}))
  }
  return (
    <div className="text_container" style={{display:"flex", flexDirection: "column"}}>
      <label>
        العنوان
        <input
          name="title"
          type="text"
          value={templateData.title}
          onChange={handleChange}
          onFocus={handleFocus}
          onSelect={handleSelect}
        />
      </label>
      <label>
        المقدمه
        <textarea
          name="intro"
          value={templateData.intro}
          onChange={handleChange}
          onFocus={handleFocus}
          onSelect={handleSelect}
        />
      </label>
      <label>
        وسط
        <textarea
          name="middle"
          value={templateData.middle}
          onChange={handleChange}
          onFocus={handleFocus}
          onSelect={handleSelect}
        />
      </label>
      <label>
        نهايه
        <textarea
          name="final"
          value={templateData.final}
          onChange={handleChange}
          onFocus={handleFocus}
          onSelect={handleSelect}
        />
      </label>
      <label>
        ملخص
        <textarea
          name="summary"
          value={templateData.summary}
          onChange={handleChange}
          onFocus={handleFocus}
          onSelect={handleSelect}
        />
      </label>
    </div>
  );
}
