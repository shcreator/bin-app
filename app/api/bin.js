import csv from 'csv-parser';
import fs from 'fs';

const bins = {};

fs.createReadStream('bins.csv')
  .pipe(csv())
  .on('data', (row) => {
    bins[row.bin] = row;
  })
  .on('end', () => {
    console.log('Bins loaded');
  });

export default async function handler(req, res) {
  const { bins } = req.query;
  if (!bins) {
    return res.status(400).json({ error: 'Invalid bin' });
  }
  const binData = [];
  for (const bin of bins.split(',')) {
    if (bin.length < 6) {
      return res.status(400).json({ error: 'Invalid bin' });
    }
    const data = bins[bin.slice(0, 6)];
    if (data) {
      binData.push({
        bin: data.bin,
        bank: data.bank_name,
        country: data.country,
        flag: data.flag,
        vendor: data.vendor,
        type: data.type,
        level: data.level,
        prepaid: data.prepaid,
      });
    } else {
      binData.push({ error: 'Bin not found' });
    }
  }
  return res.status(200).json(binData);
}
