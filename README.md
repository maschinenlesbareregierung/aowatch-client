# @malereg/aowatch-client

Abgeordnetenwatch TypeScript/JavaScript API client for Browser, Node and Typescript

[![npm version](https://badge.fury.io/js/%40malereg%2Faowatch-client.svg)](https://badge.fury.io/js/%40malereg%2Faowatch-client)
[![GitHub stars](https://img.shields.io/github/stars/maschinenlesbareregierung/aowatch-client.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/maschinenlesbareregierung/aowatch-client/stargazers/)

Features: 

* All API Methods available
* Complete types for a good autocomplete experience in typescript
* usable in node js
* a export usable in the browser
* Abgeordnetenwatch simple and complex filters implemented
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
import { politicianList, politician } from '@malereg/aowatch-client/src/entities/entity.politician';
politician({
  page: 0,
  pager_limit: 10
}).then(console.log)
```

Sorting: 

```typescript
import { politicianList, politician } from '@malereg/aowatch-client/src/entities/entity.politician';
politician(null, {
  sort_by: 'id',
  sort_direction: 'asc'
}).then(console.log)
```

## Typescript

In Typescript you can use simple access methods for single endpoints

```typescript
import { politicianList, politician } from '@malereg/aowatch-client/src/entities/entity.politician';
politician(100).then(console.log)
```

## Javascript/Node

In Node and browser builds, you should use the generic API object. It comes with the positive sideeffect of providing events.

```javascript
const client = require('@malereg/aowatch-client').AowatchCLient;

const c = new client();
c.politician.item(100).then(console.log)
```

## Browser Package