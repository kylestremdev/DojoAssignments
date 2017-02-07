# students = [
#      {'first_name':  'Michael', 'last_name' : 'Jordan'},
#      {'first_name' : 'John', 'last_name' : 'Rosales'},
#      {'first_name' : 'Mark', 'last_name' : 'Guillen'},
#      {'first_name' : 'KB', 'last_name' : 'Tonel'}
# ]
#
# users = {
#  'Students': [
#      {'first_name':  'Michael', 'last_name' : 'Jordan'},
#      {'first_name' : 'John', 'last_name' : 'Rosales'},
#      {'first_name' : 'Mark', 'last_name' : 'Guillen'},
#      {'first_name' : 'KB', 'last_name' : 'Tonel'}
#   ],
#  'Instructors': [
#      {'first_name' : 'Michael', 'last_name' : 'Choi'},
#      {'first_name' : 'Martin', 'last_name' : 'Puryear'}
#   ]
#  }

def printNames(item):
    if type(item) is list:
        for row in item:
            print row['first_name'], row['last_name']
    elif type(item) is dict:
        for key in item:
            print key
            for idx in range(len(item[key])):
                print str(idx), "-",
                print item[key][idx]['first_name'],
                print item[key][idx]['last_name'],
                print "-",
                print (len(item[key][idx]['first_name']) + len(item[key][idx]['last_name']))
