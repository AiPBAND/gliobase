from collections import Counter
from itertools import combinations
col = 1
data = []
with open("data/data.tsv") as fin:
	for line in fin:
		line = line.strip().split('\t')
		#print(line)
		if len(line) > col:
			line = line[col].replace(';',',').split(",")
			for d in line:
				data.append(d.strip())

counts = Counter(data)

from difflib import SequenceMatcher

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()

sim = [(a,b,similar(a,b)) for a,b in combinations(counts.keys(),2)]
sim.sort(key=lambda x: x[2])

for name,key in counts.most_common():
	print( key, "=", name)

for a,b,s in sim[-100:]:
	if s > 0.6:
		print(s,a,b)