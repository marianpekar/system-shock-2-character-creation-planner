let selectedBranch  = null;
let selectedYear    = [null, null, null];
let compareBuilds   = [];
let compareIdCounter = 0;

function selectBranch(id) {
  selectedBranch = id;
  selectedYear   = [null, null, null];

  document.body.dataset.theme = id;

  document.getElementById('exportBtn').disabled = true;

  const h1 = document.querySelector('header h1');
  h1.classList.remove('flicker');
  void h1.offsetWidth;
  h1.classList.add('flicker');

  document.querySelectorAll('.branch-card').forEach(el => {
    el.classList.toggle('selected', el.dataset.branch === id);
  });

  document.getElementById('year1Section').classList.add('unlocked');
  document.getElementById('year2Section').classList.remove('unlocked');
  document.getElementById('year3Section').classList.remove('unlocked');

  renderAllYears();
  showBranchDesc(id);
  updateStats();
}

function selectAssignment(yearIdx, assignId) {
  selectedYear[yearIdx] = assignId;

  if (yearIdx < 2) {
    document.getElementById(`year${yearIdx + 2}Section`).classList.add('unlocked');
  }

  renderYear(yearIdx);

  const assign = getAssign(yearIdx, assignId);
  if (assign) showAssignmentDesc(assign);
  updateStats();
  document.getElementById('exportBtn').disabled = selectedYear.some(y => y === null);
}

function hoverAssign(yearIdx, assignId) {
  const assign = getAssign(yearIdx, assignId);
  if (assign && selectedYear[yearIdx] !== assignId) showAssignmentDesc(assign);
}

function unhover() {
  const last = lastSelectedAssign();
  if (last) showAssignmentDesc(last);
  else if (selectedBranch) showBranchDesc(selectedBranch);
}

function getAssign(yearIdx, assignId) {
  if (!selectedBranch) return null;
  return BRANCHES[selectedBranch].years[yearIdx].find(a => a.id === assignId) || null;
}

function lastSelectedAssign() {
  if (!selectedBranch) return null;
  for (let i = 2; i >= 0; i--) {
    if (selectedYear[i]) {
      const a = getAssign(i, selectedYear[i]);
      if (a) return a;
    }
  }
  return null;
}

function renderAllYears() {
  for (let i = 0; i < 3; i++) renderYear(i);
}

function renderYear(yearIdx) {
  const row = document.getElementById(`year${yearIdx + 1}Row`);
  if (!selectedBranch) { row.innerHTML = ''; return; }

  const assignments = BRANCHES[selectedBranch].years[yearIdx];

  row.innerHTML = assignments.map(a => {
    const sel = selectedYear[yearIdx] === a.id;

    const statTags = Object.entries(a.stats)
      .map(([k, v]) => `<span class="ac-gain">+${v} ${k}</span>`)
      .join('');

    const psiTags = a.psi
      .map(p => `<span class="ac-gain psi">${p}</span>`)
      .join('');

    const noGains = !statTags && !psiTags
      ? `<span class="ac-gain none">No direct gains</span>`
      : '';

    return `<div class="assign-card${sel ? ' selected' : ''}"
      onclick="selectAssignment(${yearIdx},'${a.id}')"
      onmouseenter="hoverAssign(${yearIdx},'${a.id}')"
      onmouseleave="unhover()">
      <div class="ac-name">${a.name}</div>
      <div class="ac-gains">${statTags}${psiTags}${noGains}</div>
    </div>`;
  }).join('');
}

function showBranchDesc(id) {
  const b = BRANCHES[id];
  document.getElementById('descEmpty').style.display = 'none';
  const c = document.getElementById('descContent');
  c.style.display = 'flex';

  const tag = document.getElementById('descTag');
  tag.textContent = b.name.toUpperCase();

  document.getElementById('descBriefing').textContent = b.description;
  document.getElementById('descResult').textContent   = b.result;

  const baseStatHtml = Object.entries(b.baseStats)
    .map(([k, v]) => `<div class="desc-gain-item">+${v} ${k}</div>`)
    .join('');
  const basePsiHtml = b.basePsi
    .map(p => `<div class="desc-gain-item psi">+ ${p}</div>`)
    .join('');

  document.getElementById('descGains').innerHTML =
    baseStatHtml + basePsiHtml ||
    `<div style="color:#2a3e2a;font-size:0.73rem;">Select an assignment for gains</div>`;

  document.getElementById('descEquipSection').style.display = 'none';
}

