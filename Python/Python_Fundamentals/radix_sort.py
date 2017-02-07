def radix_sort(arr):
    radix = 10
    max_len = False
    tmp, placement = -1, 1
    while not max_len:
        max_len = True
        buckets = [list() for _ in range(radix)]

        for i in arr:
            tmp = i / placement
            buckets[tmp % radix].append(i)
            if max_len and tmp > 0:
                max_len = False
        a = 0
        for b in range(radix):
            bucket = buckets[b]
            for i in bucket:
                arr[a] = i
                a += 1

        placement *= radix

radix_sort([18,5,100,3,1,19,6,0,7,4,2])
