/**
 * Verify resume page-break / overflow planning logic.
 * Run from cv-builder: node --experimental-vm-modules ../../../../scripts won't work.
 * Use: npx vite-node src/dev/verify-page-breaks.mjs
 */
import {
  planColumnOverflow,
  getActivePageCount,
  resumeDataForPage,
  getPageListsArray,
  bodySectionsForData,
} from '../config/pageLayout.js';
import { sampleForTemplate, buildMultipageDemoResume } from '../data/sampleResumeData.js';
import { isOnePageTemplate, getTemplateMaxPages } from '../config/templates.js';

const mockSection = (id, top, bottom, entries = []) => ({
  getAttribute: (key) => (key === 'data-section' ? id : null),
  getBoundingClientRect: () => ({ top, bottom, height: bottom - top }),
  querySelectorAll: () => entries,
});

const mockEntry = (top, bottom) => ({
  getBoundingClientRect: () => ({ top, bottom, height: bottom - top }),
});

let passed = 0;
let failed = 0;
const assert = (name, cond, detail = '') => {
  if (cond) {
    passed += 1;
    console.log(`  PASS  ${name}`);
  } else {
    failed += 1;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
};

console.log('\n1) Overflow planner — whole section moves when past page limit');
{
  const limitY = 1000;
  const sections = [
    mockSection('summary', 100, 200),
    mockSection('experience', 210, 900),
    mockSection('projects', 910, 1200),
    mockSection('education', 1210, 1300),
  ];
  const plan = planColumnOverflow(sections, limitY);
  assert('projects marked to move', plan.moveIds.has('projects'));
  assert('education also moves (after overflow)', plan.moveIds.has('education'));
  assert('summary stays', !plan.moveIds.has('summary'));
  assert('experience stays', !plan.moveIds.has('experience'));
}

console.log('\n2) Overflow planner — entry split keeps heading with content');
{
  const limitY = 1000;
  const entries = [
    mockEntry(220, 400),
    mockEntry(410, 600),
    mockEntry(610, 1100),
  ];
  const sections = [
    mockSection('summary', 100, 180),
    mockSection('experience', 190, 1100, entries),
  ];
  const plan = planColumnOverflow(sections, limitY);
  assert('experience is split', plan.moveIds.has('experience') && plan.splits.experience === 2, JSON.stringify(plan));
}

console.log('\n3) Overflow planner — orphan heading moves wholly');
{
  const limitY = 1000;
  const sections = [
    mockSection('summary', 100, 960),
    mockSection('awards', 970, 1120),
  ];
  const plan = planColumnOverflow(sections, limitY);
  assert('awards moves wholly (orphan heading)', plan.moveIds.has('awards') && !plan.splits.awards);
}

console.log('\n4) Full Stack sample is one-page-friendly');
{
  const data = sampleForTemplate('role-fullstack');
  assert('columns forced to one', data.design?.columns === 'one');
  assert('no page-2 sections in one-pager packing', (data.pageSections?.page2 || []).length === 0);
  assert('isOnePageTemplate', isOnePageTemplate('role-fullstack'));
  const body = bodySectionsForData(data);
  assert('body sections include experience', body.includes('experience'));
  const expBullets = (data.experience || []).reduce(
    (n, e) => n + String(e.description || '').split(/\n/).filter(Boolean).length,
    0
  );
  assert(`experience bullets <= 10 (got ${expBullets})`, expBullets <= 10);
  assert('jobs <= 2', (data.experience || []).length <= 2);
  assert('projects <= 3', (data.projects || []).length <= 3);
}

console.log('\n4b) DevOps sample is one-page-friendly');
{
  const data = sampleForTemplate('role-devops');
  assert('columns forced to one', data.design?.columns === 'one');
  assert('isOnePageTemplate', isOnePageTemplate('role-devops'));
  assert('jobs <= 2', (data.experience || []).length <= 2);
  assert('projects <= 3', (data.projects || []).length <= 3);
}

console.log('\n5) Multipage template page splits (Gold Rule)');
{
  const data = sampleForTemplate('gold-rule');
  const pages = getPageListsArray(data, 'gold-rule');
  const count = getActivePageCount(data, 'gold-rule', getTemplateMaxPages('gold-rule') || 2);
  assert('gold-rule has 2+ logical pages', count >= 2, `count=${count}`);
  assert('page1 has content', (pages[0] || []).length > 0);
  assert('page2 has content', (pages[1] || []).length > 0);

  const p1 = resumeDataForPage(data, 0, count, 'gold-rule');
  const p2 = resumeDataForPage(data, 1, count, 'gold-rule');
  assert('page1 meta.page === 1', p1.pageMeta?.page === 1);
  assert('page2 meta.page === 2', p2.pageMeta?.page === 2);
}

console.log('\n6) Career Detail / North Shore multipage samples');
{
  for (const id of ['career-detail', 'north-shore']) {
    const data = sampleForTemplate(id);
    const count = getActivePageCount(data, id, 4);
    const pages = getPageListsArray(data, id);
    assert(`${id} reports multipage`, count >= 2, `count=${count}`);
    assert(`${id} page2 non-empty`, (pages[1] || []).length > 0);
  }
}

console.log('\n7) One-pager expanded to multipage demo');
{
  const data = buildMultipageDemoResume();
  const template = data.selectedTemplate || 'career-detail';
  const count = getActivePageCount(data, template, 4);
  const pages = getPageListsArray(data, template);
  assert('demo template is multipage-capable', !isOnePageTemplate(template));
  assert('demo reports 2+ pages', count >= 2, `count=${count}`);
  assert('demo page1 has content', (pages[0] || []).length > 0);
  assert('demo page2 has content', (pages[1] || []).length > 0);
  assert('demo keeps experience on page1', (pages[0] || []).includes('experience'));
  assert('demo moves projects to page2', (pages[1] || []).includes('projects'));
}

console.log(`\nResult: ${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
