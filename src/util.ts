interface HistogramResult {
    value: string,
    quantity: number
}

interface ValueMap {
    [key: string]: number;
}

function mapHistogramResultFromValueMap(valueMap: ValueMap): HistogramResult[] {
    const result: HistogramResult[] = []
    for(const [key, value] of Object.entries(valueMap)) {
        result.push({
            value: key,
            quantity: value
        })
    };

    return result;
}

export { mapHistogramResultFromValueMap,  ValueMap, HistogramResult }