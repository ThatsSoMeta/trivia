export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export const htmlDecode = (input: string): string => {
    let field = document.createElement('textarea');
    field.innerHTML = input;
    let returnString = String(field.childNodes[0].nodeValue)
    return returnString;
  }