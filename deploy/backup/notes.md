```bash
# Build docs
npm run docs

# Push docs gh-pages
git subtree push --prefix documentation origin gh-pages

# Push docs ZenSoftware/zensoftware.github.io
git subtree push --prefix documentation docs master
```


### Create and Drop prisma
```sql
-- Drop
SELECT pg_terminate_backend (pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'prisma';
```

```sql
DROP DATABASE prisma;
```