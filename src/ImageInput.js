import { useRef } from "react";

export default function ImageInput({ onChange }) {
  const ref = useRef(null);

  const onClick = () => {
    ref.current?.click();
  };
  return (
    <button onClick={onClick}>
      📷
      <input
        hidden
        type="file"
        accept="image/jpg,image/png,image/jpeg,image/gif"
        name="image-input"
        onChange={onChange}
        ref={ref}
      />
    </button>
  );
}