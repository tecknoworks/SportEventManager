export const getSkillLevelText = (skillLevel: any) => {
    switch (skillLevel) {
        case 0:
            return 'Beginner';
        case 1:
            return 'Intermediate';
        case 2:
            return 'Advanced';
        default:
            return 'Unknown';
    }
};

export const getColorScheme = (skillLevel: any) => {
    switch (skillLevel) {
        case 0:
            return 'green';
        case 1:
            return 'blue';
        case 2:
            return 'red';
        default:
            return 'gray';
    }
};