# Basic way
def multiply1(arr, x):
    newArr = []
    for num in arr:
        newArr.append(num * x)
    return newArr

# Pythonic way
def multiply2(arr, x):
    return map(lambda num: num * x, arr)
