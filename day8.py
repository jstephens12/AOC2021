

def decodeSegments(input):
    input.sort(key = len)
    [tempc, tempf] = input[0]
    decodedSegments = {}
    for c in input[1]:
        if ((c != tempc) & (c != tempf)):
            decodedSegments['a'] = c
    
    countc = 0
    countf = 0
    six = input[6]
    nine = input[7]
    zero = input[8]
    countc = (tempc in six) + (tempc in nine) + (tempc in zero)
    countf = (tempf in six) + (tempf in nine) + (tempf in zero)
    if countc < countf:
        decodedSegments['c'] = tempc
        decodedSegments['f'] = tempf
    else:
        decodedSegments['c'] = tempf
        decodedSegments['f'] = tempc
    
    four = input[2]
    unkownVals = []
    for c in four:
        if (c != tempf) & (c !=tempc):
            unkownVals.append(c)
    if (unkownVals[0] in zero) & (unkownVals[0] in six) & (unkownVals[0] in nine):
        decodedSegments['b'] = unkownVals[0]
        decodedSegments['d'] = unkownVals[1]
    else:
        decodedSegments['b'] = unkownVals[1]
        decodedSegments['d'] = unkownVals[0]
    
    #at this point we have solved for abcd and f. Missing e and g

    for c in 'abcdefg':
        if c not in decodedSegments.values():
            count = (c in zero) + (c in six) + (c in nine)
            if count == 2:
                decodedSegments['e'] = c
            if count == 3:
                decodedSegments['g'] = c
    return decodedSegments

def solveWithCode(decodedSegs, outputs):
    finalNum = 0
    decimalPlace = 3
    for output in outputs:
        if len(output) == 2:
            finalNum+= 1 * 10 ** decimalPlace
        if len(output) == 3:
            finalNum+= 7 * 10 ** decimalPlace
        if len(output) == 4:
            finalNum+= 4 * 10 ** decimalPlace
        if len(output) == 7:
            finalNum+= 8 * 10 ** decimalPlace
        if len(output) == 5:
            if decodedSegs['e'] in output:
                finalNum+= 2 * 10 ** decimalPlace
            elif decodedSegs['c'] in output:
                finalNum+= 3 * 10 ** decimalPlace
            else:
                finalNum+= 5 * 10 ** decimalPlace
        if len(output) == 6:
            if decodedSegs['d'] not in output:
                finalNum+= 0 * 10 ** decimalPlace
            elif decodedSegs['c'] in output:
                finalNum+= 9 * 10 ** decimalPlace
            else:
                finalNum+= 6 * 10 ** decimalPlace
        decimalPlace = decimalPlace - 1
    return finalNum


def main():
    f = open("day8.txt","r")
    lines = f.readlines()
    outputSum = 0
    for line in lines:
        [input, output] = line.split('|')
        input = list(filter(lambda x: x != '', input.split(' ')))
        output = list(filter(lambda x: x != '', output.split(' ')))
        decodedSegments = decodeSegments(input)
        output[3] = output[3].replace('\n', '')
        result = solveWithCode(decodedSegments, output)
        outputSum+= result
    print(outputSum)

main()