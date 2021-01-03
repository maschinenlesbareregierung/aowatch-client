# @malereg/aowatch-client

[![npm version](https://badge.fury.io/js/%40malereg%2Faowatch-client.svg)](https://badge.fury.io/js/%40malereg%2Faowatch-client)

Abgeordnetenwatch TypeScript/JavaScript API client for Browser, Node and Typescript

## Installation

```
npm install @malereg/aowatch-client --save
```

## Typescript

In Typescritp you can use simple access methods for single endpoints

```typescript
import { politicianList, politician } from '@malereg/aowatch-client/src/entities/entity.politician';
politician(100).then(console.log)
```

## Javascript/Node

In Node and browser builds, you should use the generic API object. It comes with the positive sideeffect of providing events.

```javascript
const client = require('aowatch-client').AowatchCLient;

const c = new client();
c.politician.item(100).then(console.log)
```

## Browser Package