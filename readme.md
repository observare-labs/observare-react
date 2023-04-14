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
