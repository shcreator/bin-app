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
  const { bin } = req.params;
  if (!bin || bin.length < 6) {
    return res.status(400).json({ error: 'Invalid bin' });
  }
  const binData = bins[bin.slice(0, 6)];
  if (!binData) {
    return res.status(404).json({ error: 'Bin not found' });
  }
  return res.status(200).json({
    bin: binData.bin,
    bank: binData.bank_name,
    country: binData.country,
    flag: binData.flag,
    vendor: binData.vendor,
    type: binData.type,
    level: binData.level,
    prepaid: binData.prepaid,
  });
}
