import { ValueMap } from "./util";
import fs from 'fs';
import readline from 'readline';
import { parse } from 'csv-parse/sync';

interface FileData {
    [key: string]: ValueMap;
}

function processData(fileName: string): FileData {
    const fileData: FileData = {};
    const stream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });


    let columnNames: string[] | null = null;
    let values: string[] | null = null;

    rl.on('line', (line) => {
        const [parsedLine]: string[][] = parse(line, {
            skip_empty_lines: true,
            relax_column_count: true,
          });
        
        // get column names
        if(!columnNames) {
            columnNames = parsedLine;
            columnNames.forEach((columnName) => {
                fileData[columnName.trim()] = {};
            });
        } else if(columnNames != null) {
            values = parsedLine;
            values.forEach((value, index) => {
                if (fileData[columnNames![index].trim()][value] != null) {
                    fileData[columnNames![index].trim()][value] += 1;
                } else {
                    fileData[columnNames![index].trim()][value] = 1
                }
            });
        }
    });

    rl.on('close', () =>{
        console.log('Completed parsing file.');
    });

    return fileData;
}

export { FileData, processData }