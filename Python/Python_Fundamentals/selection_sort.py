def selection_sort(arr):
    sorted_idx = 0
    while sorted_idx < len(arr):
        min_idx = sorted_idx
        for i in range(sorted_idx, len(arr)):
            if arr[i] < arr[min_idx]:
                min_idx = i
        arr[sorted_idx], arr[min_idx] = arr[min_idx], arr[sorted_idx]
        sorted_idx += 1
    return arr

print selection_sort([8,1,5,2,6,9,3,0,4,7])
