def insertion_sort(arr):
    for _ in range(len(arr)):
        for i in range(len(arr)-1, 0, -1):
            if arr[i] < arr[i-1]:
                arr[i - 1], arr[i] = arr[i], arr[i-1]

    return arr

print insertion_sort([6,5,3,1,8,7,2,4])
