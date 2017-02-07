import random, datetime

def bubbleSort(alist):
    for i in range(len(alist)):
        for j in range(len(alist) - 1):
            if alist[j] > alist[j+1]:
                temp = alist[j]
                alist[j] = alist[j+1]
                alist[j+1] = temp
    return alist

theList = []
for i in range(100):
    theList.append(random.randrange(0,10000))

presort = datetime.datetime.now()

bubbleSort(theList)

print str(datetime.datetime.now() - presort), "seconds"
