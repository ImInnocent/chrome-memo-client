export default function generate(
  element: React.FunctionComponent<any>, 
  data: object[],
  keyPrefix: string) {
    
  return data.map((value, i) =>
    element({
      key: `${keyPrefix}-${i}`,
      ...value,
    })
  );
}
