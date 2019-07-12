export interface IPatient {
    pasID: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    nhsNumber: string;
    birthDate: string;
    address: {
        use: string,
        line: string,
        country: string,
    };
}
