import fs from 'node:fs'
import path from 'node:path'

const breakpoints = [
	{ name: 'xs', media: '@media (max-width: 575.98px)' },
	{ name: 'sm', media: '@media (min-width: 576px)' },
	{ name: 'md', media: '@media (min-width: 768px)' },
	{ name: 'lg', media: '@media (min-width: 992px)' },
	{ name: 'xl', media: '@media (min-width: 1200px)' },
	{ name: 'xxl', media: '@media (min-width: 1600px)' },
]

function getPercentage(n) {
	return ((n / 24) * 100).toFixed(8).replace(/\.?0+$/, '') + '%'
}

let css = `/* ==========================================================================
   Plasma 24-Column Grid System (Ant Design Grid Specification)
   ========================================================================== */

@layer plasma.layout {
	.plasma-row {
		--plasma-row-gutter-x: var(--plasma-row-gutter-x-base, 0px);
		--plasma-row-gutter-y: var(--plasma-row-gutter-y-base, 0px);
		display: flex;
		flex-flow: row wrap;
		min-width: 0;
		box-sizing: border-box;
		margin-left: calc(var(--plasma-row-gutter-x) / -2);
		margin-right: calc(var(--plasma-row-gutter-x) / -2);
		row-gap: var(--plasma-row-gutter-y);
	}

	.plasma-row-no-wrap {
		flex-wrap: nowrap;
	}

	/* Row Alignments */
	.plasma-row-align-top,
	.plasma-row-align-start {
		align-items: flex-start;
	}
	.plasma-row-align-middle,
	.plasma-row-align-center {
		align-items: center;
	}
	.plasma-row-align-bottom,
	.plasma-row-align-end {
		align-items: flex-end;
	}
	.plasma-row-align-stretch {
		align-items: stretch;
	}
	.plasma-row-align-baseline {
		align-items: baseline;
	}

	/* Row Justifications */
	.plasma-row-justify-start {
		justify-content: flex-start;
	}
	.plasma-row-justify-end {
		justify-content: flex-end;
	}
	.plasma-row-justify-center {
		justify-content: center;
	}
	.plasma-row-justify-space-around {
		justify-content: space-around;
	}
	.plasma-row-justify-space-between {
		justify-content: space-between;
	}
	.plasma-row-justify-space-evenly {
		justify-content: space-evenly;
	}

	/* Col Base */
	.plasma-col {
		position: relative;
		max-width: 100%;
		min-height: 1px;
		box-sizing: border-box;
		padding-left: calc(var(--plasma-row-gutter-x, 0px) / 2);
		padding-right: calc(var(--plasma-row-gutter-x, 0px) / 2);
	}

	/* Responsive Row Gutters Cascading */
	@media (max-width: 575.98px) {
		.plasma-row {
			--plasma-row-gutter-x: var(--plasma-row-gutter-x-xs, var(--plasma-row-gutter-x-base, 0px));
			--plasma-row-gutter-y: var(--plasma-row-gutter-y-xs, var(--plasma-row-gutter-y-base, 0px));
		}
	}

	@media (min-width: 576px) {
		.plasma-row {
			--plasma-row-gutter-x: var(--plasma-row-gutter-x-sm, var(--plasma-row-gutter-x-base, 0px));
			--plasma-row-gutter-y: var(--plasma-row-gutter-y-sm, var(--plasma-row-gutter-y-base, 0px));
		}
	}

	@media (min-width: 768px) {
		.plasma-row {
			--plasma-row-gutter-x: var(--plasma-row-gutter-x-md, var(--plasma-row-gutter-x-sm, var(--plasma-row-gutter-x-base, 0px)));
			--plasma-row-gutter-y: var(--plasma-row-gutter-y-md, var(--plasma-row-gutter-y-sm, var(--plasma-row-gutter-y-base, 0px)));
		}
	}

	@media (min-width: 992px) {
		.plasma-row {
			--plasma-row-gutter-x: var(--plasma-row-gutter-x-lg, var(--plasma-row-gutter-x-md, var(--plasma-row-gutter-x-sm, var(--plasma-row-gutter-x-base, 0px))));
			--plasma-row-gutter-y: var(--plasma-row-gutter-y-lg, var(--plasma-row-gutter-y-md, var(--plasma-row-gutter-y-sm, var(--plasma-row-gutter-y-base, 0px))));
		}
	}

	@media (min-width: 1200px) {
		.plasma-row {
			--plasma-row-gutter-x: var(--plasma-row-gutter-x-xl, var(--plasma-row-gutter-x-lg, var(--plasma-row-gutter-x-md, var(--plasma-row-gutter-x-sm, var(--plasma-row-gutter-x-base, 0px)))));
			--plasma-row-gutter-y: var(--plasma-row-gutter-y-xl, var(--plasma-row-gutter-y-lg, var(--plasma-row-gutter-y-md, var(--plasma-row-gutter-y-sm, var(--plasma-row-gutter-y-base, 0px)))));
		}
	}

	@media (min-width: 1600px) {
		.plasma-row {
			--plasma-row-gutter-x: var(--plasma-row-gutter-x-xxl, var(--plasma-row-gutter-x-xl, var(--plasma-row-gutter-x-lg, var(--plasma-row-gutter-x-md, var(--plasma-row-gutter-x-sm, var(--plasma-row-gutter-x-base, 0px))))));
			--plasma-row-gutter-y: var(--plasma-row-gutter-y-xxl, var(--plasma-row-gutter-y-xl, var(--plasma-row-gutter-y-lg, var(--plasma-row-gutter-y-md, var(--plasma-row-gutter-y-sm, var(--plasma-row-gutter-y-base, 0px))))));
		}
	}

	/* Base Grid Classes (1-24) */
	.plasma-col-0 {
		display: none;
	}
`

function generateRules(prefix = '') {
	let str = ''
	const p = prefix ? `${prefix}-` : ''

	for (let i = 1; i <= 24; i++) {
		const pct = getPercentage(i)
		str += `\t.plasma-col-${p}${i} { display: block; flex: 0 0 ${pct}; max-width: ${pct}; }\n`
	}

	str += `\t.plasma-col-${p}0 { display: none; }\n`
	str += `\t.plasma-col-${p}offset-0 { margin-left: 0; }\n`
	for (let i = 1; i <= 24; i++) {
		const pct = getPercentage(i)
		str += `\t.plasma-col-${p}offset-${i} { margin-left: ${pct}; }\n`
	}

	str += `\t.plasma-col-${p}pull-0 { right: auto; }\n`
	for (let i = 1; i <= 24; i++) {
		const pct = getPercentage(i)
		str += `\t.plasma-col-${p}pull-${i} { position: relative; right: ${pct}; }\n`
	}

	str += `\t.plasma-col-${p}push-0 { left: auto; }\n`
	for (let i = 1; i <= 24; i++) {
		const pct = getPercentage(i)
		str += `\t.plasma-col-${p}push-${i} { position: relative; left: ${pct}; }\n`
	}

	for (let i = 0; i <= 24; i++) {
		str += `\t.plasma-col-${p}order-${i} { order: ${i}; }\n`
	}

	return str
}

css += generateRules('')

for (const bp of breakpoints) {
	css += `\n\t${bp.media} {\n`
	css += generateRules(bp.name)
	css += `\t}\n`
}

css += `}\n`

fs.writeFileSync(path.resolve('src/lib/style/grid.css'), css, 'utf-8')
console.log('Generated src/lib/style/grid.css successfully!')