function showAssignmentDesc(a) {
  if (!selectedBranch) return;

  const c = document.getElementById('descContent');
  c.style.display = 'flex';

  const tag = document.getElementById('descTag');
  tag.textContent = a.name.toUpperCase();

  document.getElementById('descBriefing').textContent = a.description;
  document.getElementById('descResult').textContent   = a.result;

  const statHtml = Object.entries(a.stats)
    .map(([k, v]) => `<div class="desc-gain-item">+${v} ${k}</div>`)
    .join('');
  const psiHtml = a.psi
    .map(p => `<div class="desc-gain-item psi">+ ${p}</div>`)
    .join('');

  document.getElementById('descGains').innerHTML =
    statHtml + psiHtml ||
    `<div style="color:#2a3e2a;font-size:0.73rem;">No direct stat gains</div>`;

  const equipSec = document.getElementById('descEquipSection');
  if (a.equipment && a.equipment.length > 0) {
    equipSec.style.display = 'block';
    document.getElementById('descEquipList').innerHTML =
      a.equipment.map(e => `<div>• ${e}</div>`).join('');
  } else {
    equipSec.style.display = 'none';
  }
}

function calcBuildStats(branch, years) {
  const totals = {}, allPsi = [], allEquip = [];
  if (!branch || !BRANCHES[branch]) return { totals, allPsi, allEquip };
  const b = BRANCHES[branch];
  Object.entries(b.baseStats).forEach(([k, v]) => { totals[k] = (totals[k] || 0) + v; });
  allPsi.push(...b.basePsi);
  for (let i = 0; i < 3; i++) {
    if (!years[i]) continue;
    const a = b.years[i].find(x => x.id === years[i]);
    if (!a) continue;
    Object.entries(a.stats).forEach(([k, v]) => { totals[k] = (totals[k] || 0) + v; });
    allPsi.push(...a.psi);
    allEquip.push(...a.equipment);
  }
  return { totals, allPsi, allEquip };
}

function calcStats() {
  return calcBuildStats(selectedBranch, selectedYear);
}

function updateStats() {
  const { totals, allPsi, allEquip } = calcStats();
  const maxVal = Math.max(3, ...Object.values(totals));

  let lastGroup = '';
  const html = STAT_DEFS.map(def => {
    const val  = totals[def.key] || 0;
    const pct  = (val / maxVal) * 100;
    let groupHtml = '';
    if (def.group !== lastGroup) {
      groupHtml  = `<div class="stat-group-label">${def.group}</div>`;
      lastGroup  = def.group;
    }
    return `${groupHtml}<div class="stat-row">
      <div class="sn">${def.label}</div>
      <div class="sb"><div class="sb-fill" style="width:${pct}%"></div></div>
      <div class="sv${val === 0 ? ' z' : ''}">${val || '—'}</div>
    </div>`;
  }).join('');

  document.getElementById('statsBars').innerHTML = html;

  const psiSec  = document.getElementById('psiSection');
  const psiList = document.getElementById('psiList');
  if (allPsi.length > 0) {
    psiSec.style.display = 'block';
    psiList.innerHTML = allPsi.map(p => `<div class="psi-skill-item">${p}</div>`).join('');
  } else {
    psiSec.style.display = 'none';
  }

  const equipSec  = document.getElementById('equipSection');
  const equipList = document.getElementById('equipList');
  if (allEquip.length > 0) {
    equipSec.style.display = 'block';
    equipList.innerHTML = allEquip.map(e => `<div class="equip-item">${e}</div>`).join('');
  } else {
    equipSec.style.display = 'none';
  }

  const numericTotal = Object.values(totals).reduce((s, v) => s + v, 0);
  document.getElementById('totalPoints').textContent = numericTotal;

  renderComparisons(totals);
}

