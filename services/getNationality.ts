import { nationalities } from "@data/nationality";

export const getNationality = (value: string) => {
    const foundNationality = nationalities.find((item) => item.value === value);
    return foundNationality ? foundNationality.label : "País não encontrado";
};