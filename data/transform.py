import pandas as pd
import json
import random
import lorem

filePath = "data/data.tsv"
output = "data/output/"

seed = []

df = pd.read_csv(filePath, delimiter='\t',encoding='utf-8')

def strip(l):
	return ["" if pd.isna(x) else x.strip() for x in l]

def extractUnique(col):
	col = col.dropna()
	items = []
	for it in col:
		it = strip(it.split(';'))
		items += it
	return set(items)

def extractSets(col):
	col = col.dropna()
	items = []
	for it in col:
		it = strip(it.split(';'))
		items.append(sorted(it))
	return items

def sortedSet(s):
	return sorted(strip(s.split(';')))

def stripSplit(s):
	return None if pd.isna(s) else strip(s.split(';'))

def writeJsonArray(arr, filePath):
	with open(filePath, "w+") as fout:
		fout.write(getJsonString(arr))

def getJsonString(arr):
	return json.dumps(arr, indent=4)

# Source *******************************************************************************************
jlist = []
for item in extractUnique(df['source']):
	jlist.append({
		"_id": item,
		"description": ""
	})
writeJsonArray(jlist, output+"sources.json")
seed.append({
	"model": "Source",
	"documents": jlist
})

# Category *****************************************************************************************
clist = []
for item in extractUnique(df['category']):
	clist.append({
		"_id": item,
		"description": ""
	})
writeJsonArray(clist, output+"categories.json")
seed.append({
	"model": "Category",
	"documents": clist
})

# Biomarkers ***************************************************************************************
biomarkers = []
bioids = {}
counter = 0
for item in extractUnique(df['name']):
	hexid = "B"+hex(counter).split('x')[-1].upper().zfill(6)
	abbs = [hex(random.randint(0,9999)).split('x')[-1].upper() for x in range(random.randint(0,5))]
	counter += 1
	bioids[item] = hexid
	biomarkers.append({
		"_id": hexid,
		"name": item,
		"abreviations": abbs,
		"categoryId": random.choice(clist)["_id"],
		"description": lorem.paragraph()
	})
writeJsonArray(biomarkers, output+"biomarkers.json")
seed.append({
	"model": "Biomarker",
	"documents": biomarkers
})

# Biomarker sets ***********************************************************************************
biosets = []
setids = {}
counter = 0
for item in extractSets(df['name']):
	hexid = "S"+hex(counter).split('x')[-1].upper().zfill(6)
	counter += 1
	s = []
	for i in item:
		s.append(bioids[i])
	setids[tuple(s)] = hexid
	biosets.append({
		"_id": hexid,
		"biomarkerIds": s
	})
writeJsonArray(biosets, output+"biomarkerSets.json")
seed.append({
	"model": "BiomarkerSet",
	"documents": biosets
})

# Evidence *****************************************************************************************
evidence = []
counter = 0

def numNan(num):
	return float(num) if not pd.isna(num) else -1

def strNan(num):
	return num if not pd.isna(num) else None

for i,item in df.iterrows():
	hexid = "E"+hex(counter).split('x')[-1].upper().zfill(6)
	counter += 1
	bids = tuple(bioids[x] for x in sortedSet(item["name"]))
	evidence.append({
		"_id": hexid,
		"pmid": item["pmid"] if not pd.isna(item["pmid"]) else 0,
		"biomarkerSetId": setids[bids],
		"sourceIds": stripSplit(item["source"]),
		"samples": "TODO",
		"species": stripSplit(item['species']),
		"age": {
			"min": numNan(item["min"]),
			"max": numNan(item["max"]),
			"med": numNan(item["med"]),
			"avg": numNan(item["avg"]),
			"sd": numNan(item["dev"]),
			"range": {
				"cutoff": numNan(item["cut"]),
				"under": numNan(item["und"]),
				"over": numNan(item["ovr"]),
			}
		},
		"gender": {
			"male": numNan(item["ovr"]),
			"female": numNan(item["ovr"]),
			"other": -1
		},
		"stage": stripSplit(item['stage']),
		"whoclass": strNan(item['who']),
		"region": stripSplit(item['region']),
		"research": {
			"methods": stripSplit(item['methods']),
			"results": stripSplit(item['results']),
			"conclusions": stripSplit(item['conclusions']),
		},
		"application": {
			"validated": strNan(item['validated']),
			"diagnosis": strNan(item['diag']),
			"prognosis": strNan(item['prog']),
			"predictive": strNan(item['pred']),
			"therapeutic": strNan(item['ther'])
		},
		"clinical":{
			"relevance": strNan(item['relevance']),
			"implication": strNan(item['implications']),
			"treatment": strNan(item['effect']),
		},
		"comments": strNan(item['diag']),
		"curator": strNan(item['curator']),
	})
writeJsonArray(evidence, output+"evidence.json")
seed.append({
	"model": "Evidence",
	"documents": evidence
})


writeJsonArray(seed, output+"seed.json")