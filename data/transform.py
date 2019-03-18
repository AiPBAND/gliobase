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
	counter += 1
	bioids[item] = hexid
	biomarkers.append({
		"_id": hexid,
		"name": item,
		"categoryId": random.choice(clist)["_id"],
		"description": lorem.paragraph()
	})
writeJsonArray(biomarkers, output+"biomarkers.json")
seed.append({
	"model": "Biomarker",
	"documents": biomarkers
})

biosets = []
counter = 0
for item in extractSets(df['name']):
	hexid = "S"+hex(counter).split('x')[-1].upper().zfill(6)
	counter += 1
	s = []
	for i in item:
		s.append(bioids[i])
	biosets.append({
		"_id": hexid,
		"biomarkerIds": s
	})
writeJsonArray(biosets, output+"biomarkerSets.json")
seed.append({
	"model": "BiomarkerSet",
	"documents": biosets
})

writeJsonArray(seed, output+"seed.json")