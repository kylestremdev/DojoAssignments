def draw_stars(arr):
    for num in arr:
        if type(num) is str:
            print num[0].lower() * len(num)
        else:
            print "*" * num
