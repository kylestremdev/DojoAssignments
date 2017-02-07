score = []
for i in range(1,11):
    score += [int(raw_input('Enter Score {}:'.format(i)))]

print "Scores and Grades"

for idx in range(len(score)):
    thisScore = score[idx]
    printStr = "Score: {};\tYour Grade is {}"
    grade = ""
    if thisScore < 60:
        grade = "F"
    elif thisScore < 70:
        grade = "D"
    elif thisScore < 80:
        grade = "C"
    elif thisScore < 90:
        grade = "B"
    elif thisScore <= 100:
        grade = "A"
    print printStr.format(thisScore, grade)

print "End of the program. Bye!"