function renderComparisons(currentTotals) {
  const sec = document.getElementById('compareSection');
  if (compareBuilds.length === 0) { sec.innerHTML = ''; sec.style.display = 'none'; return; }
  sec.style.display = 'flex';

  const ct = currentTotals || calcStats().totals;

  sec.innerHTML = compareBuilds.map(cb => {
    const { totals, allPsi, allEquip } = calcBuildStats(cb.branch, cb.years);
    const branchName = BRANCHES[cb.branch].name;
    const maxVal = Math.max(3, ...Object.values(totals));

    const yearLabels = cb.years.map((y, i) => {
      if (!y) return null;
      const a = BRANCHES[cb.branch].years[i].find(x => x.id === y);
      return a ? a.name : null;
    }).filter(Boolean).join(' / ');

    let lastGroup = '';
    const statsHtml = STAT_DEFS.map(def => {
      const val = totals[def.key] || 0;
      const cur = ct[def.key] || 0;
      let groupHtml = '';
      if (def.group !== lastGroup) {
        groupHtml = `<div class="stat-group-label">${def.group}</div>`;
        lastGroup = def.group;
      }
      const pct = (val / maxVal) * 100;
      const diff = val - cur;
      const diffStr = diff > 0
        ? `<span class="stat-diff pos">+${diff}</span>`
        : diff < 0
          ? `<span class="stat-diff neg">${diff}</span>`
          : '';
      return `${groupHtml}<div class="stat-row">
        <div class="sn">${def.label}</div>
        <div class="sb"><div class="sb-fill" style="width:${pct}%"></div></div>
        <div class="sv${val === 0 ? ' z' : ''}">${val || '—'}${diffStr}</div>
      </div>`;
    }).filter(Boolean).join('');

    const psiHtml = allPsi.length > 0
      ? `<div class="psi-skills-section">
           <div class="psi-section-label">Psi Disciplines</div>
           ${allPsi.map(p => `<div class="psi-skill-item">${p}</div>`).join('')}
         </div>`
      : '';

    const equipHtml = allEquip.length > 0
      ? `<div class="equip-section">
           <div class="equip-section-label">Starting Equipment</div>
           ${allEquip.map(e => `<div class="equip-item">${e}</div>`).join('')}
         </div>`
      : '';

    return `<div class="compare-card" data-branch="${cb.branch}">
      <div class="compare-card-header">
        <div class="compare-card-title">${branchName} — ${yearLabels || 'No assignments'}</div>
        <button class="compare-remove-btn" onclick="removeCompareBuild(${cb.id})">×</button>
      </div>
      ${statsHtml}${psiHtml}${equipHtml}
    </div>`;
  }).join('');
}

function removeCompareBuild(id) {
  compareBuilds = compareBuilds.filter(cb => cb.id !== id);
  renderComparisons();
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  event.target.value = '';

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.branch || !BRANCHES[data.branch]) return;

      selectBranch(data.branch);

      if (Array.isArray(data.years)) {
        data.years.forEach((assignId, i) => {
          if (assignId && getAssign(i, assignId)) {
            selectAssignment(i, assignId);
          }
        });
      }
    } catch (_) {}
  };
  reader.readAsText(file);
}

function exportBuild() {
  if (!selectedBranch) return;

  const data = {
    branch: selectedBranch,
    years:  selectedYear.slice()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `ss2-${selectedBranch}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function handleCompare(event) {
  const file = event.target.files[0];
  if (!file) return;
  event.target.value = '';

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.branch || !BRANCHES[data.branch]) return;
      if (!Array.isArray(data.years)) return;
      compareBuilds.push({
        id:     compareIdCounter++,
        branch: data.branch,
        years:  data.years.slice()
      });
      renderComparisons();
    } catch (_) {}
  };
  reader.readAsText(file);
}

document.addEventListener('DOMContentLoaded', function () {
  updateStats();
});