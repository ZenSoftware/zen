// https://itnext.io/what-do-need-know-about-enumerations-in-typescript-48b554cec43b
export class EnumHelper {
  private constructor() {
    // No instances guard
  }

  public static keys(enumType: any) {
    const members = Object.keys(enumType);
    let keys: string[];
    if (!isNumeric(enumType)) {
      keys = members;
    } else {
      keys = [];
      members.forEach(x => {
        const parsedValue = parseInt(x, 10);
        if (Number.isNaN(parsedValue)) {
          keys.push(x);
        }
      });
    }
    // key of enumeration can't be number
    return keys.filter(x => Number.isNaN(parseInt(x, 10)));
  }

  public static values(enumType: any) {
    return EnumHelper.keys(enumType).map(key => {
      return enumType[key];
    });
  }

  public static keyValues(enumType: any) {
    return EnumHelper.keys(enumType).map(key => {
      return { key, value: enumType[key] };
    });
  }
}

function isNumeric(enumType: object) {
  const members = Object.keys(enumType);
  let parsedCount = 0;
  members.forEach(x => {
    const parsedValue = parseInt(x, 10);
    if (!Number.isNaN(parsedValue)) {
      parsedCount++;
    }
  });
  return parsedCount === members.length / 2;
}
