import { HistogramResult, mapHistogramResultFromValueMap, ValueMap } from '../util';

test('Return Histogram Results from Value Map', () => {
    const valueMap: ValueMap = {
        'Beef': 20,
        'Pork': 18,
        'Poultry': 23
    }
    const expected: HistogramResult[] = [
        {
            value: 'Beef',
            quantity: 20
        },
        {
            value: 'Pork',
            quantity: 18
        },
        {
            value: 'Poultry',
            quantity: 23
        }
    ]

    const result = mapHistogramResultFromValueMap(valueMap);

    expect(result).toEqual(expected);

});