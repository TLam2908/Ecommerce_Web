import bcrypt from 'bcrypt';

export const hashValue = async (value: string, saltRounds?: number): Promise<string> => {
    // Return the result of bcrypt.hash
    return bcrypt.hash(value, saltRounds || 10);
};


export const compareValue = async (value: string, hashValue: string) => {
    return bcrypt.compare(value, hashValue).catch(() => false);
}

