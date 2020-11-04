### count number of words in a string of text manually inputted into terminal

# counts = dict()

# line = input('Enter a line of text: ')

# words = line.split()

# print('Words:', words)

# print('counting...')

# for word in words:
#     counts[word] = counts.get(word, 0) + 1

# print('done counting:', counts)



### Read text from a file and count the number of words in it

# handle = open('lorem.txt')
# wordCounts = dict()

# for line in handle:
#     words = line.split()
#     for word in words:
#         wordCounts[word] = wordCounts.get(word, 0) + 1

# bigCount = None
# bigWord = None
# for word,count in wordCounts.items():
#     if bigCount is None or count > bigCount:
#         bigCount = count
#         bigWord = word

# print('Most occuring word is "{bigWord}" appearing {bigCount} times.'.format(bigWord=bigWord, bigCount=bigCount))


myList = [1, 2, 3]
print(f'myList: {myList}')