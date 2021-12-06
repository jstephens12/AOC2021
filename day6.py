def populateDayCounts(lines):
    days = {}
    for y in range(9):
        days[y] = 0
    for x in  lines:
        if x not in days:
            days[x] = 1
        else:
            days[x] = days[x] + 1
    return days

def passDay(dayCounts):
    newFish = dayCounts[0]
    for x in range(8):
        dayCounts[x] = dayCounts[x + 1]
        if x == 6:
            dayCounts[x]+= newFish
    dayCounts[8] = newFish

    return dayCounts

def main():
    f = open("day6.txt","r")
    lines = f.readlines()
    lines = lines[0].split(',');
    lines = map(lambda x: int(x), lines)

    dayCounts = populateDayCounts(list(lines))
    for x in range(256):
        dayCounts = passDay(dayCounts)
    print(dayCounts)
    totalFish = 0
    for day in dayCounts:
        totalFish+= dayCounts[day]
    
    print(totalFish)
    return

main()