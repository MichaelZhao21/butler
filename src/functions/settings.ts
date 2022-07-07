import fs from 'fs';

export function loadSettingsFromFile(): Data {
    // Load data from file if it exists
    if (fs.existsSync('butler.dat')) {
        const stringData = fs.readFileSync('butler.dat', { encoding: 'utf-8', flag: 'r' });
        const splitStringData = stringData.split('\n');
        return { time: { hour: splitStringData[0], min: splitStringData[1] } };
    }

    // Write and return default values
    fs.writeFileSync('butler.dat', '07\n00');
    return { time: { hour: '07', min: '00' } };
}

export async function saveSettings(settings: Data) {
    const dataString = settings.time.hour + '\n' + settings.time.min;
    fs.writeFile('butler.dat', dataString, () => {});
}
