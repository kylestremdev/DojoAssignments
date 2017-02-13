import unittest
from underscore import Underscore

class UnderscoreTest(unittest.TestCase):
    def setUp(self):
        # create an instance of the Underscore module we created
        self._ = Underscore()
        # initialize a list to run our tests on
        self.test_list = [1,2,3,4,5]
    def testMap(self):
        my_list = [2,4,6,8,10]
        self.assertEqual(my_list, self._.map(self.test_list, lambda x: x * 2))
    def testReduce(self):
        num = 0
        self.assertEqual(15, self._.reduce(self.test_list, lambda x,y: x + y, num))
    def testFind(self):
        self.assertTrue(self._.find(self.test_list, lambda x: x == 5))
    def testFilter(self):
        self.assertEqual([1,3,5], self._.filter(self.test_list, lambda x: x % 2 == 1))
    def testReject(self):
        self.assertEqual([2,4], self._.reject(self.test_list, lambda x: x % 2 == 1))

if __name__ == "__main__":
    unittest.main()
