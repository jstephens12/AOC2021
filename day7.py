
def getCoords(input, maxX):
    xOrds = [0] * (maxX + 1)
    for x in input:
        xOrds[x]+= 1
    return xOrds

def solveForX(xOrds, targetX):
    totalMoves = 0
    for x in range(len(xOrds)):
        count = xOrds[x]
        d = abs(x - targetX)
        fuelBurned = (d * (d + 1))/2
        totalMoves+= fuelBurned * count
    return totalMoves

def getMinMoves(xOrds):
    minMoves = float('inf')
    for i in range(len(xOrds)):
        moves = solveForX(xOrds, i)
        if moves < minMoves:
            minMoves = moves
    return minMoves

def main():
    f = open("day7.txt","r")
    lines = f.readlines()
    lines = lines[0].split(',')
    lines = list(map(lambda x: int(x), lines))
    maxX = 0
    for i in range(len(lines)):
        if lines[i] > maxX:
            maxX = lines[i]
    
    xOrds = getCoords(lines, maxX)

    minMoves = getMinMoves(xOrds)
    
    
    print(minMoves)
    return

main()