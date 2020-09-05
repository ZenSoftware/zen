```bash
# Build docs
npm run docs

# Push docs gh-pages
git subtree push --prefix documentation origin gh-pages

# Push docs ZenSoftware/zensoftware.github.io
git subtree push --prefix documentation docs master
```
