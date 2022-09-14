function RenderIf({ value, children }) {
  return value === true ? children : null;
}

export default RenderIf
