# Observare React
`Observare-react` provides a observer that can be used to observe changes and collect usage metrics for an application.

## Installation
- with `npm` : `npm install observare-react`
- with `yarn` : `yarn add observare-react`
- with `pnpm` : `pnpm add observare-react`

## Getting Started
`index.tsx`
```typescript
import React from 'react';
import  ObservareClient, { ObservareConfig } from 'observare-react';

const config: ObservareConfig = {
    retry: true,
    eager: false, // don't do `eager` in production
    maxLogs: 15, // defaults to 15
    isSupabase: true,
    supabaseConfig: {
        url: '<supabase url>',
        key: '<supabase key>',
        table: 'logs' // set your table name
    }
};
```

### Supabase Config:
After creating a project, make sure you have a table which matches this schema:
```typescript
export interface BrowserLog {
  uniqueId: String;
  time: Date;
  phase: String;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  path: String;
  domain: String;
}
```

# Advanced Usage
### Unique IDs:
To Identify Requests from Users, one can use `uniqueId` which defaults to a randomly generated `UUID` that persists in storage for future identifications. You can also provide your own `uniqueId` by passing it in the `config` object or even by storing it in the `localStorage` with the key `observare_uniqueId`.
Example:
```typescript
const config: ObservareConfig = {
    retry: true,
    eager: false, // don't do `eager` in production
    maxLogs: 15, // defaults to 15
    isSupabase: true,
    uniqueId: getUserEmail(), // get the user's email. if left blank a random UUID will be generated that persists
    supabaseConfig: {
        url: '<supabase url>',
        key: '<supabase key>',
        table: 'logs' // set your table name
    }
};
```

Incase the user is not logged in during first load, you can do it once user has been authenticated by using the setUniqueId function exported by the package:
// TODO: not implemented YET
```typescript
import { setUniqueId } from 'observare-react';

setUniqueId('abc@xyz.com');
```

Or you can also set it in the localStorage with the key `observare_uniqueId`.
```typescript
localStorage.setItem('observare_uniqueId', 'abc@xyz.com')'
```
