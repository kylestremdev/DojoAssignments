function outputNames(arr){
  arr.forEach(function (obj){
    console.log(obj.first_name, obj.last_name);
  });
}

function outputOptional(obj){
  Object.keys(obj).forEach(function (item){
    console.log(item);
    obj[item].forEach(function (item, index){
      console.log((index + 1).toString(),
        "-",
        item.first_name.toUpperCase(),
        item.last_name.toUpperCase(),
        "-",
        item.first_name.length + item.last_name.length
      );
    });
  });
}

var students = [
     {first_name:  'Michael', last_name : 'Jordan'},
     {first_name : 'John', last_name : 'Rosales'},
     {first_name : 'Mark', last_name : 'Guillen'},
     {first_name : 'KB', last_name : 'Tonel'}
]

var users = {
 'Students': [
     {first_name:  'Michael', last_name : 'Jordan'},
     {first_name : 'John', last_name : 'Rosales'},
     {first_name : 'Mark', last_name : 'Guillen'},
     {first_name : 'KB', last_name : 'Tonel'}
  ],
 'Instructors': [
     {first_name : 'Michael', last_name : 'Choi'},
     {first_name : 'Martin', last_name : 'Puryear'}
  ]
 }

//outputNames(students);
//outputOptional(users);
