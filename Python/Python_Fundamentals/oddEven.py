for i in range(1,2001):
    returnStr = "Number is {}. "
    if i % 2 == 0:
        returnStr += "This is an even number."
    else:
        returnStr += "This is an odd number"
    print returnStr.format(i)
