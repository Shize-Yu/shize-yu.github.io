# Shize Yu — Academic Homepage

English academic homepage of Shize Yu, a Software Engineering undergraduate at Huazhong University of Science and Technology.

Website: https://shize-yu.github.io/

The layout and theme are adapted from AcadHomepage and the provided reference homepage. Only the two public bioRxiv preprints appear in the publications section. Unpublished work is described only in broad terms.

## Update the website

- `content/home.md`: biography, education, news, publications, research experience, awards, and service.
- `content/miscellaneous.md`: skills, additional experience, and contact links.
- `src/layout.html`: navigation, portrait, profile links, and the personal visitor map.
- `images/`: portrait, publication figures, and university emblems.
- `files/Shize_Yu_Public_CV.pdf`: downloadable public CV.

## Build locally

```sh
python3 -m pip install -r requirements.txt
python3 scripts/build.py
python3 -m http.server 4173 --directory dist
```

## Deployment

GitHub Actions builds the website with `scripts/build.py` and publishes `dist/` to GitHub Pages on pushes to `main`. Pages uses GitHub Actions as its publishing source.

## Credits

See `LICENSE` and `THIRD_PARTY_NOTICES.md` for theme attribution and asset sources. The visitor map belongs to this homepage: https://mapmyvisitors.com/web/1c9mv.
