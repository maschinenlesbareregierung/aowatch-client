# @malereg/aowatch-client

Abgeordnetenwatch TypeScript/JavaScript API client for Browser, Node and Typescript

[![npm version](https://badge.fury.io/js/%40malereg%2Faowatch-client.svg)](https://badge.fury.io/js/%40malereg%2Faowatch-client)
[![GitHub stars](https://img.shields.io/github/stars/maschinenlesbareregierung/aowatch-client.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/maschinenlesbareregierung/aowatch-client/stargazers/)

Features: 

* [All API Methods available](#user-content-all-api-methods-available)
* [Complete types](https://maschinenlesbareregierung.github.io/aowatch-client/modules/types.html) for a good autocomplete experience in typescript
* [usable in node js](#javascriptnode)
* a export usable in the browser
* [Abgeordnetenwatch simple and complex filters implemented](#filtering)
* extends the original api 
  * get all data of a specific type
  * get the website links of a politician

## Installation

```
npm install @malereg/aowatch-client --save
```

# All api methods available

## fetch one item

```typescript
import { politicianList, politician } from '@malereg/aowatch-client/src/entities/entity.politician';
politician(100).then(console.log)
```

## fetch a list

```typescript
import { politicianList, politician } from '@malereg/aowatch-client/src/entities/entity.politician';
politician().then(console.log)
```

Paging

```typescript
import { politicianList } from '@malereg/aowatch-client/src/entities/entity.politician';
politicianList({
  page: 0,
  pager_limit: 10
}).then(console.log)
```

Sorting

```typescript
import { politicianList } from '@malereg/aowatch-client/src/entities/entity.politician';
politicianList(null, {
  sort_by: 'id',
  sort_direction: 'asc'
}).then(console.log)
```

# Filtering

Simple equal filters on a property.


All female politicians

```typescript
import { politicianList } from '@malereg/aowatch-client/src/entities/entity.politician';
politicianList(null, null, {
  sex: "f"
}).then(console.log)
```

More complex filters can be set up as well with comparators.

```typescript
import { politicianList } from '@malereg/aowatch-client/src/entities/entity.politician';
politicianList(null, null, [{
  field: 'year_of_birth',
  operator: 'gt',
  value: 1983
}
]).then(console.log)
```

# Extends the original API

## get all data of a specific type 

If you need all the data of one specific endpoint, you can simply use [currying](https://en.wikipedia.org/wiki/Currying) to do so using the listAll method. It will make sure all data is loaded and the metadata is properly updated.

```typescript
import { listAll } from '@malereg/aowatch-client/src/list-all'
import { partyList, url } from '@malereg/aowatch-client//src/entities/entity.party';
// get all parties
const res = await listAll(partyList);
```

## get website links of politicians

```typescript
import { extractLinks } from '@malereg/aowatch-client/src/extract-links'
import { politician } from '@malereg/aowatch-client//src/entities/entity.politician';
// load the politician
const politician = await politician(100).data;
const links = extractLinks(politician.abgeordnetenwatch_url)
```

## Javascript/Node

In Node and browser builds, you should use the generic API object. It comes with the positive sideeffect of providing events.

```javascript
const client = require('@malereg/aowatch-client').AowatchCLient;

const c = new client();
c.politician.item(100).then(console.log)
```

## Browser Package