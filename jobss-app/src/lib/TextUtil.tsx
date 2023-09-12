export function formatMultipleLineText(text : string) : any {
    return text.split("\n").map((text : string, idx: number) => <li key={idx}>{text}</li>);
  }