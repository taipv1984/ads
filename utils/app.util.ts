let __randomIdCounter = 10;

export const uniqueID = (): number => {
    return __randomIdCounter++;
};

