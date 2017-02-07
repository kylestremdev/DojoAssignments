from __future__ import division

def averageList(arr):
    sum = 0
    for num in arr:
        sum += num
    print sum/len(arr)

averageList([1,2,3,4,4])
