"""Build the editable Markdown source using the preserved AcadHomepage layout."""
from pathlib import Path
import shutil, re
import markdown
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
DIST.mkdir(exist_ok=True)
for folder in ['assets', 'images', 'files']:
    shutil.copytree(ROOT / folder, DIST / folder, dirs_exist_ok=True)
layout = (ROOT / 'src/layout.html').read_text()
award = '- **2026**, Finalist, Mathematical Contest in Modeling (MCM), COMAP. Team 2619455, Problem C.'
for source, destination, title in [
    ('home.md', 'index.html', 'Shize Yu - Homepage'),
    ('miscellaneous.md', 'miscellaneous/index.html', 'Miscellaneous - Shize Yu'),
]:
    text = (ROOT / 'content' / source).read_text().replace('__MCM_AWARD__', award)
    content = markdown.markdown(text, extensions=['extra', 'sane_lists'])
    fragment = BeautifulSoup(content, 'html.parser')
    for element in reversed(fragment.select('[markdown="1"]')):
        rendered = markdown.markdown(element.decode_contents(), extensions=['extra', 'sane_lists'])
        element.clear()
        for child in list(BeautifulSoup(rendered, 'html.parser').contents):
            element.append(child)
        del element['markdown']
    content = str(fragment)
    output = layout.replace('__PAGE_CONTENT__', content).replace('__PAGE_TITLE__', title)
    destination = DIST / destination
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(output)
(DIST / '.nojekyll').touch()
shutil.copy2(ROOT / 'LICENSE', DIST / 'LICENSE')
print('Built:', DIST)
