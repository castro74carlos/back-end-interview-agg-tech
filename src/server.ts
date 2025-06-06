import express from 'express';

import { HistogramResult, ValueMap, mapHistogramResultFromValueMap } from './util';
import { FileData, processData } from './processor';


const app = express();
const port = 8080;
const filename = 'Projection2021.csv';

app.use(express.json());

const fileData: FileData = processData(filename);

app.get('/:column/histogram', (req, res) => {
    const columnName = req.params.column;
    const valueMap: ValueMap = fileData[columnName];
    const result: HistogramResult[] = mapHistogramResultFromValueMap(valueMap);
    res.status(200).json(result);
});

app.listen(port, () => {
    console.log(`Histogram Service app listening on port ${port}`);
});

export { mapHistogramResultFromValueMap, HistogramResult, ValueMap };