import pandas as pd
import json
import random
import lorem

evidencesFile = "data/evidences.tsv"
entitiesFile = "data/entities.tsv"
sourcesFile = "data/sources.tsv"
categoriesFile = "data/categories.tsv"
output = "data/output/"

seed = []

evidencesDf = pd.read_csv(evidencesFile, delimiter='\t',encoding='utf-8')
entitiesDf = pd.read_csv(entitiesFile, delimiter='\t',encoding='utf-8')
sourcesDf = pd.read_csv(sourcesFile, delimiter='\t',encoding='utf-8')
categoriesDf = pd.read_csv(categoriesFile, delimiter='\t',encoding='utf-8')

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
sourcesList = []
sourcesDict = {}
for i, item in sourcesDf.iterrows():
	s = item['name'].strip()
	if s in sourcesDict:
		print("Repeated source name: {}".format(s))
	else:
		sourcesDict[s] = True
		sourcesList.append({
			"_id": s,
			"description": None
		})
writeJsonArray(sourcesList, output+"sources.json")
seed.append({
	"model": "Source",
	"documents": sourcesList
})

# Category *****************************************************************************************
categoriesList = []
categoriesDict = {}
for i, item in categoriesDf.iterrows():
	s = item['name'].strip()
	if s in categoriesDict:
		print("Repeated category name: {}".format(s))
	else:
		categoriesDict[s] = True
		categoriesList.append({
			"_id": s,
			"description": None
		})
writeJsonArray(categoriesList, output+"categories.json")
seed.append({
	"model": "Category",
	"documents": categoriesList
})

# Entities ***************************************************************************************
entitiesList = []
entitiesDict = {}
for i, item in entitiesDf.iterrows():
	hexid = "E"+hex(int(item['id'])).split('x')[-1].upper().zfill(6)
	abb = item['abb'].strip()
	cat = item['category'].strip()
	if abb in entitiesDict:
		print("Repeated entity abreviation: {}".format(abb))
	elif cat not in categoriesDict:
		print("Invalid category: {0}, for entity {1}".format(cat, abb))
	else:
		entitiesDict[abb] = hexid
		entitiesList.append({
			"_id": hexid,
			"name": item['name'].strip(),
			"shortName": abb,
			"abreviations": None,
			"categoryId": cat,
			"description": lorem.paragraph()
		})
writeJsonArray(entitiesList, output+"entities.json")
seed.append({
	"model": "Entity",
	"documents": entitiesList
})

# Biomarkers ***********************************************************************************

def allIn(a, b):
	for x in a:
		if x not in b:
			return False
	return True

biomarkerList = []
biomarkerDict = {}
for item in extractSets(evidencesDf['biomarker']):
	if allIn(item, entitiesDict):
		s = []
		for i in item:
			s.append(entitiesDict[i])
		hexid = "B"+hex(len(biomarkerList)).split('x')[-1].upper().zfill(6)
		biomarkerDict[tuple(s)] = hexid
		biomarkerList.append({
			"_id": hexid,
			"entityIds": s
		})
	else:
		print("Entity not found for biomarker: {}".format(item))
writeJsonArray(biomarkerList, output+"biomarkers.json")
seed.append({
	"model": "Biomarker",
	"documents": biomarkerList
})

# Evidence *****************************************************************************************
evidenceList = []

def numNan(num):
	return float(num) if not pd.isna(num) else -1

def strNan(num):
	return num if not pd.isna(num) else None

for i, item in evidencesDf.iterrows():
	hexid = "V"+hex(int(item['id'])).split('x')[-1].upper().zfill(6)
	bids = tuple(entitiesDict[x] for x in sortedSet(item["biomarker"]))
	sources = stripSplit(item["source"])
	if allIn(sources, sourcesDict):
		evidenceList.append({
			"_id": hexid,
			"pmid": item["pmid"],
			"biomarkerId": biomarkerDict[bids],
			"sourceIds": sources,
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
				"valcom": strNan(item['valcom']),
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
			"comments": strNan(item['diag'])
		})
	else:
		print("Invalid source for evidence {0} with biomarker {1}".format(hexid, bids))
writeJsonArray(evidenceList, output+"evidence.json")
seed.append({
	"model": "Evidence",
	"documents": evidenceList
})


writeJsonArray(seed, output+"seed.json")